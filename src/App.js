import React, { useContext } from "react";
import Nav from "./Nav";
import Welcome from "./Welcome";
import DrawPage from "./DrawPage";
import WordChoosing from "./WordChoosing";
import GuessingPage from "./GuessingPage";
import GameList from "./GameList";
import AddGame from "./AddGame";
import { GameProvider, GameContext } from "./GameContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <GameProvider>
        <Nav />
        <Switch>
          {/* <GameProvider> */}
            <Route path="/" exact component={Home} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/drawpage" component={DrawPage} />
            <Route path="/wordchoosing" component={WordChoosing} />
            <Route path="/guessingpage" component={GuessingPage} />
          {/* </GameProvider> */}
        </Switch>
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
