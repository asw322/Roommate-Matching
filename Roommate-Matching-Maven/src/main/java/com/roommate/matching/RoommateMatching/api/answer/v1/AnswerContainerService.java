package com.roommate.matching.RoommateMatching.api.answer.v1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.roommate.matching.RoommateMatching.api.answer.v1.AnswerItem.AnswerType;
import com.roommate.matching.RoommateMatching.api.surveyquestion.v1.SurveyQuestionContainerService;
import com.roommate.matching.RoommateMatching.api.surveyquestion.v1.SurveyQuestionItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserContainerService;
import com.roommate.matching.RoommateMatching.api.user.v1.UserItem;
import com.roommate.matching.RoommateMatching.api.user.v1.UserUtil;

import jakarta.transaction.Transactional;

@Service("answerContainerService")
@Transactional
public class AnswerContainerService {
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private SurveyQuestionContainerService surveyQuestionContainerService;
    @Autowired
    private UserUtil userUtil;

    public AnswerItem createAnswerByEmail(final String email, final Long surveyQuestionId, final String data, final AnswerType type) {

        UserItem user = userUtil.getUser(email);
        
        final SurveyQuestionItem surveyQuestion = surveyQuestionContainerService.findById(surveyQuestionId);
        final AnswerItem answer = new AnswerItem();
        answer.setUser(user);
        answer.setSurveyQuestion(surveyQuestion);
        answer.setData(data);
        answer.setAnswerType(type);
        return answerRepository.save(answer);
    }

    public AnswerItem findAnswerById(final Long id) {
        java.util.Optional<AnswerItem> optional = answerRepository.findById(id);
        System.out.println(optional.get().toString());
        return optional.isPresent() ? optional.get() : null;
    }

    public List<AnswerItem> findAnswerByEmail(final String email) {
        UserItem user = userUtil.getUser(email);
        
        final List<AnswerItem> result = answerRepository.findByUser(user);
        return result;
    }

    public List<AnswerItem> findAnswerByAnswerType(final Long id, final AnswerType type) {
        UserItem user = userUtil.getUser(id);
        return answerRepository.findByUserAndType(user, type);
    }
}
