import list from 'reducers/userpreference/userpreferenceListReducers';
import form from 'reducers/userpreference/userpreferenceFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
