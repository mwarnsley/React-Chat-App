import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';

import SideBar from './Sidebar/SideBar';
import MessageForm from './Messages/MessageForm';
import MessageList from './Messages/MessageList';
import UserLogin from './Login/UserLogin';
import UserList from './Users/UserList';
import ActiveChat from './Chats/ActiveChat';
import CurrentUser from './Users/CurrentUser';

class Chat extends Component {
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
  // componentWillMount = () => {
  //   const {dispatch} = this.props;
  //   this.socket = io('http://localhost:3000');
  //   this.socket.on('connect', this.connect);
  //   this.socket.on('disconnect', this.disconnect);
  //   this.socket.on('messageAdded', this.messageAdded);
  //   this.socket.on('userJoined', this.onUserJoin);
  //   dispatch(getActiveusers());
  // };
  connect = socket => {
    this.setState({
      status: 'connected',
    });
    console.log(`Connected: ${socket.id}`);
  };
  // emit = (eventName, payload) => {
  //   console.log('Error Coming');
  //   this.socket.emit(eventName, payload);
  // };
  disconnect = users => {
    this.setState({
      status: 'disconnected',
      users,
    });
  };
  setUser = user => {
    this.setState({user});
  };
  onUserJoin = users => {
    this.setState({users});
  };
  messageAdded = message => {
    const messages = this.state.messages.concat(message);
    this.setState({messages});
  };
  render() {
    const {activeUsers, dispatch} = this.props;
    const {user, users} = this.state;
    console.log(this.state);
    //   <Col md={4}>
    //   <UserList users={users} />
    // </Col>
    // <Col md={4}>
    //   <MessageList {...this.state} />
    //   <MessageForm user={user} {...this.state} emit={this.emit} />
    // </Col>
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        {!user ? (
          <UserLogin
            {...this.state}
            setUser={this.setUser}
            connect={this.connect}
            dispatch={dispatch}
            onUserJoin={this.onUserJoin}
          />
        ) : (
          <div>
            <SideBar activeUsers={activeUsers} />
            <Grid className="content-container">
              <Row>
                <Col md={6}>
                  <ActiveChat user={user} {...this.state} emit={this.emit} />
                </Col>
                <Col md={6}>
                  <CurrentUser />
                </Col>
              </Row>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  activeUsers: state.users.activeUsers,
}))(Chat);
