import showEasterEgg from "./easter_egg.mjs";

function getUrl() {
    let loc = window.location, new_uri;
    if (loc.protocol === "https:") {
        new_uri = "wss:";
    } else {
        new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "/";
    return new_uri;
}

let ws = new WebSocket(getUrl());
let text = document.getElementById("text");

text.addEventListener('keyup', (e) => {
    ws.send(e.target.value);

    if(e.target.value.toLowerCase().includes('easteregg'))
    {
        showEasterEgg();
    }
});

ws.onmessage = (e) => {
    text.value = e.data;
}