import React from 'react';

export type CardType = {
  image: string;
  value: string;
  suit: string;
  code: string;
};

export type CardProps = {
  cards: CardType[];
};

export const Card = (props: CardProps) => {
  return (
    <div>
      {props.cards[0] !== undefined ? (
        <img src={props.cards[0].image} alt='card' />
      ) : null}
    </div>
  );
};
