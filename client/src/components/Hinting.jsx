import React from 'react';

export function Hinting({ socket, room, id }) {
  return <div {...{ socket, room, id }} />;
}
