import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw,save } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div>
      <canvas className="canvas-draw"
        // onMouseDown={startDrawing}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        // onMouseUp={finishDrawing}
        // onMouseMove={draw}
        onPointerLeave={finishDrawing}
        ref={canvasRef}
      />
      <button onClick={save}>save</button>
    </div>
  );
}
