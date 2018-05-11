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
