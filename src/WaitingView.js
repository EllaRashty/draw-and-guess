import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Helpers/Context";
import { useNavigate } from "react-router-dom";
import { db } from "./Helpers/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function WaitingView({ canvas }) {
  const { player1Turn, setPlayer1Turn } = useContext(AppContext);

  const displayMSG = (condition) => {
    return condition ? "wait" : "continue";
  };

  let navigate = useNavigate();

  // firebase variables
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  function refreshPage() {
    window.location.reload(true);
  }

  const getPlayerTurn = (turn, id) => {
    if (id === "currentGameInfo") {
      setPlayer1Turn(turn);
    }
  };

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>{getPlayerTurn(user.player1Turn, user.id)}</div>
        );
      })}
      <h2>Wait For Your Turn:</h2>
      <button
        className="player1-btn"
        disabled={player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 2 : {displayMSG(player1Turn)}
      </button>
      <p></p>
      <button
        className="player2-btn"
        disabled={!player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 1 : {displayMSG(!player1Turn)}
      </button>
      <p></p>
      <button onClick={refreshPage} className="refresh-btn">
        Refresh
      </button>
    </div>
  );
}

export default WaitingView;
