import {combineReducers} from 'redux';

import {userReducer} from './userReducer';

// Combining the reducers
export default combineReducers({
  users: userReducer,
});
