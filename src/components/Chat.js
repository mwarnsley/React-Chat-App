import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';

import SideBar from './Sidebar/SideBar';
import MessageForm from './Messages/MessageForm';
import MessageList from './Messages/MessageList';
import UserLogin from './Login/UserLogin';
import UserList from './Users/UserList';

import {getActiveusers} from '../actions/userActions';

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
  componentWillMount = () => {
    const {dispatch} = this.props;
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('messageAdded', this.messageAdded);
    this.socket.on('userJoined', this.onUserJoin);
    dispatch(getActiveusers());
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
    const {activeUsers} = this.props;
    const {user, users} = this.state;
    return (
      <div id="chat_app_container">
        <div className="header-container">
          <h1 className="chatter-box-title-container">
            <i className="fa fa-comments chatter-logo" aria-hidden="true" />
            <span className="chatter-box-title">Chatter Box</span>
          </h1>
        </div>
        {!user ? (
          <UserLogin emit={this.emit} setUser={this.setUser} />
        ) : (
          <div>
            <SideBar activeUsers={activeUsers} />
            <div className="content-container">
              <Grid>
                <Row>
                  <Col md={4}>
                    <UserList users={users} />
                  </Col>
                  <Col md={4}>
                    <MessageList {...this.state} />
                    <MessageForm {...this.state} emit={this.emit} />
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  activeUsers: state.users.activeUsers,
}))(Chat);
