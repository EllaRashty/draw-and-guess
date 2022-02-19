import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Helpers/Context";
import { useNavigate } from "react-router-dom";
import { db } from "./Helpers/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  Blob,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { storage } from "./Helpers/firebase-config";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

function WaitingView({ canvas, gameId }) {
  // const Promise = require("bluebird");
  const [progress, setProgress] = useState(0); //////////////////////////////////////////////////
  const { player1Turn, setPlayer1Turn } = useContext(AppContext);
  // const { gameId, setGameId } = useContext(AppContext);
  const { gameState, setGameState } = useContext(AppContext);
  const { url, setUrl } = useContext(AppContext);

  // const buutonText = player1Turn ? "wait" : "continue";

  const displayMSG = (condition) => {
    return condition ? "wait" : "continue";
  };

  let navigate = useNavigate();

  // firebase data
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  var jasonDraw = "";
  useEffect(() => {
    // to check
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getUsers();
    // const jasonDraw = JSON.stringify(canvas);
    console.log(jasonDraw);
  }, []);

  const ImageDataToBlob = function (imageData) {
    let w = imageData.width;
    let h = imageData.height;
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0); // synchronous

    return new Promise((resolve) => {
      canvas.toBlob(resolve); // implied image/png format
    });
  };

  const temp = async (file) => {
    if (!file) {
      return;
    }
    const canvasBlob = await ImageDataToBlob(canvas);
    console.log(canvasBlob);
    const storageRef = ref(storage, `/files/draw` + ".png");
    const uploadTask = uploadBytesResumable(storageRef, canvasBlob); //await
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
        // console.log(url);
      }
    );
  };

  const updateDraw = async () => {
    try {
      // const jasonDraw = JSON.stringify(canvas);
      // console.log(`looo: ${jasonDraw}`);
      // const encodedString = Buffer.from('your string here').toString('base64');
      // console.log(encodedString);
      console.log(canvas);
      console.log(typeof canvas);
      // console.log(canvasBlob);
      const userDoc = doc(db, "users", "LocSFaiw4E3GY9qbMgiS");
      const canvasBlob = await ImageDataToBlob(canvas);
      console.log(canvasBlob);

      const newFields = { draw: canvasBlob, player1: "playerNameUpdated" };
      await updateDoc(userDoc, newFields);
    } catch (error) {
      console.log(error);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <h2>Pleas Wait...</h2>
      {/* {updateDraw(gameState, player1Turn, canvas)} */}
      <button
        disabled={player1Turn}
        onClick={async () => {
          // await updateDraw();
          temp(canvas);
          navigate("/guessingpage");
        }}
      >
        player 2 : {displayMSG(player1Turn)}
      </button>
      <p></p>
      <button
        disabled={!player1Turn}
        onClick={() => {
          navigate("/guessingpage");
        }}
      >
        player 1 : {displayMSG(!player1Turn)}
      </button>

      {users.map((user) => {
        return (
          <div>
            {console.log(user.player1Turn)}
            {setPlayer1Turn(user.player1Turn)}
          </div>
        );
      })}
      <h3>Uploaded {progress} %</h3>
      <button onClick={refreshPage}>Refresh</button>
    </div>
  );
}

export default WaitingView;
