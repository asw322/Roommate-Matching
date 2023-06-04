package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "userPreferredLocation")
public class UserPreferredLocationItem {
    @Id
    @GeneratedValue()
    @Column(name = "userPreferredLocationId", nullable = false, updatable = false)
    private Long userPreferredLocationId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_fk", nullable = false)
	@JsonBackReference
    private UserItem user;

    @Column(name = "location")
    private String location;

    public Long getId() {
		return userPreferredLocationId;
	}

	public void setId(final Long userPreferredLocationId) {
		this.userPreferredLocationId = userPreferredLocationId;
	}

    public UserItem getUser() {
		return user;
	}

	public void setUser(final UserItem user) {
		this.user = user;
	}

    public String getLocation() {
        return location;
    }

    public void setLocation(final String location) {
        this.location = location;
    }

    @Override
	public String toString() {
		return Stream.of(String.valueOf(userPreferredLocationId), user.toString(), location).collect(Collectors.joining("-"));
	}
}
