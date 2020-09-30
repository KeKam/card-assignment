import React from 'react';

export type Props = {
  score: number;
};

export const ScoreDisplay = (props: Props) => {
  return (
    <div>
      <h2>Correct answers: {props.score}</h2>
    </div>
  );
};
