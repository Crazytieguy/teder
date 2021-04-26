import { Slider } from '@material-ui/core';
import React, { useState } from 'react';

export function Guessing({ socket, room, id }) {
  const [sliderIsMoving, setSliderIsMoving] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const teder = room.tedarim.find((t) => t.guessIsFinal === false);
  if (!sliderIsMoving && sliderValue !== teder.guessedHeight) {
    setSliderValue(teder.guessedHeight);
  }
  const isHinter = teder.hinter.id === id;
  const [min, max] = [0, 1];
  return (
    <div>
      <Slider
        className="pt-5"
        min={min}
        max={max}
        step={0.01}
        marks={[
          { value: min, label: teder.prompt.low },
          { value: max, label: teder.prompt.high },
        ]}
        value={sliderValue}
        valueLabelDisplay="on"
        disabled={isHinter}
        onChange={(e, v) => {
          setSliderValue(v);
          setSliderIsMoving(true);
        }}
        onChangeCommitted={(e, v) => {
          socket.emit('teder', { ...teder, guessedHeight: v });
          setSliderIsMoving(false);
        }}
      />
      <div className="d-flex justify-content-center">
        <h5>{teder.hint}</h5>
      </div>
    </div>
  );
}
