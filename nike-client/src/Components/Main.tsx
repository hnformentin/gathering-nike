import React, { useState, useEffect } from 'react';
import Websocket from 'websocket';
import showEasterEgg from "./easter-egg"

const ws = new WebSocket("ws://localhost:8080/");

export const Main = () => {

  const [data, setData] = React.useState("");

  function handleChange(value: string) {
    setData(value);
    ws.send(value);
  }
  
  // componentDidMount
  useEffect(() => {
      ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      }

      ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = evt.data
      setData(message)
      console.log(message)

      if (message.toLowerCase().includes("easteregg") ){
        showEasterEgg();
      }

      }

      ws.onclose = () => {
        console.log('disconnected')
      // automatically try to reconnect on connection loss

      }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <>
        <div id = "main">
          <textarea onChange={(e) => handleChange(e.target.value as string)} value={data} id="text"></textarea>
        </div>
        <canvas id="canvas" height="800" width="800"></canvas>
      </>
  );
};
