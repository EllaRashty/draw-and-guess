import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UpdateGame from "./UpdateGame";
import { AppContext } from "./Helpers/Context";

function WordChoosing() {
  const { gameState, setGameState } = useContext(AppContext);
  var randomWords = require("random-words");
  let words = [
    {
      word: randomWords(),
      level: "Eazy",
      points: 1,
      draw: null,
    },
    {
      word: randomWords(),
      level: "Medium",
      points: 3,
      draw: null,
    },
    {
      word: randomWords(),
      level: "Hard",
      points: 5,
      draw: null,

    },
  ];
  let navigate = useNavigate();

  return (
    <div>
      <h1>word choosingg</h1>
      <div className="word-section">
        {words.map((word) => (
          <div>
            <h3>{word.level}</h3>
            <button
              onClick={() => {
                navigate("/drawpage");
                setGameState(word);
              }}
            >
              {word.word}
            </button>
            {/* <UpdateGame word={{word}}/> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordChoosing;
