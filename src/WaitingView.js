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

function WaitingView({ canvas, gameId }) {
  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
  // const { gameId, setGameId } = useContext(AppContext);
  const { gameState, setGameState } = useContext(AppContext);
  // const { url, setUrl } = useContext(AppContext);

  
  const displayMSG = (condition) => { // const buutonText = player1Turn ? "wait" : "continue";
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
      console.log(data);
    };
    getUsers();
  }, []);

  function refreshPage() {
    window.location.reload(true);
  }

  const getPlayerTurn = (turn, id) => {
    if (id === "LocSFaiw4E3GY9qbMgiS") {
      setPlayer1Turn(turn);
    }
  };

  return (
    <div>
            {users.map((user) => {
        return (
          <div>
            {console.log(user.player1Turn)}
            {getPlayerTurn(user.player1Turn,user.id)}
          </div>
        );
      })}
      <h2>Pleas Wait...</h2>
      <button
        disabled={player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 2 : {displayMSG(player1Turn)}
      </button>
      <p>console.log(player1Turn)</p>
      <button
        disabled={!player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 1 : {displayMSG(!player1Turn)}
      </button>

      <button onClick={refreshPage}>Refresh</button>
    </div>
  );
}

export default WaitingView;
