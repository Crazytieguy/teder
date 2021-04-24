import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { onEnter } from '../utils';

function createRoom() {
  return axios.post('/api/create/').then((response) => response.data.id);
}

function goToRoom({ roomId, push }) {
  if (!roomId) {
    return () => createRoom()
      .then((id) => push(`/rooms/${id}`));
  }
  return () => push(`/rooms/${roomId}`);
}

export function JoinRoom() {
  const { push } = useHistory();
  const [roomIdInput, setRoomIdInput] = useState('');
  return (
    <div>

      <h2 className="m-2">Join or create a room to play :)</h2>

      <div className="form-inline">
        <input
          style={{ width: '120px' }}
          className={clsx('form-control')}
          placeholder="Room ID"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          onKeyUp={onEnter(goToRoom({ roomId: roomIdInput, push }))}
        />

        <button
          className={clsx('btn', 'btn-primary')}
          onClick={goToRoom({ roomId: roomIdInput, push })}
        >
          Join Room
        </button>
      </div>

      <hr />

      <div>
        <button
          className={clsx('btn', 'btn-primary')}
          onClick={goToRoom({ push })}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
