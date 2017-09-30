import initialState from './initialState';

const chatState = initialState.chats;

export function chatReducer(state = chatState, action) {
  switch (action.type) {
    case 'SET_USER':
      const newChat = action.payload;
      const findDupChat = state.openChats.find(chat => chat.name === newChat.name);
      const newChatState = findDupChat ? state.openChats : [...state.openChats, newChat];
      return {
        ...state,
        openChats: newChatState,
      };
      break;
  }
  return state;
}
