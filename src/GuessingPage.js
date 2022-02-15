import React from "react";
import { useCanvas } from "./CanvasContext";

function GuessingPage() {
  const { canvasRef, displayCanvas } = useCanvas();

  return (
    <div>
      <h1>bord</h1>
      <canvas ref={canvasRef}>

      </canvas>
      <button onClick={displayCanvas}>display</button>
    </div>
  );
}

export default GuessingPage;
