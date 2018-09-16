const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it ('should generate correct message object', () => {
    var from = 'Chelsey';
    var text = 'Welcome to the chat!';
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text
    });
  });
});

describe('generateLocationMessage', () => {
  it ('should generate correct location object', () => {
    var from = 'Admin';
    var latitude = 10.00;
    var longitude = -10.00;
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe(from);
    expect(message.link).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(typeof message.createdAt).toBe('number');
  });
});