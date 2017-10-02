import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';
import {isEmpty, map} from 'lodash';
// Import the components to use inside of this component
import SideBar from './Sidebar/SideBar';
import UserLogin from './Login/UserLogin';
import User from './Users/User';
import MainUser from './Users/MainUser';

// Importing the actions to use inside of this component
import {setUser, setMainUser, setUsersJoined, getActiveusers} from '../actions/userActions';
import {sendNewMessage, openChat} from '../actions/chatActions';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      status: 'disconnected',
    };
  }
  componentDidMount = () => {
    const {dispatch} = this.props;
    dispatch(getActiveusers());
  };
  connect = () => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${this.socket.id}`);
  };
  disconnect = users => {
    this.setState({
      status: 'disconnected',
    });
  };
  setMainUser = user => {
    const {dispatch} = this.props;
    dispatch(setMainUser(user));
  };
  setUser = user => {
    const {dispatch} = this.props;
    dispatch(setUser(user));
  };
  onUserJoin = users => {
    const {dispatch} = this.props;
    dispatch(setUsersJoined(users));
  };
  messageAdded = message => {
    const {dispatch} = this.props;
    dispatch(sendNewMessage(message));
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
    this.socket.on('renderChats', this.renderChat);
  };
  openNewConnection = name => {
    const {usersJoined} = this.props;
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
  openNewChat = username => {
    const {usersJoined, mainUser, dispatch} = this.props;
    const getUser = usersJoined.find(user => user.name === username);
    const newUserChat = {
      chatID: getUser.id,
      [getUser.name]: {
        id: getUser.id,
        name: getUser.name,
        received: [],
        sent: [],
      },
      [mainUser.name]: {
        id: mainUser.id,
        name: mainUser.name,
        received: [],
        sent: [],
      },
    };
    dispatch(openChat(newUserChat));
  };
  renderChat = () => {
    const {openChats, mainUser, usersJoined} = this.props;
    console.log('THIS IS RUNNING');
    const chats = map(openChats, (chat, i) => {
      const findUserChat = usersJoined.find(user => user.id === chat.chatID);
      const main = chat[mainUser.name];
      const activeUserChat = chat[findUserChat.name];
      return (
        <Row key={i}>
          <Col md={6}>
            <User emit={this.emit} user={activeUserChat} />
          </Col>
          <Col md={6}>
            <MainUser emit={this.emit} user={main} />
          </Col>
        </Row>
      );
    });
    return chats;
  };
  emitChats = () => {
    this.emit('renderChats');
  };
  render() {
    const {activeUsers, dispatch, users, mainUser, usersJoined} = this.props;
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
            <SideBar openNewConnection={this.openNewConnection} activeUsers={activeUsers} dispatch={dispatch} />
            <Grid className="content-container">{usersJoined.length > 1 ? this.emitChats() : null}</Grid>
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
   * The Main user that is logged in.
   */
  mainUser: state.users.mainUser,
  /*
   * The Users who the current user has started chats with
   */
  usersJoined: state.users.usersJoined,
  /*
   * The chats that are currently open with the active users
   */
  openChats: state.chats.openChats,
}))(Chat);
