package com.roommate.matching.RoommateMatching.api.survey.v1;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;

import jakarta.transaction.Transactional;

@Service("surveyContainerService")
@Transactional
public class SurveyContainerService {
    @Autowired
    private SurveyRepository surveyRepository;

    public SurveyItem createSurvey(final Map<String, String> parameters) {
        // TODO: include other parameters as they are required
        if(Strings.isNullOrEmpty(parameters.get("description"))) {
            return null;
        }
        final SurveyItem survey = new SurveyItem();
        survey.setDescription(parameters.get("description"));
        return surveyRepository.save(survey);
    }

    public SurveyItem findById(final Long id) {
        java.util.Optional<SurveyItem> optional = surveyRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }
}
