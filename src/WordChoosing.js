import React from 'react'


function WordChoosing () {
    var randomWords = require('random-words');
    let word1=randomWords();
    let word2=randomWords();
    let word3=randomWords();

  return (
    <div>
      <h1>word choosingg</h1>
      <p>{word1} , {word2} , {word3} </p>
    </div>
  );
}

export default WordChoosing;