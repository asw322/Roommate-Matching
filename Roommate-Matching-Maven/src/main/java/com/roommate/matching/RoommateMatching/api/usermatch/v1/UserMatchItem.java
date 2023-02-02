package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table(name = "userMatch")
public class UserMatchItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userMatchId", nullable = false, updatable = false)
	private Long userMatchId;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "currentUser_fk", nullable = false)
	@JsonBackReference
	private UserItem currentUser;

	@ManyToOne(fetch = FetchType.LAZY, cascade =CascadeType.ALL)
	@JoinColumn(name = "matchUser_fk", nullable = false)
	@JsonBackReference
	private UserItem matchUser;

	@Column(name = "matchPosition")
	private Long matchPosition;

	@Column(name = "userMatchTimestamp", columnDefinition = "TIMESTAMP")
	private LocalDateTime userMatchTimestamp;

	public Long getId() {
		return userMatchId;
	}

	public void setId(final Long userMatchId) {
		this.userMatchId = userMatchId;
	}

	public UserItem getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(final UserItem currentUser) {
		this.currentUser = currentUser;
	}

	public UserItem getMatchUser() {
		return matchUser;
	}

	public void setMatchUser(final UserItem matchUser) {
		this.matchUser = matchUser;
	}

	public Long getMatchPosition() {
		return matchPosition;
	}

	public void setMatchPosition(final Long matchPosition) {
		this.matchPosition = matchPosition;
	}

	public LocalDateTime getUserMatchTimestamp() {
		return userMatchTimestamp;
	}

	public void setUserMatchTimestamp(final LocalDateTime userMatchTimestamp) {
		this.userMatchTimestamp = userMatchTimestamp;
	}

	@Override
	public String toString() {
		return Stream.of(String.valueOf(userMatchId), String.valueOf(matchPosition), String.valueOf(userMatchTimestamp)).collect(Collectors.joining("-"));
	}
}
