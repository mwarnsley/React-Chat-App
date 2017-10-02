import React from 'react';
import {map} from 'lodash';

import ActiveUsers from '../Users/ActiveUsers';

const SideBar = ({activeUsers, openNewConnection}) => {
  // Function to render the active user list on the sidebar
  const renderActiveList = () => {
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
  const numberActiveUsers = activeUsers.length;
  return (
    <div id="side_bar_container">
      <ul className="side-bar-content">
        <li className="sidebar-title-container">
          <span className="sidebar-title">Online Users ({numberActiveUsers})</span>
        </li>
        {renderActiveList()}
      </ul>
    </div>
  );
};

export default SideBar;
