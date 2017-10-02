// Function for opening a new chat
export function openChat(newUserChat) {
  return {
    type: 'OPEN_NEW_CHAT',
    payload: newUserChat,
  };
}

// Function for sending a new message
export function sendNewMessage(message) {
  return {
    type: 'SEND_NEW_MESSAGE',
    payload: message,
  };
}
