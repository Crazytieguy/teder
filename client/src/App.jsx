import { CssBaseline } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { EnterName } from './components/EnterName';
import { JoinRoom } from './components/JoinRoom';
import { Room } from './components/Room';

function randomInteger(min = 0, max = 1000000) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function App() {
  const [name, setName] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const innerComponent = () => {
    if (!name) {
      return <EnterName setName={setName} />;
    }
    if (!roomId) {
      return <JoinRoom setRoomId={setRoomId} />;
    }
    const id = randomInteger();
    return <Room {...{ name, roomId, id }} />;
  };
  return (
    <div className={clsx('jumbotron', 'bg-light', 'container')}>
      <CssBaseline />
      {innerComponent()}
    </div>
  );
}
