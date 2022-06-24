import list from 'reducers/userquestionweight/userquestionweightListReducers';
import form from 'reducers/userquestionweight/userquestionweightFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
