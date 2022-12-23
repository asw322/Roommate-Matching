package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Optional;

@Controller
@RequestMapping("/api/user/v1")
public class UserResource {

    @Autowired
    private UserContainerService service;
    
    // Eventually replace with oidc
    @ResponseBody
    @RequestMapping(value = "/login", params = "username")
    public String loginWithUsername(
        @RequestParam(value = "username") final String username,
        @RequestParam(value = "pass") final String pass) {
        return String.format("Hi %s %s", username, pass);
    }

    @ResponseBody
    @RequestMapping(value = "/login", params = "phone")
    public String loginWithPhone(
        @RequestParam(value = "phone") final String phone,
        @RequestParam(value = "pass") final String pass) {
        return String.format("Hey %s %s", phone, pass);
    }

    @ResponseBody
    @RequestMapping(value = "/generate-email-verification")
    public String generateEmailVerification(
        @RequestParam(value = "email") final String email) {
        return service.generateEmailVerification(email);
    }

    @ResponseBody
    @RequestMapping(value = "/create-user")
    public String createUser(@RequestParam Map<String, String> parameters) {
        return service.createUser(parameters);
    }

    @ResponseBody
    @RequestMapping(value = "/list-all-active-users")
    public List<UserItem> listAllActiveUsers(
        @RequestParam(value = "enabled") final boolean enabled) {
        return service.findAllByEnabled(enabled);
    }

    @ResponseBody
    @RequestMapping(value = "/update-user")
    public void updateUser() {
        final UserItem user = service.findUserByEmail("alanwang53@gmail.com").get();
        service.setUserInfoById(user.getId(), "John", "Doe");
    }

    @ResponseBody
    @RequestMapping(value = "/get-first-name")
    public String getFirstName(
        @RequestParam(value = "email") final String email) {
        Optional<UserItem> optional = service.findUserByEmail(email);
        if(!optional.isPresent()) {
            return "Error cannot find user";
        }
        UserItem user = optional.get();
        return user.getFirstName();
    }
}
