import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { Waiting } from './Waiting';

function connect(setSocket) {
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'],
  });
  socket.on('connect', () => setSocket(socket));
}

export function Room({ name, roomId, id }) {
  const [room, setRoom] = useState({});
  const [socket, setSocket] = useState(null);
  const render = (component) => (
    <div>
      <h5>
        {`Room ${room.id}`}
      </h5>
      <div className="d-flex justify-content-between">
        {room.players.map((player) => <h5>{player.name}</h5>)}
      </div>
      {component}
    </div>
  );
  if (!socket) {
    connect(setSocket);
    return <div>Connecting</div>;
  }
  switch (room.state) {
    case 'WAITING':
      return render(<Waiting {...{ socket, id }} />);
    case 'HINTING':
      return render(<div>Hinting</div>);
    case undefined:
      console.log(room);
      socket.on('update-room', setRoom);
      socket.emit('join', { name, roomId, id }, setRoom);
      return <div>Joining Room</div>;
    default:
      return <div>Unknown State</div>;
  }
}
