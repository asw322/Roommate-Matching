package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/usermatchtransaction/v1")
public class UserMatchTransactionResource {
    @Autowired
    private UserMatchTransactionContainerService service;

    @ResponseBody
    @RequestMapping(value = "/create")
    public UserMatchTransactionItem createUserMatchTransaction(
        @RequestParam(value = "userEmail") final String userEmail) {
        return service.createUserMatchTransaction(userEmail);
    }

    @ResponseBody
    @RequestMapping(value = "/get", params = "userEmail")
    public List<UserMatchTransactionItem> getUserMatchTransactionByUserEmail(
        @RequestParam(value = "userEmail") final String userEmail
    ) {
        return service.findMatchTransactionByUser(userEmail);
    }
}
