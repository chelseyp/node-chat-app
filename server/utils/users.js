// addUser (id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  } 

  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
  }

  removeUser(id) {
    var user = this.getUser(id);
    this.users = this.users.filter(user => user.id != id);
    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = {Users};