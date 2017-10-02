import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import io from 'socket.io-client';
import {isEmpty} from 'lodash';
import activeUsers from '../activeUsers';

// Import the components to use inside of this component
import SideBar from './Sidebar/SideBar';
import UserLogin from './Login/UserLogin';
import UserContainer from './Users/UserContainer';

class Chat extends Component {
  state = {
    status: 'disconnected',
    users: {
      currentUser: {},
      activeUsers,
      usersJoined: [],
      mainUser: {},
    },
    chats: {
      openChats: [],
    },
  };
  connect = () => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${this.socket.id}`);
  };
  disconnect = () => {
    this.setState({
      status: 'disconnected',
    });
  };
  setMainUser = user => {
    this.setState({
      users: {
        ...this.state.users,
        mainUser: user,
      },
    });
  };
  setUser = user => {
    this.setState({
      users: {
        ...this.state.users,
        currentUser: user,
      },
    });
  };
  onUserJoin = users => {
    this.setState({
      users: {
        ...this.state.users,
        usersJoined: users,
      },
    });
  };
  messageAdded = updateMessages => {
    this.setState({
      chats: {
        ...this.state.chats,
        openChats: updateMessages,
      },
    });
  };
  openNewChat = newUserChat => {
    this.setState({
      chats: {
        ...this.state.chats,
        openChats: [...this.state.chats.openChats, newUserChat],
      },
    });
  };
  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };
  setChatConnection = () => {
    this.socket = io('http://localhost:3000', {forceNew: true});
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('messageAdded', this.messageAdded);
    this.socket.on('userJoined', this.onUserJoin);
    this.socket.on('setUser', this.setUser);
    this.socket.on('setMainUser', this.setMainUser);
    this.socket.on('openNewChat', this.openNewChat);
  };
  openNewConnection = name => {
    const usersJoined = this.state.users.usersJoined;
    const findDupUser = usersJoined.find(user => user.name === name);
    if (findDupUser) {
      return;
    }
    this.setChatConnection();
    this.emit('userJoined', {name});
    this.emit('setUser', {name});
    this.emit('openNewChat', name);
    this.socket.removeAllListeners();
  };

  render() {
    const mainUser = this.state.users.mainUser;
    const activeUsers = this.state.users.activeUsers;
    const openChats = this.state.chats.openChats;
    const users = this.state.users;
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        {isEmpty(mainUser) ? (
          <UserLogin setChatConnection={this.setChatConnection} emit={this.emit} />
        ) : (
          <div>
            <SideBar openNewConnection={this.openNewConnection} activeUsers={activeUsers} />
            <Grid className="content-container">
              <UserContainer emit={this.emit} users={users} chats={openChats} />
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Chat;
