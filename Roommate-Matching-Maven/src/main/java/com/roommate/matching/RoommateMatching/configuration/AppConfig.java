package com.roommate.matching.RoommateMatching.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.roommate.matching.RoommateMatching.api.user.v1.UserUtil;

@Configuration
public class AppConfig {
    @Bean
    public UserUtil userUtil() {
        return new UserUtil();
    }
}
