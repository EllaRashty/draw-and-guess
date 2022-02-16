import React from "react";

const Game = ({ word, points }) => {
  return (
    <div>
      <p>{word}</p>
      <p>{points}</p>
    </div>
  );
};

export default Game;
