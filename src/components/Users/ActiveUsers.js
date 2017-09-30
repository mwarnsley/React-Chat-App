import React, {Component} from 'react';

const ActiveUsers = ({username, onClick}) => {
  return (
    <li className="active-user-container" onClick={onClick}>
      <img className="profile-image" src={'http://lorempixel.com/400/200/'} alt="profile-pic" />
      <span className="active-user-title">{username}</span>
    </li>
  );
};

export default ActiveUsers;
