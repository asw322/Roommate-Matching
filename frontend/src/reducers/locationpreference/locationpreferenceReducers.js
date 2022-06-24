import list from 'reducers/locationpreference/locationpreferenceListReducers';
import form from 'reducers/locationpreference/locationpreferenceFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
