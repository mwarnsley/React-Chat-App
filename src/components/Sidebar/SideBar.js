import React, {Component} from 'react';
import {map} from 'lodash';

import ActiveUsers from '../Users/ActiveUsers';

class SideBar extends Component {
  renderActiveList = () => {
    const numberUsers = [
      {username: 'Mark Anthony'},
      {username: 'Terry Walker'},
      {username: 'Jim Brown'},
      {username: 'Sara Johnson'},
      {username: 'Jack Jones'},
      {username: 'Stacy Adams'},
    ];
    const usersActive = map(numberUsers, (user, index) => {
      return <ActiveUsers key={index} username={user.username} />;
    });
    return usersActive;
  };
  render() {
    return (
      <div id="side_bar_container">
        <ul className="side-bar-content">
          <li className="sidebar-title-container">
            <span className="sidebar-title">Active Users</span>
          </li>
          {this.renderActiveList()}
        </ul>
      </div>
    );
  }
}

export default SideBar;
