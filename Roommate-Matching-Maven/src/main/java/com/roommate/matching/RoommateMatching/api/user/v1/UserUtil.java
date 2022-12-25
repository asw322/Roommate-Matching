package com.roommate.matching.RoommateMatching.api.user.v1;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.base.Optional;

public class UserUtil {
    @Autowired
    private UserContainerService userContainerService;

    public UserItem getUser(final Long id) {
        java.util.Optional<UserItem> optional = userContainerService.findUserById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public UserItem getUser(final String email) {
        Optional<UserItem> optional = userContainerService.findUserByEmail(email);
        return optional.isPresent() ? optional.get() : null;
    }
}
