import React, {Component} from 'react';
import {map} from 'lodash';
import io from 'socket.io-client';

import ActiveUsers from '../Users/ActiveUsers';

class SideBar extends Component {
  constructor() {
    super();

    this.state = {
      status: 'disconnected',
      messages: [
        {
          timeStamp: Date.now(),
          text: 'Welcome to Chatter Box',
        },
      ],
      users: [],
      user: '',
    };
  }
  openNewChat = () => {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('messageAdded', this.messageAdded);
  };
  connect = () => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${this.socket.id}`);
  };
  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };
  disconnect = () => {
    this.setState({
      status: 'disconnected',
    });
  };
  messageAdded = message => {
    const messages = this.state.messages.concat(message);
    this.setState({
      messages,
    });
  };
  renderActiveList = () => {
    const {activeUsers} = this.props;
    const usersActive = map(activeUsers, (user, index) => {
      return (
        <ActiveUsers onClick={this.openNewChat} key={index} username={user.username} profileImage={user.profileImage} />
      );
    });
    return usersActive;
  };
  render() {
    return (
      <div id="side_bar_container">
        <ul className="side-bar-content">
          <li className="sidebar-title-container">
            <span className="sidebar-title">Online Users</span>
          </li>
          {this.renderActiveList()}
        </ul>
      </div>
    );
  }
}

export default SideBar;
