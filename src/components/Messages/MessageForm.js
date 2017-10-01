import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';

class MessageForm extends Component {
  constructor() {
    super();

    this.state = {
      messageValue: '',
    };
  }
  onSubmit = e => {
    const {emit, user} = this.props;
    const text = this.state.messageValue.trim();
    emit('messageAdded', {
      timeStamp: Date.now(),
      text,
      user: user.name,
    });
    this.setState({
      messageValue: '',
    });
  };
  onChange = e => {
    const messageValue = e.target.value;
    this.setState({
      messageValue,
    });
  };
  enterSubmit = e => {
    if (e.keyCode === 13 || e.which === 13) {
      this.onSubmit();
    }
  };
  render() {
    const textValue = this.state.messageValue;
    return (
      <div>
        <FormGroup bsSize="large">
          <FormControl
            className="send-new-message"
            type="text"
            onKeyDown={this.enterSubmit}
            placeholder="New Message"
            value={textValue}
            onChange={this.onChange}
          />
        </FormGroup>
        <Button bsSize="large" onClick={this.onSubmit}>
          SEND
        </Button>
      </div>
    );
  }
}

export default MessageForm;
