const activeUsers = [
  {
    username: 'Donald Trump',
    profileImage: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160118134132-donald-trump-nigel-parry-large-169.jpg',
  },
  {
    username: 'Barrack Obama',
    profileImage: 'http://cdn.history.com/sites/2/2013/11/obama_color-AB.jpeg',
  },
  {
    username: 'George W. Bush',
    profileImage: 'http://static.snopes.com/app/uploads/2017/03/George_W_Bush_fb.jpg',
  },
  {
    username: 'Bill Clinton',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/1200px-Bill_Clinton.jpg',
  },
  {
    username: 'George H.W. Bush',
    profileImage:
      'https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_300%2Cq_80%2Cw_300/MTE1ODA0OTcxMjgzODc1MzQx/george-h-walker-bush-38066-1-402.jpg',
  },
  {
    username: 'Ronald Regan',
    profileImage:
      'https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_300%2Cq_80%2Cw_300/MTE5NDg0MDU1MTA5OTkzOTk5/ronald-reagan-9453198-1-402.jpg',
  },
  {
    username: 'Jimmy Carter',
    profileImage: 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2MTc3MDA4MTM5/jimmy-carter-9240013-1-402.jpg',
  },
];

// Gets the list of active users
export function getActiveusers() {
  return {
    type: 'GET_ACTIVE_USERS',
    payload: activeUsers,
  };
}

// Sets the users when they have been clicked on from the sidebar
export function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

// Sets the main user being logged in
export function setMainUser(user) {
  return {
    type: 'SET_MAIN_USER',
    payload: user,
  };
}

// Setting the users who we have joined conversation with
export function setUsersJoined(users) {
  return {
    type: 'SET_USERS_JOINED',
    payload: users,
  };
}
