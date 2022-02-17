import React, { useState, useContext, useRef, useEffect } from "react";
import { GameContext } from "./GameContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Helpers/Context";

function GuessingPage({ canvas }) {
  const { gameState, setGameState } = useContext(AppContext);
  const [games, setGames] = useContext(GameContext);
  const [temp, setTemp] = useState("");
  const canvasRef = useRef(null);
  useEffect(() => {
    prepareCanvas();
  }, []);

  let navigate = useNavigate();

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

  const prepareCanvas = () => {
    const p_canvas = canvasRef.current;
    p_canvas.width = window.visualViewport.width * 2;
    p_canvas.height = window.visualViewport.height * 1.5;
    p_canvas.style.width = `${window.visualViewport.width}px`;
    p_canvas.style.height = `${p_canvas.height / 2}px`;
  };

  const displayDraw = () => {
    var ctx = document.getElementById("canvasId");
    var context = ctx.getContext("2d");
    context.putImageData(canvas, 0, 0);
  };

  return (
    <form onSubmit={checkAnswer}>
      <h1>bord</h1>
      <canvas className="canvas-draw" id="canvasId" ref={canvasRef} />
      <button onClick={displayDraw}>diaplayy</button>
      <input type="text" temp="temp" value={temp} onChange={updateTemp} />
      <button>Submit</button>
    </form>
  );
}

export default GuessingPage;
