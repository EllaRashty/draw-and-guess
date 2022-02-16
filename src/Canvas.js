import React, { useEffect, useContext } from "react";
import { useCanvas } from "./CanvasContext";
import { AppContext } from "./Helpers/Context";

export function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, save } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div>
      <canvas
        className="canvas-draw"
        // onMouseDown={startDrawing}
        onPointerDown={(value) => startDrawing(value)}
        onPointerMove={(value) => draw(value)}
        // onMouseUp={finishDrawing}
        // onMouseMove={draw}
        onPointerLeave={(value) => finishDrawing(value)}
        ref={canvasRef}
      />
      <button onClick={save}>save</button>
    </div>
  );
}
