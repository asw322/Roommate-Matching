package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserUtil;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service("userMatchContainerService")
@Transactional
public class UserMatchContainerService {
	@Autowired
	private UserMatchRepository userMatchRepository;

	@Autowired
	private UserUtil userUtil;

	public UserMatchItem createUserMatch(final String currentUserEmail, final String matchUserEmail) {
		final UserItem currentUser = userUtil.getUser(currentUserEmail);
		final UserItem matchUser = userUtil.getUser(matchUserEmail);

		if(currentUser == null || matchUser == null) {
			return null;
		}

		if(currentUser.equals(matchUser)) {
			return null;
		}

		final UserMatchItem userMatch = new UserMatchItem();
		userMatch.setCurrentUser(currentUser);
		userMatch.setMatchUser(matchUser);
		userMatch.setUserMatchTimestamp(LocalDateTime.now());
		return userMatchRepository.save(userMatch);
	}

	public List<UserMatchItem> findMatchByCurrentUser(final String currentUserEmail) {
		final UserItem user = userUtil.getUser(currentUserEmail);

		final List<UserMatchItem> result = userMatchRepository.findByCurrentUser(user);
		return result;
	}
}
