const expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
});


  it ('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Chelsey',
      age: 27
    };
    let resUser = users.addUser(user.id, user.name, user.age);

    expect(users.users).toEqual([user]);
    
  });

  it ('should remove the user', () => {
    let removedUser = users.removeUser(users.users[0].id);

    expect(users.users.length).toBe(2);
    expect(users.users['Mike']).toBeFalsy();
  });

  it ('should not remove user', () => {
    // return a id that doesn't exist
    let removedUser = users.removeUser(10);

    expect(users.users.length).toEqual(3);
    expect(removedUser).toBeUndefined();
  });

  it ('should find user', () => {
    var resUser = users.getUser('1');

    expect(resUser).toEqual(users.users[0]);
  });

  it ('should not find user', () => {
    var resUser = users.getUser('10');
    expect(resUser).toBeUndefined();
  });

  it ('should return names for node course', () => {
    let names = users.getUserList('Node Course');

    expect(names).toEqual(['Mike', 'Julie']);
  });

  it ('should return names for react course', () => {
    let names = users.getUserList('React Course');

    expect(names).toEqual(['Jen']);
  });
});