import React, { useContext } from "react";
import Nav from "./Nav";
import Welcome from "./Welcome";
import DrawPage from "./DrawPage";
import WordChoosing from "./WordChoosing";
import GuessingPage from "./GuessingPage";
import GameList from "./GameList";
import AddGame from "./AddGame";
import { GameProvider, GameContext } from "./GameContext";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <GameProvider>
        <Nav />
        <Routes>
          {/* <GameProvider> */}
            <Route path="/" exact element={<Home/>} />
            <Route path="/welcome" element={<Welcome/>} />
            <Route path="/drawpage" element={<DrawPage/>} />
            <Route path="/wordchoosing" element={<WordChoosing/>} />
            <Route path="/guessingpage" element={<GuessingPage/>} />
          {/* </GameProvider> */}
        </Routes>
        </GameProvider>

      </div>
    </Router>
  );
}

const Home = () => {
  const [games, setGames] = useContext(GameContext);
  return (
    <div>
      <h1>Home page</h1>
      <AddGame/>
      <GameList />
      <p>Total Games: {games.length}</p>
    </div>
  );
};

export default App;
