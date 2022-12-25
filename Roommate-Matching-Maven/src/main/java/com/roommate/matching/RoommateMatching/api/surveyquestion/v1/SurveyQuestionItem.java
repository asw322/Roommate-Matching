package com.roommate.matching.RoommateMatching.api.surveyquestion.v1;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.roommate.matching.RoommateMatching.api.answer.v1.AnswerItem;
import com.roommate.matching.RoommateMatching.api.question.v1.QuestionItem;
import com.roommate.matching.RoommateMatching.api.survey.v1.SurveyItem;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "surveyquestion")
public class SurveyQuestionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "surveyQuestionId", nullable = false, updatable = false)
    private Long surveyQuestionId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "survey_fk")
    @JsonBackReference
    private SurveyItem survey;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "question_fk")
    @JsonBackReference
    private QuestionItem question;
    
    @OneToMany(mappedBy = "surveyQuestion", cascade = CascadeType.ALL)
    @Column(nullable = true)
    @JsonManagedReference
    private Set<AnswerItem> answer;

    public Long getId() {
        return surveyQuestionId;
    }

    public void setId(final Long surveyQuestionId) {
        this.surveyQuestionId = surveyQuestionId;
    }

    public SurveyItem getSurvey() {
        return survey;
    }

    public void setSurvey(final SurveyItem survey) {
        this.survey = survey;
    }

    public QuestionItem getQuestion() {
        return question;
    }

    public void setQuestion(final QuestionItem question) {
        this.question = question;
    }

    public Set<AnswerItem> getAnswer() {
        return answer;
    }

    public void setAnswer(final Set<AnswerItem> answer) {
        this.answer = answer;
    }

    @Override
	public String toString() {
		return Stream.of(String.valueOf(surveyQuestionId), survey.toString(), question.toString()).collect(Collectors.joining("-"));
	}
}
