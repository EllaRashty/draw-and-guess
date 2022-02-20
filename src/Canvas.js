import React, { useEffect, useContext, useState } from "react";
import { useCanvas } from "./CanvasContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Helpers/Context";
import { db } from "./Helpers/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export function Canvas({ canvas }) {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw, save } =
    useCanvas();

  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
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
      const userDoc = doc(db, "users", "currentGameInfo");
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
        onPointerDown={(value) => startDrawing(value)}
        onPointerMove={(value) => draw(value)}
        onPointerLeave={(value) => finishDrawing(value)}
        ref={canvasRef}
      />
      <button
        className="complete-btn"
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
