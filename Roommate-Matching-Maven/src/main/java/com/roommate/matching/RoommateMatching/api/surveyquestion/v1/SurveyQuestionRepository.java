package com.roommate.matching.RoommateMatching.api.surveyquestion.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("surveyquestionRepository")
public interface SurveyQuestionRepository extends JpaRepository<SurveyQuestionItem, Long> {
    
}
