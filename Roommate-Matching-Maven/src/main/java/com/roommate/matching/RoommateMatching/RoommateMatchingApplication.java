package com.roommate.matching.RoommateMatching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RoommateMatchingApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoommateMatchingApplication.class, args);
	}
}
