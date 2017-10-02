import React from 'react';

const Message = ({message}) => {
  // Formatting the time stamp for display
  const formatTime = timestamp => {
    const dt = new Date(timestamp * 1000);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    let newDT;
    let ampm;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    ampm = hours >= 12 ? 'PM' : 'AM';
    newDT = `${hours}:${minutes}:${seconds} ${ampm}`;

    return newDT;
  };
  const classes = message.type === 'sent' ? 'message-sent' : 'message-received';
  return (
    <div>
      <div className={classes}>{message.text}</div>
      <div className="clearfix" />
    </div>
  );
};

export default Message;
