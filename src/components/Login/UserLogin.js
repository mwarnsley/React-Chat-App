import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import io from 'socket.io-client';
import {getActiveusers} from '../../actions/userActions';

class UserLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }
  componentWillMount = () => {
    this.socket = io('http://localhost:3000');
  };
  loginUser = () => {
    const {setUser, dispatch, connect, onUserJoin} = this.props;
    const name = this.state.username;
    this.socket.on('connect', connect(this.socket));
    this.socket.on('userJoined', onUserJoin);
    setUser({name});
    this.emit('userJoined', {name});
    dispatch(getActiveusers());
    this.setState({
      username: '',
    });
  };
  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };
  onChange = e => {
    const username = e.target.value;
    this.setState({
      username,
    });
  };
  handleEnterPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      this.loginUser();
    }
  };
  render() {
    const usernameValue = this.state.username;
    return (
      <div id="login_container">
        <h2 className="user-login-title">User Login</h2>
        <hr />
        <FormGroup bsSize="large" className="login-input-container">
          <FormControl
            autoFocus
            type="text"
            onKeyDown={this.handleEnterPress}
            onChange={this.onChange}
            value={usernameValue}
            placeholder="Choose a Username"
          />
        </FormGroup>
        <Button bsSize="large" className="login-btn" onClick={this.loginUser}>
          Login
        </Button>
      </div>
    );
  }
}

export default UserLogin;
