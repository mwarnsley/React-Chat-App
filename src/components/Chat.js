import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';
import {isEmpty, map} from 'lodash';

import SideBar from './Sidebar/SideBar';
import MessageForm from './Messages/MessageForm';
import MessageList from './Messages/MessageList';
import UserLogin from './Login/UserLogin';
import UserList from './Users/UserList';
import ActiveChat from './Chats/ActiveChat';
import CurrentUser from './Users/CurrentUser';

import {setUser, setMainUser, setUsersJoined, getActiveusers} from '../actions/userActions';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
    };
  }
  connect = () => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${this.socket.id}`);
  };
  disconnect = users => {
    this.setState({
      status: 'disconnected',
      users,
    });
  };
  setUser = user => {
    const {dispatch} = this.props;
    dispatch(setUser(user));
  };
  setMainUser = user => {
    const {dispatch} = this.props;
    dispatch(setMainUser(user));
  };
  onUserJoin = users => {
    const {dispatch} = this.props;
    dispatch(setUsersJoined(users));
  };
  messageAdded = message => {
    const messages = this.state.messages.concat(message);
    this.setState({messages});
  };
  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };
  setChatConnection = () => {
    const {dispatch} = this.props;
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('messageAdded', this.messageAdded);
    this.socket.on('userJoined', this.onUserJoin);
    this.socket.on('setUser', this.setUser);
    this.socket.on('setMainUser', this.setMainUser);
    dispatch(getActiveusers());
  };
  openNewConnection = name => {
    this.setUser({name: name});
    this.emit('userJoined', {name: name});
  };
  renderChats = () => {
    const {openChats, currentUser} = this.props;
    const chats = map(openChats, (chat, i) => {
      return (
        <Row key={i}>
          <Col md={6}>
            <ActiveChat emit={this.emit} chat={chat} />
          </Col>
          <Col md={6}>
            <CurrentUser username={currentUser.name} />
          </Col>
        </Row>
      );
    });
    return chats;
  };
  render() {
    const {activeUsers, dispatch, users, currentUser} = this.props;
    console.log(this.state);
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        {isEmpty(currentUser) ? (
          <UserLogin setChatConnection={this.setChatConnection} emit={this.emit} />
        ) : (
          <div>
            <SideBar openNewConnection={this.openNewConnection} activeUsers={activeUsers} dispatch={dispatch} />
            <Grid className="content-container">{this.renderChats()}</Grid>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  /*
   * Active Users that are online to chat with
   */
  activeUsers: state.users.activeUsers,
  /*
   * The Current user that is logged in. The MAIN user
   */
  currentUser: state.users.currentUser,
  /*
   * The Users who the current user has started chats with
   */
  usersJoined: state.users.usersJoined,
  /*
   * The chats that are currently open with the active users
   */
  openChats: state.chats.openChats,
}))(Chat);
