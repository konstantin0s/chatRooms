function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('namesResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}

function joinRoom(socket, room) {
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', {
    text: nickname[socket.id] + ' has joined ' + room + '.'
  });
  var usersInRoom = io.sockets.clients(room);
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = 'Users currently in ' + room + ': ';
    for (var index in usersInRoom) {
      var usersSocketId = usersInRoom[index].id;
      if (usersSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
          usersInRoomSummary += nickNames[usersSocketId];
        }
      }
      usersInRoomSummary += '.';
      socket.emit('message', {text: usersInRoomSummary});
    }
  }
}
