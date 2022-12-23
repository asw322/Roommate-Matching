package com.roommate.matching.RoommateMatching.api.surveyquestion.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roommate.matching.RoommateMatching.api.question.v1.QuestionContainerService;
import com.roommate.matching.RoommateMatching.api.question.v1.QuestionItem;
import com.roommate.matching.RoommateMatching.api.survey.v1.SurveyContainerService;
import com.roommate.matching.RoommateMatching.api.survey.v1.SurveyItem;

import jakarta.transaction.Transactional;

@Service("surveyQuestionContainerService")
@Transactional
public class SurveyQuestionContainerService {
    @Autowired
    private SurveyQuestionRepository surveyQuestionRepository;

    @Autowired
    private SurveyContainerService surveyContainerService;
    @Autowired
    private QuestionContainerService questionContainerService;

    public SurveyQuestionItem createSurveyQuestion(final Long surveyId, final Long questionId) {
        final SurveyItem survey = surveyContainerService.findById(surveyId);
        final QuestionItem question = questionContainerService.findById(questionId);

        if(survey == null || question == null) {
            // TODO: throw error?
            return null;
        }

        final SurveyQuestionItem surveyQuestion = new SurveyQuestionItem();
        surveyQuestion.setQuestion(question);
        surveyQuestion.setSurvey(survey);
        return surveyQuestionRepository.save(surveyQuestion);
    }

    public SurveyQuestionItem findById(final Long id) {
        java.util.Optional<SurveyQuestionItem> optional = surveyQuestionRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }
}
