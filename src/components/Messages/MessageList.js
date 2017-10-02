import React, {Component} from 'react';
import {map} from 'lodash';

import Message from './Message';

class MessageList extends Component {
  render() {
    const {messages} = this.props;
    return (
      <div className="message-list">
        {map(messages, (message, i) => {
          return <Message key={i} message={message} />;
        })}
      </div>
    );
  }
}

export default MessageList;
