import React, { useState, useContext } from "react";
import Game from "./Game";
import { GameContext } from "./GameContext";

const GameList = () => {
  const [games, setGames] = useContext(GameContext);
  return (
    <div>
      {games.map((game) => (
        <Game word={game.word} points={game.points} key={game.id} />
      ))}
    </div>
  );
};

export default GameList;
