package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.roommate.matching.RoommateMatching.api.surveyquestion.v1.SurveyQuestionItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "answer")
public class AnswerItem {

	public enum AnswerType {
		GENERAL, PERSONAL, PREFERENCE;
	}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "answerId")
    private Long answerId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_fk", nullable = false)
	@JsonBackReference
    private UserItem user;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "surveyquestion_fk")
	@JsonBackReference
	private SurveyQuestionItem surveyQuestion;

	@Column(name = "data")
	@NotEmpty(message = "Please provide your answer")
	private String data;

	@Enumerated(EnumType.STRING)
	@Column(name = "type", nullable = false)
	private AnswerType type;

    public Long getId() {
		return answerId;
	}

	public void setId(final Long answerId) {
		this.answerId = answerId;
	}

    public UserItem getUser() {
		return user;
	}

	public void setUser(final UserItem user) {
		this.user = user;
	}

	public SurveyQuestionItem getSurveyQuestion() {
		return surveyQuestion;
	}

	public void setSurveyQuestion(final SurveyQuestionItem surveyQuestion) {
		this.surveyQuestion = surveyQuestion;
	}

	public String getData() {
		return data;
	}

	public void setData(final String data) {
		this.data = data;
	}

	public AnswerType getAnswerType() {
		return type;
	}

	public void setAnswerType(final AnswerType type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return Stream.of(String.valueOf(answerId), user.toString(), surveyQuestion.toString(), data, type.name()).collect(Collectors.joining("-"));
	}
}
