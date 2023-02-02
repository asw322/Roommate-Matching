package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

@Repository("userMatchTransactionRepository")
public interface UserMatchTransactionRepository extends JpaRepository<UserMatchTransactionItem, Long> {
    List<UserMatchTransactionItem> findByUser(final UserItem user);
}
