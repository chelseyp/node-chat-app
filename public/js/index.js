var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${msg.from} ${formattedTime}:  `);
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
    $('[name=message]').val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(error) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location', error);
  });
});