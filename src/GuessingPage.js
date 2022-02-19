import React, { useState, useContext, useRef, useEffect } from "react";
import { GameContext } from "./GameContext";
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

function GuessingPage({ canvas }) {
  const { gameState, setGameState } = useContext(AppContext);
  const [games, setGames] = useContext(GameContext);
  const [temp, setTemp] = useState("");
  const canvasRef = useRef(null);

  let navigate = useNavigate();

  const checkAnswer = (e) => {
    e.preventDefault();
    console.log(gameState);
    if (temp === gameState) {
      // setGames((pervGames) => [
      //   ...pervGames,
      //   { word: gameState.word, points: gameState.points },
      //   { word: gameState.word, points: gameState.points },
      // ]);
      navigate("/wordchoosing");
    }
  };

  const updateTemp = (e) => {
    setTemp(e.target.value);
  };

 
  const displayDraw = () => {
    window.location.reload(false);
  };

  // firebase data
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    // to check
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


  const getWord = (word, id) => {
    if (id === "LocSFaiw4E3GY9qbMgiS") {
      setGameState(word);
    }
  };

  return (
    <form onSubmit={checkAnswer}>
      {users.map((user) => {
        return <div>{getWord(user.word, user.id)}</div>;
      })}
      <h1>Guess The Word</h1>
      <div>
        <img
          className="image-draw"
          height={200}
          width={200}
          src={
            "https://firebasestorage.googleapis.com/v0/b/draw-guess-86bcc.appspot.com/o/files%2Fdraw.png?alt=media&token=133a3108-710d-4720-a378-56c8faa4c783"
          }
          alt="new"
        />
      </div>
      <button onClick={displayDraw}> displayy </button>
      <input
        type="text"
        temp="temp"
        value={temp.toLowerCase()}
        onChange={updateTemp}
      />
      <button>Submit</button>
    </form>
  );
}

export default GuessingPage;
