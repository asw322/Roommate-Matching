package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/usermatch/v1")
public class UserMatchResource {
	@Autowired
	private UserMatchContainerService service;

	@ResponseBody
	@RequestMapping(value = "/create")
	public UserMatchItem createUserMatch(
			@RequestParam(value = "currentUserEmail") final String currentUserEmail,
			@RequestParam(value = "matchUserEmail") final String matchUserEmail) {
		return service.createUserMatch(currentUserEmail, matchUserEmail);
	}

	@ResponseBody
	@RequestMapping(value = "/get", params = "currentUserEmail")
	public List<UserMatchItem> getUserMatchByCurrentUserEmail(
			@RequestParam(value = "currentUserEmail") final String currentUserEmail) {
		return service.findMatchByCurrentUser(currentUserEmail);
	}
}
