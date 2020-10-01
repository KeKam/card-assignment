import React, { useState } from 'react';

import { getValues } from './utils';

import './App.css';

type Deck = {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

type CardInfo = {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
};

type Card = {
  image: string;
  value: string;
  suit: string;
  code: string;
};

enum Option {
  HIGHER = 'HIGHER',
  LOWER = 'LOWER',
}

export const App = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [remaining, setRemaining] = useState(52);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );

    const deck: Deck = await response.json();
    setDeck(deck);
    setScore(0);

    const newCard = await fetchNewCard(deck.deck_id);
    setCard(newCard);
  };

  const fetchNewCard = async (deckId: string): Promise<Card> => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    const cardInfo: CardInfo = await response.json();
    setRemaining(cardInfo.remaining);

    return cardInfo.cards[0];
  };

  const guess = async (guess: Option) => {
    if (deck && card && remaining > 0) {
      const newCard = await fetchNewCard(deck.deck_id);

      if (guess === Option.HIGHER) {
        if (getValues(card.value) < getValues(newCard.value)) {
          setScore(score + 1);
          setCard(newCard);
        } else {
          setCard(newCard);
        }
      } else {
        if (getValues(card.value) > getValues(newCard.value)) {
          setScore(score + 1);
          setCard(newCard);
        } else {
          setCard(newCard);
        }
      }
    } else {
      setCard(null);
    }
  };

  return (
    <div className='container'>
      <div>
        <h3>Correct answers: {score}</h3>
        <h3>Cards remaining: {remaining}</h3>
      </div>
      <div className='card-container'>
        {card ? <img src={card.image} alt='Card' /> : null}
      </div>
      {!card ? (
        <button className='button' onClick={startGame}>
          Start
        </button>
      ) : (
        <div>
          <button className='button' onClick={() => guess(Option.HIGHER)}>
            Higher
          </button>
          <button className='button' onClick={() => guess(Option.LOWER)}>
            Lower
          </button>
        </div>
      )}
    </div>
  );
};
