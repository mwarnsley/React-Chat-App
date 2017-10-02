import React from 'react';

const Message = ({message}) => {
  const classes = message.type === 'sent' ? 'message-sent' : 'message-received';
  let messageText = message.text;
  return (
    <div>
      <div className={classes}>{messageText}</div>
      <div className="clearfix" />
    </div>
  );
};

export default Message;
