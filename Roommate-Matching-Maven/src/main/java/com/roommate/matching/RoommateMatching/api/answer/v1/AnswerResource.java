package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.roommate.matching.RoommateMatching.api.answer.v1.AnswerItem.AnswerType;

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
        @RequestParam(value = "data") final String data,
        @RequestParam(value = "type") final AnswerType type) {
        return service.createAnswerByEmail(email, surveyQuestionId, data, type);
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

    @ResponseBody
    @RequestMapping(value = "/get-by-type")
    public List<AnswerItem> getAnswerByType(
        final Long id,
        @RequestParam(value = "type") final AnswerType type) {
        return service.findAnswerByAnswerType(id, type);
    }
}
