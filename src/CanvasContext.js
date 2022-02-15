import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  let data = null;
  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.visualViewport.width * 2;
    canvas.height = window.visualViewport.height * 2;
    canvas.style.width = `${window.visualViewport.width}px`;
    canvas.style.height = `${window.visualViewport.height}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const context = canvasRef.current.getContext("2d");
    data = context.getImageData(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    // clearCanvas();
    // context.putImageData(data, 100, 100);
  };

  const displayCanvas = () => {
    if (!data) {
      const context = canvasRef.current.getContext("2d");
      console.log("here")
      // return context.putImageData(data, 100, 100);
      return 'helo';
    }
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        save,
        displayCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
