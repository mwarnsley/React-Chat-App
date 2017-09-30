import React, {Component} from 'react';

class Message extends Component {
  formatTime = timestamp => {
    const dt = new Date(timestamp * 1000);
    const hours = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
    const minutes = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
    const seconds = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    const newDT = `${hours}:${minutes}:${seconds} ${ampm}`;

    return newDT;
  };
  render() {
    const {message} = this.props;
    const formattedTime = this.formatTime(message.timeStamp);
    return (
      <div className="message">
        <strong />
        {formattedTime} - {message.text}
      </div>
    );
  }
}

export default Message;
