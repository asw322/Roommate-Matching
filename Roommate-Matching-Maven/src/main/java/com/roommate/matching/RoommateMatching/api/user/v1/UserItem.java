package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.roommate.matching.RoommateMatching.api.answer.v1.AnswerItem;

import com.roommate.matching.RoommateMatching.api.usermatch.v1.UserMatchItem;
import com.roommate.matching.RoommateMatching.api.usermatch.v1.UserMatchTransactionItem;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "user")
public class UserItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userId", nullable = false, updatable = false)
	private Long userId;

	@Column(name = "email", nullable = false, unique = true)
	@Email(message = "Please provide a valid e-mail")
	@NotEmpty(message = "Please provide an e-mail")
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "firstName")
	@NotEmpty(message = "Please provide your first name")
	private String firstName;

	@Column(name = "lastName")
	@NotEmpty(message = "Please provide your last name")
	private String lastName;

	@Column(name = "enabled")
	private boolean enabled;

	@Column(name = "createdOn")
	private Date createdOn;

	@Column(name = "lastLogin")
	private Date lastLogin;

	@Column(name = "resetToken")
	private String resetToken;

	@Column(name = "oidcToken")
	private String oidcToken;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@Column(nullable = true)
	@JsonManagedReference
	private Set<AnswerItem> answer;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private UserLocationItem userLocation;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@Column(nullable = true)
	@JsonManagedReference
	private Set<UserPreferredLocationItem> userPreferredLocation;

	@OneToMany(mappedBy = "currentUser", cascade = CascadeType.ALL)
	@Column(nullable = true)
	@JsonManagedReference
	private Set<UserMatchItem> userMatches;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@Column(nullable = true)
	@JsonManagedReference
	private Set<UserMatchTransactionItem> userMatchTransactions;

	public Long getId() {
		return userId;
	}

	public void setId(final Long userId) {
		this.userId = userId;
	}
	
	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(final Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(final Date createdOn) {
		this.createdOn = createdOn;
	}

	public String getPassword() {
		return password;
	}
    
	public void setPassword(final String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(final boolean value) {
		this.enabled = value;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(final String resetToken) {
		this.resetToken = resetToken;
	}

	public String getOidcToken() {
		return oidcToken;
	}

	public void setOidcToken(final String oidcToken) {
		this.oidcToken = oidcToken;
	}

	public Set<AnswerItem> getAnswer() {
		return answer;
	}

	public void setAnswer(final Set<AnswerItem> answer) {
		this.answer = answer;
	}

	public UserLocationItem getUserLocation() {
		return userLocation;
	}

	public void setUserLocation(final UserLocationItem userLocation) {
		this.userLocation = userLocation;
	}

	public Set<UserPreferredLocationItem> getUserPreferredLocation() {
		return userPreferredLocation;
	}

	public void setUserPreferredLocation(final Set<UserPreferredLocationItem> userPreferredLocation) {
		this.userPreferredLocation = userPreferredLocation;
	}

	public Set<UserMatchItem> getUserMatches() {
		return userMatches;
	}

	public void setUserMatches(final Set<UserMatchItem> userMatches) {
		this.userMatches = userMatches;
	}

	public Set<UserMatchTransactionItem> getUserMatchTransactions() {
		return userMatchTransactions;
	}

	public void setUserMatchTransactions(final Set<UserMatchTransactionItem> userMatchTransactions) {
		this.userMatchTransactions = userMatchTransactions;
	}

	@Override
	public String toString() {
		return Stream.of(String.valueOf(userId), email, password, firstName, lastName).collect(Collectors.joining("-"));
	}
}