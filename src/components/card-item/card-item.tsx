import React from 'react';

export type Card = {
  image: string;
  value: string;
  suit: string;
  code: string;
};

export type Props = {
  card: Card | null;
};

export const CardItem = (props: Props) => {
  return (
    <div>
      <img src={props.card?.image} alt='Card' />
    </div>
  );
};
