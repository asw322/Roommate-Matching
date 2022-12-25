package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

@Repository("answerRepository")
public interface AnswerRepository extends JpaRepository<AnswerItem, Long> {
    
    List<AnswerItem> findByUser_Id(final String userId);
    List<AnswerItem> findByUser(final UserItem user);

    @Query("select a.id, a.user from AnswerItem a where a.user.email = ?1")
    List<AnswerItem> findByUser_Email(final String email);
}
