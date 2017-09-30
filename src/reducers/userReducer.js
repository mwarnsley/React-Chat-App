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
  }
  return state;
}
