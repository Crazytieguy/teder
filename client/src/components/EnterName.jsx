import clsx from 'clsx';
import React, { useState } from 'react';
import { onEnter } from '../utils';

export function EnterName({ setName }) {
  const [nameInput, setNameInput] = useState('');
  return (
    <div>
      <h2 className="m-2">Enter Your Name!</h2>
      <div className="form-inline">

        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className={clsx('form-control')}
          placeholder="Name"
          onKeyUp={onEnter(() => setName(nameInput))}
        />
        <button
          onClick={() => setName(nameInput)}
          className={clsx('btn', 'btn-primary')}
        >
          Set Name

        </button>
      </div>
    </div>
  );
}
