import React, { useState, useEffect } from 'react';
import Websocket from 'websocket';

let ws = new WebSocket("ws://localhost:8080/");

export const Main = () => {

  const [data, setData] = React.useState("");

  return (
      <>
        <div id = "main">
          <textarea id="text"></textarea>
        </div>
        <canvas id="canvas" height="800" width="800"></canvas>
      </>
  );
};
