import React, { useContext } from "react";
import { Canvas } from "./Canvas";
import { ClearCanvasButton } from "./ClearCanvasButton";
import { AppContext } from "./Helpers/Context";

function DrawPage({ canvas }) {
  const { gameState, setGameState } = useContext(AppContext);
  window.onbeforeunload = function () {
    window.location.reload(false);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <p>Level:{gameState.level} </p>
      <h3>Draw the word: {gameState.word}</h3>
      <Canvas canvas={canvas} />
      <ClearCanvasButton />
    </div>
  );
}

export default DrawPage;
