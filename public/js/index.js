var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function(msg) {
  console.log(msg);

  socket.emit('createMessage', {
     from: msg.from,
     text: msg.text
   });
});

