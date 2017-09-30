import React, {Component} from 'react';
import {Grid, Row, PageHeader} from 'react-bootstrap';

class Chat extends Component {
  render() {
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        <Grid />
      </div>
    );
  }
}

export default Chat;
