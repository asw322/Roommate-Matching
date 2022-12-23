package com.roommate.matching.RoommateMatching.api.user.v1;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.wavefront.WavefrontProperties.Application;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.common.base.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void test() {
        final UserItem insertItem = new UserItem();
        insertItem.setEmail("alanwang53@gmail.com");
        insertItem.setPassword("1234");
        insertItem.setFirstName("Alan");
        insertItem.setLastName("Wang");
        userRepository.save(insertItem);
        Optional<UserItem> optional = userRepository.findByEmail("alanwang53@gmail.com");
        UserItem foundItem = optional.get();
        assertNotNull(foundItem);
        assertEquals(insertItem.toString(), foundItem.toString());
    }
}
