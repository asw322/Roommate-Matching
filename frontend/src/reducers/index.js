
import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import locationpreference from 'reducers/locationpreference/locationpreferenceReducers';

import usersurvey from 'reducers/usersurvey/usersurveyReducers';

import userpreference from 'reducers/userpreference/userpreferenceReducers';

import userquestionweight from 'reducers/userquestionweight/userquestionweightReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    locationpreference,

    usersurvey,

    userpreference,

    userquestionweight,

  });

