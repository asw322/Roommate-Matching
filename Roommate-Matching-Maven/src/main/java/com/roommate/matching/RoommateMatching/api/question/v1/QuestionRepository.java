package com.roommate.matching.RoommateMatching.api.question.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("questionRepository")
public interface QuestionRepository extends JpaRepository<QuestionItem, Long> {

}
