package com.roommate.matching.RoommateMatching.api.usermatch.v1.operations;

import org.springframework.stereotype.Component;

import com.roommate.matching.RoommateMatching.api.usermatch.v1.UserMatchItem;
import com.roommate.matching.RoommateMatching.api.usermatch.v1.UserMatchTransactionItem;

@Component
public class UserMatchingOpertions {
    public void performMatch(final UserMatchTransactionItem userMatchItem) {
        // perform the actual matching
        System.out.println("Performing actual matching on " + userMatchItem.toString());
    }
}
