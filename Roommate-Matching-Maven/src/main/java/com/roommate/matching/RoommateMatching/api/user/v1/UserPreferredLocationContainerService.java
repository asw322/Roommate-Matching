package com.roommate.matching.RoommateMatching.api.user.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service("userPreferredLocationContainerService")
@Transactional
public class UserPreferredLocationContainerService {
    @Autowired
    private UserPreferredLocationRepository userPreferredLocationRepository;

    // TODO: continue
}
