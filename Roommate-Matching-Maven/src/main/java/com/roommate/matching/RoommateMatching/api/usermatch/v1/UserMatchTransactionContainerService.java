package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserUtil;
import com.roommate.matching.RoommateMatching.modules.RedissonClientProvider;

import jakarta.transaction.Transactional;

@Service("userMatchTransactionContainerService")
@Transactional
public class UserMatchTransactionContainerService {
    private final String USER_MATCHING_UNPROCESSED_SET = "user-matching-unprocessed-set";

    @Autowired
    private UserMatchTransactionRepository userMatchTransactionRepository;

    @Autowired
    private RedissonClientProvider redissonClientProvider;

    @Autowired
    private UserUtil userUtil;

    private RedissonClient redissonClient;

    public UserMatchTransactionContainerService() {
        redissonClientProvider = new RedissonClientProvider();
        redissonClient = redissonClientProvider.create();
    }

    public UserMatchTransactionItem createUserMatchTransaction(final String userEmail) {
        final UserItem user = userUtil.getUser(userEmail);

        if(user == null) {
            return null;
        }

        final UserMatchTransactionItem userMatchTransaction = new UserMatchTransactionItem();
        userMatchTransaction.setUser(user);
        userMatchTransaction.setUserMatchTransactionTimestamp(LocalDateTime.now());
        userMatchTransactionRepository.save(userMatchTransaction);
        System.out.println("Inserting " + userMatchTransaction.toString());
        final Set<UserMatchTransactionItem> unprocessedSet = redissonClient.getSet(USER_MATCHING_UNPROCESSED_SET);
        unprocessedSet.add(userMatchTransaction);
        System.out.println("Inserted");
        return userMatchTransaction;
    }

    public List<UserMatchTransactionItem> findMatchTransactionByUser(final String userEmail) {
        final UserItem user = userUtil.getUser(userEmail);

        final List<UserMatchTransactionItem> result = userMatchTransactionRepository.findByUser(user);
        return result;
    }
}
