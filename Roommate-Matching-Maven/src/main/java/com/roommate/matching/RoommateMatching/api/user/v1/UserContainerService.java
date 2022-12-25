package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.google.common.base.Strings;

import jakarta.transaction.Transactional;

@Service("userContainerService")
@Transactional
public class UserContainerService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPreferredLocationContainerService userPreferredLocationContainerService;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${roommate.matching.server.url}")
    private String serverUrl;

    public java.util.Optional<UserItem> findUserById(final Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserItem> findUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<UserItem> findUserByResetToken(final String resetToken) {
        return userRepository.findByResetToken(resetToken);
    }

    public List<UserItem> findAllByEnabled(final boolean enabled) {
        return userRepository.findAllByEnabled(enabled);
    }

    // TODO: fix this (mailsender is not working)
    public String generateEmailVerification(final String email) {
        Optional<UserItem> userOptional = userRepository.findByEmail(email);
        if(!userOptional.isPresent()) {
            return "The user does not exist";
        }

        final String token = UUID.randomUUID().toString();
        UserItem user = userOptional.get();
        user.setResetToken(token);
        userRepository.save(user);

        final String verificationLink = new StringBuilder().append(serverUrl).append("/api/v1/verify").append(token).toString();

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                message.setFrom("alanwang53@gmail.com");
                message.setTo("alanwang@salesforce.com");
                message.setSubject("Email verification");
                
                message.setText(new StringBuilder().append("Click on the following link for email verification: ").append(verificationLink).toString());
            }
        };
        mailSender.send(messagePreparator);
        return "An email verification link has been sent";
    }

    public String createUser(final Map<String, String> parameters) {
        if(Strings.isNullOrEmpty(parameters.get("email")) ||
           Strings.isNullOrEmpty(parameters.get("pass")) ||
           Strings.isNullOrEmpty(parameters.get("firstname")) || 
           Strings.isNullOrEmpty(parameters.get("lastname")) ||
           Strings.isNullOrEmpty(parameters.get("preferredLocation"))) {
            return "Missing required params (email, pass, firstname, lastname, preferredLocation)";
        }

        Optional<UserItem> userExistOptional = userRepository.findByEmail(parameters.get("email"));
        if(userExistOptional.isPresent()) {
            return "User already exists, please log in";
        }

        final UserItem user = new UserItem();
        user.setEmail(parameters.get("email"));
        user.setPassword(parameters.get("pass"));
        user.setFirstName(parameters.get("firstname"));
        user.setLastName(parameters.get("lastname"));
        user.setEnabled(true);
        userRepository.save(user);
        setUserPreferredLocation(user, parameters.get("preferredLocation"));

        return "User created";
    }

    public void setUserPreferredLocation(final UserItem user, final String location) {
        userPreferredLocationContainerService.createUserPreferredLocation(user, location);
    }

    public void setUserInfoById(final Long id, final String firstName, final String lastName) {
        userRepository.setUserInfoById(id, firstName, lastName);
    }

    public void setUserOidcToken(final Long id, final String oidcToken) {
        userRepository.setUserOidcToken(id, oidcToken);
    }
}
