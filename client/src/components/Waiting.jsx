import clsx from 'clsx';
import React, { useEffect } from 'react';

export function Waiting({ conn }) {
  return (
    <div>
      <h2 className="m2">Waiting for players</h2>
      <button
        className={clsx('btn', 'btn-primary')}
        onClick={() => conn.emit('start-game')}
      >
        Start Game
      </button>
    </div>
  );
}
