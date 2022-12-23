package com.roommate.matching.RoommateMatching.api.survey.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("surveyRepository")
public interface SurveyRepository extends JpaRepository<SurveyItem, Long> {
    
}
