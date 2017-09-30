import React, {Component} from 'react';

class ActiveUsers extends Component {
  render() {
    const {username, profileImage, onClick} = this.props;
    return (
      <li className="active-user-container" onClick={onClick}>
        <img className="profile-image" src={profileImage} alt="profile-image" />
        <span className="active-user-title">{username}</span>
      </li>
    );
  }
}

export default ActiveUsers;
