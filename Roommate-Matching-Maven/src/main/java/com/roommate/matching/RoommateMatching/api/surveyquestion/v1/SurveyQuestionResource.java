package com.roommate.matching.RoommateMatching.api.surveyquestion.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/surveyquestion/v1")
public class SurveyQuestionResource {
    @Autowired
    private SurveyQuestionContainerService service;

    @ResponseBody
    @RequestMapping(value = "/create")
    public SurveyQuestionItem createSurveyQuestion(
        @RequestParam(value = "surveyId") final Long surveyId,
        @RequestParam(value = "questionId") final Long questionId) {
        return service.createSurveyQuestion(surveyId, questionId);
    }
}
