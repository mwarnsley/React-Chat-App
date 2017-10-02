import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {map} from 'lodash';

import User from './User';
import MainUser from './MainUser';

class UserContainer extends Component {
  render() {
    const {chats, users, emit} = this.props;
    const mainUser = users.mainUser;
    const usersJoined = users.usersJoined;
    const userChats =
      chats.length > 0
        ? map(chats, (chat, i) => {
            const findUserChat = usersJoined.find(user => user.id === chat.chatID);
            const main = chat[mainUser.name];
            const activeUserChat = chat[findUserChat.name];
            return (
              <Row key={i}>
                <Col md={6}>
                  <User chatID={chat.chatID} emit={emit} user={activeUserChat} />
                </Col>
                <Col md={6}>
                  <MainUser chatID={chat.chatID} emit={emit} user={main} />
                </Col>
              </Row>
            );
          })
        : null;
    return <div>{userChats}</div>;
  }
}

export default UserContainer;
