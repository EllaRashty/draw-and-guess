import React, { useState } from "react";
import Nav from "./Nav";
import Welcome from "./Welcome";
import DrawPage from "./DrawPage";
import WordChoosing from "./WordChoosing";
import GuessingPage from "./GuessingPage";
import { GameProvider, GameContext } from "./GameContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContext } from "./Helpers/Context";
import WaitingView from "./WaitingView";

function App({ canvas }) {
  const [gameState, setGameState] = useState({});
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [rounds, setRounds] = useState(0);
  const [gameId, setGameId] = useState("");

  return (
    <Router>
      <div className="App">
        <GameProvider>
          <AppContext.Provider value={{ gameState, setGameState,player1Turn, setPlayer1Turn,rounds, setRounds,gameId, setGameId }}>
            <Nav />
            <Routes>
              {/* <GameProvider> */}
              {/* <Route path="/" exact element={<Home/>} /> */}
              <Route path="/" element={<Welcome />} />
              <Route path="/drawpage" element={<DrawPage canvas={canvas}  />} />
              <Route path="/wordchoosing" element={<WordChoosing />} />
              <Route
                path="/guessingpage"
                element={<GuessingPage canvas={canvas} />}
              />
              <Route
                path="/waitingview"
                element={<WaitingView canvas={canvas} />}
              />
              <Route path="*" element={<ErrorPage />} />
              {/* </GameProvider> */}
            </Routes>
          </AppContext.Provider>
        </GameProvider>
      </div>
    </Router>
  );
}

const ErrorPage = () => {
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default App;
