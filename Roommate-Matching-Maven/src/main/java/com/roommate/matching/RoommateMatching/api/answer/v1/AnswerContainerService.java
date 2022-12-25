package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.roommate.matching.RoommateMatching.api.surveyquestion.v1.SurveyQuestionContainerService;
import com.roommate.matching.RoommateMatching.api.surveyquestion.v1.SurveyQuestionItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserContainerService;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;

import jakarta.transaction.Transactional;

@Service("answerContainerService")
@Transactional
public class AnswerContainerService {
    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserContainerService userContainerService;
    @Autowired
    private SurveyQuestionContainerService surveyQuestionContainerService;

    public AnswerItem createAnswerByEmail(final String email, final Long surveyQuestionId, final String data) {

        Optional<UserItem> userOptional = userContainerService.findUserByEmail(email);
        if (!userOptional.isPresent()) {
            // TODO: throw error because user does not exist
            return null;
        }
        final SurveyQuestionItem surveyQuestion = surveyQuestionContainerService.findById(surveyQuestionId);
        final AnswerItem answer = new AnswerItem();
        answer.setUser(userOptional.get());
        answer.setSurveyQuestion(surveyQuestion);
        answer.setData(data);
        return answerRepository.save(answer);
    }

    public AnswerItem findAnswerById(final Long id) {
        java.util.Optional<AnswerItem> optional = answerRepository.findById(id);
        System.out.println(optional.get().toString());
        return optional.isPresent() ? optional.get() : null;
    }

    public List<AnswerItem> findAnswerByEmail(final String email) {
        Optional<UserItem> userOptional = userContainerService.findUserByEmail(email);
        if (!userOptional.isPresent()) {
            return null;
        }
        final List<AnswerItem> result = answerRepository.findByUser(userOptional.get());
        return result;
    }
}
