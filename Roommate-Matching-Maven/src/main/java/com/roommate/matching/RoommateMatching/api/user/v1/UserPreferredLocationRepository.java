package com.roommate.matching.RoommateMatching.api.user.v1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userPreferredLocationRepository")
public interface UserPreferredLocationRepository extends JpaRepository<UserPreferredLocationItem, Long> {
    
}
