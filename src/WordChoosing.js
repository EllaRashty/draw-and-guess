import React from "react";
import { useNavigate } from "react-router-dom";

function WordChoosing() {
  var randomWords = require("random-words");
  let words = [
    {
      word: randomWords(),
      level: "Eazy",
      points: 1,
    },
    {
      word: randomWords(),
      level: "Medium",
      points: 3,
    },
    {
      word: randomWords(),
      level: "Hard",
      points: 5,
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
