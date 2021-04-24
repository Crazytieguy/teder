import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { onEnter } from '../utils';

function createRoom() {
  return axios.post('/api/create/').then((response) => response.data.id);
}

export function JoinRoom({ setRoomId }) {
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
          onKeyUp={onEnter(() => setRoomId(roomIdInput))}
        />

        <button
          className={clsx('btn', 'btn-primary')}
          onClick={() => setRoomId(roomIdInput)}
        >
          Join Room
        </button>
      </div>

      <hr />

      <div>
        <button
          className={clsx('btn', 'btn-primary')}
          onClick={() => createRoom().then(setRoomId)}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
