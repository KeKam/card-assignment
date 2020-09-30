import React, { useState, useEffect } from 'react';

import { Card } from './components/card';

export type Deck = {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
};

export const App = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      const json = await response.json();

      setDeck(json);
    };
    fetchDeck();
  }, []);

  const fetchNewCard = async () => {
    if (deck) {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );

      const json = await response.json();
      setCards(json.cards);
      setRemaining(json.remaining);
      console.log(json);
    }
  };

  return (
    <div>
      <div>{remaining}</div>
      <Card cards={cards} />
      <button onClick={fetchNewCard}>Start</button>
    </div>
  );
};
