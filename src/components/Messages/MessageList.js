import React, {Component} from 'react';
import {map} from 'lodash';

import Message from './Message';

const MessageList = ({messages}) => {
  return (
    <div className="message-list">
      {map(messages, (message, i) => {
        return <Message key={i} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
