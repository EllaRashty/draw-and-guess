import React, { useContext } from "react";
import "./App.css";
import { Link } from "react-router-dom";
// import { GameContext } from "./GameContext";

function Nav() {
  const navStyle = {
    color: "white",
  };
  // const [games, setGames] = useContext(GameContext);

  return (
    <nav>
      <h3>Nav</h3>
      <ul className="nav-links">
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/wordchoosing">
          <li>word choosing</li>
        </Link>
        <Link style={navStyle} to="/waitingview">
          <li>waiting</li>
        </Link>
        <Link style={navStyle} to="/guessingpage">
          <li>guessing page</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
