package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userMatchRepository")
public interface UserMatchRepository extends JpaRepository<UserMatchItem, Long> {
	List<UserMatchItem> findByCurrentUser(final UserItem user);
	List<UserMatchItem> findByMatchUser(final UserItem user);
}
