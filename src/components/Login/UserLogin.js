import React, {Component} from 'react';

import {FormGroup, FormControl, Button} from 'react-bootstrap';

class UserLogin extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }
  loginUser = () => {
    const {setUser, emit} = this.props;
    const name = this.state.username;
    setUser({name});
    emit('userJoined', {name});
    this.setState({
      username: '',
    });
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
        <h2>User Login</h2>
        <FormGroup bsSize="large">
          <FormControl type="text" onKeyDown={this.handleEnterPress} onChange={this.onChange} value={usernameValue} placeholder="Choose a Username" />
        </FormGroup>
        <Button onClick={this.loginUser}>Login</Button>
      </div>
    );
  }
}

export default UserLogin;
