import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Helpers/Context";

function GuessingPage({ canvas }) {
  const { gameState, setGameState } = useContext(AppContext);
  const [games, setGames] = useContext(GameContext);

  const [temp, setTemp] = useState("");
  let navigate = useNavigate();
  console.log(canvas);
  const checkAnswer = (e) => {
    e.preventDefault();
    if (temp === gameState.word) {
      setGames((pervGames) => [
        ...pervGames,
        { word: gameState.word, points: gameState.points },
      ]);
      navigate("/");
    }
  };

  const updateTemp = (e) => {
    setTemp(e.target.value);
  };

  const displayDraw = () => {
    if (!canvas) {
      const canvasi = document.getElementById("canvas");
      const ctx = canvasi.getContext("2d");
      ctx.putImageData(canvas, 100, 100);
    }
  };

  return (
    <form onSubmit={checkAnswer}>
      <h1>bord</h1>
      <canvas className="canvas-draw" />
      <input type="text" temp="temp" value={temp} onChange={updateTemp} />
      <button>Submit</button>
    </form>
  );
}

export default GuessingPage;
