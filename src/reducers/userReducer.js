import initialState from './initialState';

const userState = initialState.users;

export function userReducer(state = userState, action) {
  switch (action.type) {
    case 'GET_ACTIVE_USERS':
      const activeUsers = action.payload;
      return {
        ...state,
        activeUsers,
      };
      break;
    case 'SET_MAIN_USER':
      const currentUser = action.payload;
      return {
        ...state,
        currentUser,
      };
      break;
    case 'SET_USERS_JOINED':
      const usersJoined = action.payload;
      return {
        ...state,
        usersJoined,
      };
      break;
  }
  return state;
}
