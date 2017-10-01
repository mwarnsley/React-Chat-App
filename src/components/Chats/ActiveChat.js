import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

import MessageForm from '../Messages/MessageForm';

class ActiveChat extends Component {
  render() {
    const {chat, emit} = this.props;
    return (
      <div className="active-chat-container">
        <h2 className="chat-user">{chat.name}</h2>
        <div className="messages-container">
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
          <div>Message</div>
        </div>
        <div className="send-message-container">
          <MessageForm emit={emit} user={chat} />
        </div>
      </div>
    );
  }
}

export default ActiveChat;
