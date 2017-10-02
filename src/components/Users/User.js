import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

import MessageForm from '../Messages/MessageForm';
import MessageList from '../Messages/MessageList';

const User = ({user, emit, chatID}) => {
  return (
    <div className="active-chat-container">
      <h2 className="chat-user">{user.name}</h2>
      <div className="messages-container">
        <MessageList messages={user.messages} />
      </div>
      <div className="send-message-container">
        <MessageForm chatID={chatID} emit={emit} user={user} />
      </div>
    </div>
  );
};

export default User;
