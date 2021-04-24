import clsx from 'clsx';
import React from 'react';

export function Waiting({ socket, id }) {
  return (
    <div>
      <h2 className="m2">Waiting for players</h2>
      <button
        className={clsx('btn', 'btn-primary')}
        onClick={() => socket.emit('start', id)}
      >
        Start Game
      </button>
    </div>
  );
}
