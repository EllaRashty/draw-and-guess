import React, { useContext, useEffect, useState } from "react";
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
function WordChoosing() {
  const { gameState, setGameState } = useContext(AppContext);

  var randomWords = require("random-words");
  let words = [
    {
      word: randomWords({ exactly: 1, maxLength: 4 }),
      level: "Eazy",
      points: 1,
      draw: null,
    },
    {
      word: randomWords({ exactly: 1, maxLength: 7 }),
      level: "Medium",
      points: 3,
      draw: null,
    },
    {
      word: randomWords({ exactly: 1, maxLength: 9 }),
      level: "Hard",
      points: 5,
      draw: null,
    },
  ];
  let navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const updateWord = async (word) => {
    try {
      const userDoc = doc(db, "users", "LocSFaiw4E3GY9qbMgiS");
      const newFields = { word: `${word.word}` };
      setGameState(word);
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Choose a word:</h1>
      <div className="word-section">
        {words.map((word) => (
          <div>
            <h3>{word.level}</h3>
            <button
              onClick={async () => {
                updateWord(word);
                navigate("/drawpage");
              }}
            >
              {word.word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordChoosing;
