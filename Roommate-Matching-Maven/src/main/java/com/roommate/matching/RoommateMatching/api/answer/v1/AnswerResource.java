package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/answer/v1")
public class AnswerResource {
    @Autowired
    private AnswerContainerService service;

    // api to create an answer
    @ResponseBody
    @RequestMapping(value = "/create", params = "email")
    public AnswerItem createAnswerByUsername(
        @RequestParam(value = "email") final String email,
        @RequestParam(value = "surveyquestionId") final Long surveyQuestionId,
        @RequestParam(value = "data") final String data) {
        return service.createAnswerByEmail(email, surveyQuestionId, data);
    }

    @ResponseBody
    @RequestMapping(value = "/get", params = "email")
    public List<AnswerItem> getAnswerByUsername(
        @RequestParam(value = "email") final String email) {
        return service.findAnswerByEmail(email);
    }

    @ResponseBody
    @RequestMapping(value = "/get", params = "id")
    public AnswerItem getAnswerById(
        @RequestParam(value = "id") final Long id) {
        return service.findAnswerById(id);
    }
}
