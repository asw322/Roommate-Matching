package com.roommate.matching.RoommateMatching.api.question.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/question/v1")
public class QuestionResource {
    
    @Autowired
    private QuestionContainerService service;

    @ResponseBody
    @RequestMapping(value = "/create", params = "text")
    public QuestionItem createQuestion(
        @RequestParam(value = "text") final String text) {
        return service.createQuestion(text);
    }
}
