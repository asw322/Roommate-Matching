package com.roommate.matching.RoommateMatching.api.answer.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

@Repository("answerRepository")
public interface AnswerRepository extends JpaRepository<AnswerItem, Long> {
    
    // TODO: fix this because these should return a List<> not a single value
    Optional<AnswerItem> findByUser_Id(final String userId);
    Optional<AnswerItem> findByUser(final UserItem user);

    @Query("select a.id, a.user from AnswerItem a where a.user.email = ?1")
    Optional<AnswerItem> findByUser_Email(final String email);
}
