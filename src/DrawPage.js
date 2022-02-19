import React, { useContext } from "react";
import { Canvas } from "./Canvas";
import { ClearCanvasButton } from "./ClearCanvasButton";
import { AppContext } from "./Helpers/Context";

function DrawPage({ canvas ,gameId}) {
  const { gameState, setGameState } = useContext(AppContext);
  return (
    <div>
      <p>Level:{gameState.level} </p>
      <h3>Draw the word: {gameState.word}</h3>
      <Canvas canvas={canvas} gameId={gameId}/>
      <ClearCanvasButton />
    </div>
  );
}

export default DrawPage;
