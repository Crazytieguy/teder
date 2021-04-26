import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import { onEnter } from '../utils';

export function Hinting({ socket, room, id }) {
  const [hintInput, setHintInput] = useState('');
  const [status, setStatus] = useState('Enter a hint');
  const teder = room.tedarim.find((t) => t.hinter.id === id);
  if (status !== 'Hint received' && teder.hint) {
    setStatus('Hint received');
  }
  const [min, max] = [0, 1];
  return (
    <div>

      <Slider
        className="pt-5"
        min={min}
        max={max}
        marks={[{ value: min, label: teder.prompt.low }, { value: max, label: teder.prompt.high }]}
        value={teder.actualHeight}
        valueLabelDisplay="on"
        disabled
      />

      <input
        style={{ width: '200px' }}
        className="form-control justify-content-center"
        placeholder="Give a hint!"
        value={hintInput}
        onChange={(e) => setHintInput(e.target.value)}
        onKeyUp={onEnter(() => {
          socket.emit('teder', { ...teder, hint: hintInput });
          setStatus('Hint sent');
        })}
      />

      <h5>{status}</h5>

    </div>
  );
}
