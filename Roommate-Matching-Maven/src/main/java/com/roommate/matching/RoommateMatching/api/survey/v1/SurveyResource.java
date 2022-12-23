package com.roommate.matching.RoommateMatching.api.survey.v1;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/survey/v1")
public class SurveyResource {
    @Autowired
    private SurveyContainerService service;

    @ResponseBody
    @RequestMapping(value = "/create", params = "description")
    public SurveyItem createSurvey(
        @RequestParam final Map<String, String> parameters) {
        return service.createSurvey(parameters);
    }
}
