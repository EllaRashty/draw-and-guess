import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Helpers/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { AppContext } from "./Helpers/Context";

function Welcome(props) {
  const { player1Turn, setPlayer1Turn } = useContext(AppContext);

  let navigate = useNavigate();

  // firebase variables
  const [newName1, setNewName1] = useState("");
  const [newName2, setNewName2] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const updatePlayer1 = async (id, player1) => {
    const userDoc = doc(db, "users", id);
    const newFields = { player1: player1, player1Turn: true };
    setPlayer1Turn(true);
    await updateDoc(userDoc, newFields);
  };

  const updatePlayer2 = async (id, player2) => {
    const userDoc = doc(db, "users", id);
    const newFields = { player2: player2 };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Draw & Guess</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>Player 1 : {user.player1} </p>
            <input
              placeholder="Enter name player-1..."
              onChange={(event) => {
                setNewName1(event.target.value);
              }}
            />
            <button
              className="player1-btn "
              onClick={() => {
                updatePlayer1("currentGameInfo", newName1);
                navigate("/wordchoosing");
              }}
            >
              Start Game
            </button>
            <p>Player 2 : {user.player2} </p>
            <input
              placeholder="Enter name player-2..."
              onChange={(event) => {
                setNewName2(event.target.value);
              }}
            />
            <button
              className="player2-btn "
              onClick={() => {
                updatePlayer2("currentGameInfo", newName2);
                navigate("/waitingview");
              }}
            >
              Start Game
            </button>
            <h3>The best score: {user.score}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Welcome;
