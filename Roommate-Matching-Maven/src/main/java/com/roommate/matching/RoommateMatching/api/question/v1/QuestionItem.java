package com.roommate.matching.RoommateMatching.api.question.v1;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "question")
public class QuestionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionId", nullable = false, updatable = false)
    private Long questionId;

    @Column(name = "text", nullable = false)
    @NotEmpty(message = "Please provide the question text")
    private String text;

    public Long getId() {
        return questionId;
    }

    public void setId(final Long questionId) {
        this.questionId = questionId;
    }

    public String getText() {
        return text;
    }

    public void setText(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return Stream.of(String.valueOf(questionId), text).collect(Collectors.joining("-"));
    }
}
