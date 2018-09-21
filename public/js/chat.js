var socket = io();

function scrollToBottom() {
  var newMessage = $('#messages').children('li:last-child');
  var clientHeight = $('#messages').prop('clientHeight');
  var scrollTop = $('#messages').prop('clientHeight');
  var scrollHeight = $('#messages').prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  console.log(clientHeight + scrollTop + newMessageHeight + lastMessageHeight);
  console.log(scrollHeight);

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    $('#messages').scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      
    }
  });
});

socket.on('disconnect', function() {

  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  $('#users').html('');
  
  var ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').append(ol);
});

socket.on('newMessage', function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    link: msg.link,
    createdAt: formattedTime
  });
  
  $('#messages').append(html);
  scrollToBottom();
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