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
  Blob,
} from "firebase/firestore";


export function Canvas({ canvas, gameId }) {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, save } =
    useCanvas();

  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
  // const { gameId, setGameId } = useContext(AppContext);
    let navigate = useNavigate();

  useEffect(() => {
    prepareCanvas();
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  //firebase data
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  
  const updatePlayer1Turn = async (turn) => {
    try {
      console.log(db);
      const userDoc = doc(db, "users", 'LocSFaiw4E3GY9qbMgiS');
      const newFields = { player1Turn: !turn };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.log(error);
    }
  };
  
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
      <button
        onClick={async () => {
          await save();
          await updatePlayer1Turn(player1Turn);
          navigate("/waitingview");
        }}
      >
        Send
      </button>
    </div>
  );
}
