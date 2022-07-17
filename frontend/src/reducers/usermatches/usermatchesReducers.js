import list from 'reducers/usermatches/usermatchesListReducers';
import form from 'reducers/usermatches/usermatchesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
