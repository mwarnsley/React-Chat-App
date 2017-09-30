import React, {Component} from 'react';
import {map} from 'lodash';
import io from 'socket.io-client';

import ActiveUsers from '../Users/ActiveUsers';

class SideBar extends Component {
  renderActiveList = () => {
    const {activeUsers, openNewConnection} = this.props;
    const usersActive = map(activeUsers, (user, index) => {
      return (
        <ActiveUsers
          onClick={() => openNewConnection(user.username)}
          key={index}
          username={user.username}
          profileImage={user.profileImage}
        />
      );
    });
    return usersActive;
  };
  render() {
    return (
      <div id="side_bar_container">
        <ul className="side-bar-content">
          <li className="sidebar-title-container">
            <span className="sidebar-title">Online Users</span>
          </li>
          {this.renderActiveList()}
        </ul>
      </div>
    );
  }
}

export default SideBar;
