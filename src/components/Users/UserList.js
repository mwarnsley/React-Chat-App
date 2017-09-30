import React, {Component} from 'react';
import {map} from 'lodash';

class UserList extends Component {
  render() {
    const {users} = this.props;
    return (
      <div>
        <h3>Users ({users.length})</h3>
        <ul>
          {map(users, (user, i) => {
            return <li key={i}>{user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default UserList;
