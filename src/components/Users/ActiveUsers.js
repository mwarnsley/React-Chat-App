import React from 'react';

const ActiveUsers = ({username, profileImage, onClick}) => {
  return (
    <li className="active-user-container" onClick={onClick}>
      <img className="profile-image" src={profileImage} alt="profile-image" />
      <span className="active-user-title">{username}</span>
    </li>
  );
};

export default ActiveUsers;
