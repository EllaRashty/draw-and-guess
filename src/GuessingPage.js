import React, { useState, useContext } from "react";
// import { useCanvas } from "./CanvasContext";
import { GameContext } from "./GameContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Helpers/Context";

function GuessingPage() {
  const { gameState, setGameState } = useContext(AppContext);
  const [games, setGames] = useContext(GameContext);

  // const { canvasRef, displayCanvas } = useCanvas();
  let hop = "cc";
  const [temp, setTemp] = useState("");
  let navigate = useNavigate();

  const checkAnswer = (e) => {
    e.preventDefault();
    if (temp === gameState.word) {
      setGames(pervGames => [...pervGames, { word: gameState.word, points: gameState.points }]);
      navigate("/");
    }
  };

  const updateTemp = (e) => {
    setTemp(e.target.value);
  };

  return (
    <form onSubmit={checkAnswer}>
      <h1>bord</h1>
      <canvas> </canvas>

      {/* <button onClick={displayCanvas}>display</button> */}

      <input type="text" temp="temp" value={temp} onChange={updateTemp} />
      <button>Submit</button>
      <h2>{hop}</h2>
    </form>
  );
}

export default GuessingPage;
