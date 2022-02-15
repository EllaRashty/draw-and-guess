import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      // onMouseDown={startDrawing}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      // onMouseUp={finishDrawing}
      // onMouseMove={draw}
      onPointerUp={finishDrawing}
      ref={canvasRef}
    />
  );
}