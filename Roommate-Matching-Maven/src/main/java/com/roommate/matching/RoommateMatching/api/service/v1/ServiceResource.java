package com.roommate.matching.RoommateMatching.api.service.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ServiceResource {

	@RequestMapping(value = "/")
	public ResponseEntity<String> root() {
		return new ResponseEntity<String>("ACK", HttpStatus.OK);
	}

	@RequestMapping(value = "/heartbeat")
	public ResponseEntity<String> heartbeat() {
		return new ResponseEntity<String>("ACK", HttpStatus.OK);
	}
}
