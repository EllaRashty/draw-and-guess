import React, { useContext, useRef, useState } from "react";
import { ref } from "firebase/storage";
import { storage } from "./Helpers/firebase-config";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

const CanvasContext = React.createContext();

export const CanvasProvider = (props) => {
  const ImageDataToBlob = function (imageData) {
    let w = imageData.width;
    let h = imageData.height;
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0); // synchronous

    return new Promise((resolve) => {
      canvas.toBlob(resolve); // implied image/png format
    });
  };

  const uploadDraw = async (file) => {
    if (!file) {
      return;
    }
    const canvasBlob = await ImageDataToBlob(file);
    console.log(canvasBlob);
    const storageRef = ref(storage, `/files/draw` + ".png");
    const uploadTask = uploadBytesResumable(storageRef, canvasBlob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  let data = null;
  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.visualViewport.width * 2;
    canvas.height = window.visualViewport.height * 1.5;
    canvas.style.width = `${window.visualViewport.width}px`;
    canvas.style.height = `${canvas.height / 2}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = props.myColor;
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

  const save = async () => {
    const context = canvasRef.current.getContext("2d");
    data = context.getImageData(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    props.setCanvas(data);
    await uploadDraw(data);
  };

  return (
    <div>
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
        }}
      >
        {props.children}
      </CanvasContext.Provider>
    </div>
  );
};

export const useCanvas = () => useContext(CanvasContext);
