package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "userlocation")
public class UserLocationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userLocationId", nullable = false, updatable = false)
    private Long userLocationId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_fk", nullable = false)
    private UserItem user;

    @Column(name = "lat")
    private Long lat;

    @Column(name = "lng")
    private Long lng;

    public UserItem getUser() {
        return user;
    }

    public void setUser(final UserItem user) {
        this.user = user;
    }

    public Long getLat() {
        return lat;
    }

    public void setLat(final Long lat) {
        this.lat = lat;
    }

    public Long getLng() {
        return lng;
    }

    public void setLng(final Long lng) {
        this.lng = lng;
    }

    @Override
    public String toString() {
        return Stream.of(String.valueOf(userLocationId), String.valueOf(lat), String.valueOf(lng)).collect(Collectors.joining("-"));
    }
}
