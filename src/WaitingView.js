import React, { useContext } from "react";
import { AppContext } from "./Helpers/Context";

function WaitingView() {
  // const [player1Turn, setPlayer1Turn] = useContext(AppContext);

  // const buutonText = player1Turn ? "wait" : "continue";
  return (
    <div>
      <h2>WaitingView</h2>
      {/* <button>{buutonText}</button> */}
    </div>
  );
}

export default WaitingView;
