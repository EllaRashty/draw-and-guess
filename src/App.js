import React, { useState } from "react";
import Nav from "./Nav";
import Welcome from "./Welcome";
import DrawPage from "./DrawPage";
import WordChoosing from "./WordChoosing";
import GuessingPage from "./GuessingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContext } from "./Helpers/Context";
import WaitingView from "./WaitingView";

function App({ canvas }) {
  const [gameState, setGameState] = useState({});
  const [player1Turn, setPlayer1Turn] = useState(true);

  return (
    <Router>
      <div className="App">
        <AppContext.Provider
          value={{ gameState, setGameState, player1Turn, setPlayer1Turn }}
        >
          <Nav />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/drawpage" element={<DrawPage canvas={canvas} />} />
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
          </Routes>
        </AppContext.Provider>
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
