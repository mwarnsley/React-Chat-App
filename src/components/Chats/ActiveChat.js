import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

import MessageForm from '../Messages/MessageForm';

class ActiveChat extends Component {
  render() {
    const {chat} = this.props;
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
          <FormGroup bsSize="large">
            <FormControl className="send-new-message" type="text" placeholder="New Message" />
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default ActiveChat;
