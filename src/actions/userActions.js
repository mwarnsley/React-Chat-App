const activeUsers = [
  {
    username: 'Mark Anthony',
    profileImage:
      'https://cdn.flickeringmyth.com/wp-content/uploads/2015/01/superman-face-those-batman-v-superman-rumors-faked-by-warner-bros.jpeg',
  },
  {
    username: 'Terry Walker',
    profileImage:
      'http://cdn3.thr.com/sites/default/files/imagecache/landscape_928x523/2010/12/spider_man_dark_face_2010_a_l.jpg',
  },
  {
    username: 'Jim Brown',
    profileImage: 'http://manapop.com/wp-content/uploads/2014/10/the-hulk-eric-bana.jpg',
  },
  {
    username: 'Sara Johnson',
    profileImage: 'https://pbs.twimg.com/profile_images/891457926640136192/WF36X7wE.jpg',
  },
  {
    username: 'Jack Jones',
    profileImage:
      'http://cdn.movieweb.com/img.news.tops/NEMo2SubEosdPS_1_b/Chris-Evans-Talks-Steve-Rogers-And-The-Modern.jpg',
  },
  {
    username: 'Stacy Adams',
    profileImage: 'http://media.comicbook.com/2017/04/wonderwoman-dceu-989128-1280x0.png',
  },
];

export function getActiveusers() {
  return {
    type: 'GET_ACTIVE_USERS',
    payload: activeUsers,
  };
}
