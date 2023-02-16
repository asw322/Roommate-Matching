package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.base.Optional;
import com.google.common.collect.Maps;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import com.roommate.matching.RoommateMatching.api.usermatch.v1.operations.UserMatchingOpertions;
import com.roommate.matching.RoommateMatching.modules.RedissonClientProvider;

import jakarta.annotation.PostConstruct;

import org.redisson.api.RLock;
import org.redisson.api.RSetCache;
import org.redisson.api.RedissonClient;

import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class UserMatchingJob implements Runnable {

	private final int SCHEDULE_PERIOD = 10;
	private final int CONCURRENT_THREAD_COUNT = 1;
	private final String USER_MATCHING_UNPROCESSED_SET = "user-matching-unprocessed-set";
	private final String USER_MATCHING_ERROR_SET = "user-matching-error-set";

	@Autowired
	private RedissonClientProvider redissonClientProvider;

	@Autowired
	private UserMatchingOpertions userMatchingOpertions;

	private RedissonClient redissonClient;

	public UserMatchingJob() {
		redissonClientProvider = new RedissonClientProvider();
		redissonClient = redissonClientProvider.create();
	}

	public Optional<Map<UserMatchTransactionItem, RLock>> getJobLock(final Set<UserMatchTransactionItem> unprocessedSet,
			final RSetCache<UserMatchTransactionItem> errorSet) {
		final Map<UserMatchTransactionItem, RLock> jobLockMap;
		for (final UserMatchTransactionItem item : unprocessedSet) {
			if (errorSet.contains(item)) {
				return Optional.absent();
			}
			final String key = String.valueOf(item.getId());
			final RLock rlock = redissonClient.getLock(key);
			if (rlock.tryLock()) {
				System.out.println("Successfully secured lock on " + key);
				jobLockMap = Maps.newHashMap();
				jobLockMap.put(item, rlock);
				return Optional.of(jobLockMap);
			}
		}
		return Optional.absent();
	}

	public void releaseLock(final Optional<RLock> lock) {
		if (lock.isPresent()) {
			System.out.println("Attempting to release lock: " + lock.get().getName());
			lock.get().unlock();
			System.out.println("Released lock: " + lock.get().getName());
		}
	}

	@Override
	public void run() {
		System.out.println("Thread starting");
		try {
			while (true) {
				Optional<RLock> globalLock = Optional.absent();
				Optional<RLock> runLock = Optional.absent();

				try {
					System.out.println("Starting UserMatching Job on Thread: " + Thread.currentThread().getId());

					final RSetCache<UserMatchTransactionItem> errorSet = redissonClient.getSetCache(USER_MATCHING_ERROR_SET);
					final Set<UserMatchTransactionItem> unprocessedSet = redissonClient.getSet(USER_MATCHING_UNPROCESSED_SET);

					if (unprocessedSet.isEmpty()) {
						System.out.println("No jobs to process. Exiting.");
					} else {
						// TODO: grab global lock

						final Optional<Map<UserMatchTransactionItem, RLock>> jobLockMap = getJobLock(unprocessedSet, errorSet);

						if (!jobLockMap.isPresent()) {
							System.out.println("Failed to secure a job lock. Exiting.");
						} else {
							final Entry<UserMatchTransactionItem, RLock> entry;
							entry = jobLockMap.get().entrySet().iterator().next();
	
							runLock = Optional.of(entry.getValue());
							// System.out.println(
							// 		"Attempting to perform user match for " + entry.getKey().getUser().getEmail());
	
							// userMatchingOpertions.performMatch(entry.getKey());
							unprocessedSet.remove(entry.getKey());
						}
					}
				} catch (final Exception e) {
					System.out.println("Failed to perform user match: " + e.getMessage());
					// TODO: should we add error set adding here?
				} finally {
					releaseLock(globalLock);
					releaseLock(runLock);
				}

				Thread.sleep(SCHEDULE_PERIOD * 1000);
			}
		} catch (final InterruptedException e) {
			System.out.println("Thread interrupted");
		}
		System.out.println("Thread exiting");
	}

	@PostConstruct
	public void init() {
        if(CONCURRENT_THREAD_COUNT == 0) {
            return;
        }
		ExecutorService executor = Executors.newFixedThreadPool(CONCURRENT_THREAD_COUNT);
		for(int i = 0; i < CONCURRENT_THREAD_COUNT; i++) {
			executor.execute(new UserMatchingJob());
		}
	}
}
