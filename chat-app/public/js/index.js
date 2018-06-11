var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  $('<li/>', {text: `${message.from} ${moment(message.createdAt).format('H:mm:ss')}: ${message.text}`}).appendTo('#messages');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name="message"]').val(),
  }, function () {
    console.log('Got it');
  })
});


