import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([
    {
      players: 1,
      draw: null,
      points: 0,
      word: "a",
      id: 23,
    },
    { players: 1, draw: null, points: 0, word: "a", id: 24 }
  ]);

  return (
    <GameContext.Provider value={[games, setGames]}>
      {props.children}
    </GameContext.Provider>
  );
};
