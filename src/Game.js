import React from "react";

const Game = ({ word, players }) => {
  return (
    <div>
      <h3>{word}</h3>
      <p>{players}</p>
    </div>
  );
};

export default Game;
