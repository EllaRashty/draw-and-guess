import React, { useEffect, useContext, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Helpers/Context";
import { db } from "./Helpers/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export function Canvas({ canvas }) {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, save } =
    useCanvas();

  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
  const { gameId, setGameId } = useContext(AppContext);
  const { gameState, setGameState } = useContext(AppContext);

  useEffect(() => {
    prepareCanvas();
  }, []);

  let navigate = useNavigate();

  //firebase functions
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const updatePlayer1Turn = async (turn) => {
    const userDoc = doc(db, "users", gameId);
    const newFields = { player1Turn: turn };
    await updateDoc(userDoc, newFields);
  };

  const updateDraw = async (draw) => {
    const userDoc = doc(db, "users", gameId);
    const newFields = { draw: draw };
    await updateDoc(userDoc, newFields);
  };

  const updateWord= async (obj_word) => {
    const userDoc = doc(db, "users", gameId);
    const newFields = { word: obj_word.word, points:obj_word.points };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    // to check
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
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
      {/* <button onClick={save}>save</button> */}
      <button
        onClick={() => {
          save();
          updateWord(gameState);
          setPlayer1Turn(!player1Turn);
          updatePlayer1Turn(player1Turn);
          // updateDraw(canvas);
          navigate("/waitingview");
        }}
      >
        Send
      </button>
    </div>
  );
}
