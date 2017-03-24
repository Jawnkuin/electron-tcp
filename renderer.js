// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const net = require('net');

let client = null; // node socket
// chrome API socket id

function toBuffer(ab) {
  return new Buffer(new Uint8Array(ab));
}

function toArrayBuffer(buf) {
  return new Uint8Array(buf).buffer;
}

function initConnToServer(ip, port) {
  return new Promise((resolve) => {
    if (!client) {
      client = new net.Socket(); // return a Node socket
    }
    if (!client.connecting) {
      client.connect(port, ip);
      client.on('connect', () => resolve());
    }
  });
}

function sendToServerSimple(data) {
  return new Promise((resolve) => {
    console.log('node');
    client.write(data);
    client.on('data', res => resolve(res));
  });
}

async function sendTcp() {
  console.log('ini');
  initConnToServer('127.0.0.1', 9090).then(() => {
    sendToServerSimple('Hello!').then((res) => {
      console.log(res.toString());
    });
  });
}

const sendBtn = document.getElementById('send');
sendBtn.addEventListener('click', () => {
  sendTcp();
});
