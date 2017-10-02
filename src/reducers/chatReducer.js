import initialState from './initialState';
import {map} from 'lodash';

const chatState = initialState.chats;

export function chatReducer(state = chatState, action) {
  switch (action.type) {
    case 'OPEN_NEW_CHAT':
      const newChat = action.payload;
      return {
        ...state,
        openChats: [...state.openChats, newChat],
      };
      break;
    case 'SEND_NEW_MESSAGE':
      const newMessage = action.payload;
      const openChats = state.openChats;
      const newMessageState = map(openChats, chat => {
        if (chat.name === newMessage.user) {
          return {
            ...chat,
            messages: {
              received: [...chat.messages.received],
              sent: [...chat.messages.sent, newMessage],
            },
          };
        }
        return chat;
      });
      return {
        ...state,
        openChats: newMessageState,
      };
      break;
  }
  return state;
}
