import React from 'react';

export type Props = {
  remaining: number;
};

export const CounterDisplay = (props: Props) => {
  return (
    <div>
      <h2>Cards remaining: {props.remaining}</h2>
    </div>
  );
};
