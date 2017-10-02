import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import io from 'socket.io-client';

class UserLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }
  loginUser = () => {
    const {setChatConnection, emit} = this.props;
    const name = this.state.username;
    setChatConnection();
    emit('userJoined', {name});
    emit('setUser', {name});
    emit('setMainUser', {name});
    this.setState({username: ''});
  };
  onChange = e => {
    const username = e.target.value;
    this.setState({username});
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
