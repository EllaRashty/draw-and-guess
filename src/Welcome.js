import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "./GameContext";
import GameList from "./GameList";
import { db } from "./Helpers/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function Welcome() {
  const [games, setGames] = useContext(GameContext);
  const [player1Turn, setPlayer1Turn] = useContext(GameContext);
  const [rounds, setRounds] = useContext(GameContext);

  let navigate = useNavigate();

  // firebase varibels
  const [newName1, setNewName1] = useState("");
  const [newName2, setNewName2] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const updatePlayer1 = async (id, player1) => {
    const userDoc = doc(db, "users", id);
    const newFields = { player1: player1};
    await updateDoc(userDoc, newFields);
    setPlayer1Turn(true);
  };

  const updatePlayer2 = async (id, player2) => {
    const userDoc = doc(db, "users", id);
    const newFields = { player2: player2 };
    await updateDoc(userDoc, newFields);
    setRounds(rounds+1);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <form>
      <h1>Welcome</h1>
      {users.map((user) => {
        return (
          <div>
            <p>
              Player 1: {user.player1} , Player 2:{user.player2}
            </p>
            <input
              placeholder="Player 1..."
              onChange={(event) => {
                setNewName1(event.target.value);
              }}
            />
            <button
              onClick={() => {
                updatePlayer1(user.id, newName1);
                navigate("/wordchoosing");
              }}
            >
              Start Game
            </button>
            <input
              placeholder="Player 2..."
              onChange={(event) => {
                setNewName2(event.target.value);
              }}
            />
            <button
              onClick={() => {
                updatePlayer2(user.id, newName2);
                navigate("/waitingview");
              }}
            >
              Start Game
            </button>
          </div>
        );
      })}
      {/* <button
        onClick={() => {
          navigate("/wordchoosing");
          setPlayer1(true);
        }}
      >
        player 1
      </button>
      <button
        onClick={() => {
          navigate("/waitingview");
          setPlayer2(true);
        }}
      >
        player 2
      </button> */}
      <GameList />
      <p>Total Games: {games.length}</p>
    </form>
  );
}

export default Welcome;
