import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Helpers/Context";
import { useNavigate } from "react-router-dom";
import { db } from "./Helpers/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function WaitingView() {
  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
  const { gameId, setGameId } = useContext(AppContext);

  // const buutonText = player1Turn ? "wait" : "continue";

  const displayMSG = (condition) => {
    return condition ? "wait" : "continue";
  };

  let navigate = useNavigate();

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

  return (
    <div>
      <h2>WaitingView</h2>
      <button
        disabled={player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 2 : {displayMSG(player1Turn)}
      </button>
      <p></p>
      <button
        disabled={!player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 1 : {displayMSG(!player1Turn)}
      </button>

      {users.map((user) => {
        return <div>{setPlayer1Turn(user.player1Turn)}</div>;
      })}
    </div>
  );
}

export default WaitingView;
