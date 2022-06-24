import list from 'reducers/usersurvey/usersurveyListReducers';
import form from 'reducers/usersurvey/usersurveyFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
