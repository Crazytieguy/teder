import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { EnterName } from '../components/EnterName';
import { Waiting } from '../components/Waiting';

function connect(roomId, setRoomState) {
  return () => {
    const socket = io({
      path: '/api/socket.io',
    });
    socket.on('connect', () => {
      socket.emit('join', roomId);
    });
    socket.on('change-room-state', ({ roomState }) => {
      setRoomState(roomState);
    });
    return socket;
  };
}

export function Room() {
  const { roomId } = useParams();
  const [roomState, setRoomState] = useState('WAITING');
  const [conn] = useState(connect(roomId, setRoomState));
  const [name, setName] = useState(null);
  if (!name) {
    return <EnterName setName={setName} />;
  }
  const gameComponent = {
    WAITING: <Waiting setRoomState={setRoomState} conn={conn} />,
    HINTING: <div>Hinting</div>,
    GUESSING: <div>Guessing</div>,
    SCORE: <div>Score</div>,
  }[roomState];
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h5>{name}</h5>
        <h5>
          {`Room ${roomId}`}
        </h5>
      </div>
      {gameComponent}
    </div>
  );
}
