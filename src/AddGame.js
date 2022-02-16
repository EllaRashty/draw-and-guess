import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";

const AddGame = () => {
  const [word, setWord] = useState('');
  const [points, setPoints] = useState('');
  const [games, setGames] = useContext(GameContext);

  const updateWord = e => {
    setWord(e.target.value);
  };
  const updatePoints = e => {
    setPoints(e.target.value);
  };

  const addGame = e => {
    e.preventDefault();
    setGames(pervGames => [...pervGames, { word: word, points: points }]);
  };

  return (
    <form onSubmit={addGame}>
      <input type='text' word='word' value={word} onChange={updateWord} />
      <input
        type='text'
        players='players'
        value={points}
        onChange={updatePoints}
      />
      <button>Submit</button>
    </form>
  );
};

export default AddGame;
