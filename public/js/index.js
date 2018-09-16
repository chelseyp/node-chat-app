var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(msg) {
  console.log(msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
  console.log('Location', msg);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${msg.from}:  `);
  a.attr('href', msg.link);
  li.append(a);
  
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {
    
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!'geolocation' in navigator) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(error) {
    alert('Unable to fetch location', error);
  });
});