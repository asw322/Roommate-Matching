package com.roommate.matching.RoommateMatching.api.question.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service("questionContainerService")
@Transactional
public class QuestionContainerService {
    @Autowired
    private QuestionRepository questionRepository;

    public QuestionItem createQuestion(final String text) {
        final QuestionItem question = new QuestionItem();
        question.setText(text);
        return questionRepository.save(question);
    }

    public QuestionItem findById(final Long id) {
        java.util.Optional<QuestionItem> optional = questionRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }
}
