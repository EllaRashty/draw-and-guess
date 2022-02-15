import React from "react";
import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';

function DrawPage() {
  return (
    <div>
      <h1>Draw</h1>
      <Canvas />
      <ClearCanvasButton />
    </div>
  );
}

export default DrawPage;
