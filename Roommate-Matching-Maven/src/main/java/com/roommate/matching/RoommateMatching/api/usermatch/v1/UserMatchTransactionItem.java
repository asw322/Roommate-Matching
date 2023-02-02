package com.roommate.matching.RoommateMatching.api.usermatch.v1;

import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "userMatchTransaction")
public class UserMatchTransactionItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userMatchTransactionId", nullable = false, updatable = false)
	private Long userMatchTransactionId;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	// TODO: change nullable = false
	@JoinColumn(name = "user_fk", nullable = true)
	@JsonBackReference
	private UserItem user;

	@Column(name = "userMatchTransactionTimestamp", columnDefinition = "TIMESTAMP")
	private LocalDateTime userMatchTransactionTimestamp;

	public Long getId() {
		return userMatchTransactionId;
	}

	public void setId(final Long userMatchTransactionId) {
		this.userMatchTransactionId = userMatchTransactionId;
	}

	public UserItem getUser() {
		return user;
	}

	public void setUser(final UserItem user) {
		this.user = user;
	}

	public LocalDateTime getUserMatchTransactionTimestamp() {
		return userMatchTransactionTimestamp;
	}

	public void setUserMatchTransactionTimestamp(final LocalDateTime userMatchTransactionTimestamp) {
		this.userMatchTransactionTimestamp = userMatchTransactionTimestamp;
	}

	@Override
	public String toString() {
		return Stream.of(String.valueOf(userMatchTransactionId), String.valueOf(userMatchTransactionTimestamp)).collect(Collectors.joining("-"));
	}
}