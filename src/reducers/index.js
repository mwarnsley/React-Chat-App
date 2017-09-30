import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {chatReducer} from './chatReducer';

// Combining the reducers
export default combineReducers({
  users: userReducer,
  chats: chatReducer,
});
