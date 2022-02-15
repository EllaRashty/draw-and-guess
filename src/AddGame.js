import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";

const AddGame = () => {
  const [word, setWord] = useState('');
  const [players, setPlayers] = useState('');
  const [games, setGames] = useContext(GameContext);

  const updateWord = e => {
    setWord(e.target.value);
  };
  const updatePlayers = e => {
    setPlayers(e.target.value);
  };

  const addGame = e => {
    e.preventDefault();
    setGames(pervGames => [...pervGames, { word: word, players: players }]);
  };

  return (
    <form onSubmit={addGame}>
      <input type='text' word='word' value={word} onChange={updateWord} />
      <input
        type='text'
        players='players'
        value={players}
        onChange={updatePlayers}
      />
      <button>Submit</button>
    </form>
  );
};

export default AddGame;
