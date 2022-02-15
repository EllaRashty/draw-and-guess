import React from "react";
import { useCanvas } from "./CanvasContext";

function GuessingPage() {
  const { displayCanvas } = useCanvas();

  return (
    <div>
      <h1>bord</h1>
      <canvas>{displayCanvas}</canvas>
    </div>
  );
}

export default GuessingPage;
