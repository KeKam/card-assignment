import React, { useState } from 'react';

import { getValues } from './utils';

import { CardItem, Card } from './components/card-item/card-item';
import { ScoreDisplay } from './components/score-display/score-display';
import { CounterDisplay } from './components/counter-display/counter-display';

import './App.css';

export type Deck = {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

export const App = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [remaining, setRemaining] = useState(52);
  const [score, setScore] = useState(0);

  const startGame = async () => {
    const response = await fetch(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );

    const deck = await response.json();
    setDeck(deck);
    setScore(0);

    const newCard = await fetchNewCard(deck.deck_id);
    setCard(newCard);
  };

  const fetchNewCard = async (deckId: string) => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    const cardInfo = await response.json();
    setRemaining(cardInfo.remaining);

    return cardInfo.cards[0];
  };

  const guessHigher = async () => {
    if (deck && card && remaining > 0) {
      const newCard = await fetchNewCard(deck.deck_id);

      if (getValues(card.value) < getValues(newCard.value)) {
        setScore(score + 1);
        setCard(newCard);
      } else {
        setCard(newCard);
      }
    } else {
      setCard(null);
    }
  };

  const guessLower = async () => {
    if (deck && card && remaining > 0) {
      const newCard = await fetchNewCard(deck.deck_id);
      console.log(card.value, 'current', newCard.value);

      if (getValues(card.value) > getValues(newCard.value)) {
        setScore(score + 1);
        setCard(newCard);
      } else {
        setCard(newCard);
      }
    } else {
      setCard(null);
    }
  };

  return (
    <div className='container'>
      <div>
        <ScoreDisplay score={score} />
        <CounterDisplay remaining={remaining} />
      </div>
      <div className='card-container'>
        {card ? <CardItem card={card} /> : null}
      </div>
      {!card ? (
        <button className='button' onClick={startGame}>
          Start
        </button>
      ) : (
        <div>
          <button className='button' onClick={guessHigher}>
            Higher
          </button>
          <button className='button' onClick={guessLower}>
            Lower
          </button>
        </div>
      )}
    </div>
  );
};
