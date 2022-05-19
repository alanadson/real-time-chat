// const users = [];

// join user to chat
// function userJoin(id, username, room) {
//     const user = { id, username, room };

//     users.push(user);

//     return user;
// }

// get current user
// function getCurrentUser(id) {
//     return users.find(user => user.id === id);
// }

// module.exports = {
//     userJoin,
//     getCurrentUser
// };

const users = {};

function addUser(user) {
  users[user.id] = user;
}

function removeUser(user) {
  delete users[user.id];
}

module.exports = {
  users,
  addUser,
  removeUser,
};
