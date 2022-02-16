import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import { CanvasProvider } from "./CanvasContext";

const AppWithCnavas = () => {
  const [canvas, setCanvas] = useState(null);
  console.log(canvas);
  return (
    <CanvasProvider setCanvas={setCanvas}>
      <App canvas={canvas} />
    </CanvasProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppWithCnavas />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

serviceWorker.unregister();
// reportWebVitals();
