import React, {Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

import MessageForm from '../Messages/MessageForm';
import MessageList from '../Messages/MessageList';

class MainUser extends Component {
  render() {
    const {user, emit} = this.props;
    return (
      <div className="active-chat-container">
        <h2 className="chat-user">{user.name}</h2>
        <div className="messages-container">
          <MessageList messages={user.received} />
          <MessageList messages={user.sent} />
        </div>
        <div className="send-message-container">
          <MessageForm emit={emit} user={user} />
        </div>
      </div>
    );
  }
}

export default MainUser;
