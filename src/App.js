import React from "react";
import { Canvas } from "./Canvas";
import { ClearCanvasButton } from "./ClearCanvasButton";
import Nav from "./Nav";
import Welcome from "./Welcome";
import DrawPage from "./DrawPage";
import WordChoosing from "./WordChoosing";
import GuessingPage from "./GuessingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CanvasProvider } from "./CanvasContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/drawpage" component={DrawPage} />
          <Route path="/wordchoosing" component={WordChoosing} />
          <CanvasProvider>
            <Route path="/guessingpage" component={GuessingPage} />
          </CanvasProvider>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
);

export default App;
