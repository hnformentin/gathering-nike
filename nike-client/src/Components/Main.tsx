import React, { useState, useEffect } from 'react';
import Websocket from 'websocket';

const ws = new WebSocket(websocketServerUrl());

function websocketServerUrl()  {
  // get location of webpage;
  const loc = window.location;
  if (loc.host.includes("localhost")) {
    // we are in dev return stander.
    return "ws://localhost:8080/";
  }

  // we are in radix use url based on server.
  return "wss://" +  loc.host + "/"
}

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
