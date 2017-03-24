// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var net = require('net');

let client = null; // node socket
let socketId; // chrome API socket id

function toBuffer(ab) {
  return new Buffer(new Uint8Array(ab));
}

function toArrayBuffer(buf) {
  return new Uint8Array(buf).buffer;
}

function initConnToServer (ip, port) {
  return new Promise((resolve, reject) => {
    if(typeof chrome !== 'undefined') {
      chrome.sockets.tcp.create({}, r => {
        socketId = r.socketId;
        chrome.sockets.tcp.connect(r.socketId, ip, port, code => resolve(code));
      });
    } else {
      client = new net.Socket(); // return a Node socket
      client.connect(port, ip);
      client.on('connect', () => resolve());
    }
  });
};

function sendToServer_simple (data) {
  return new Promise((resolve, reject) => {
    if(typeof chrome !== 'undefined') {
      console.log('chrome');
      chrome.sockets.tcp.send(socketId, data, r => {});
      chrome.sockets.tcp.onReceive.addListener(receiveInfo => resolve(receiveInfo.data));
    } else {
      console.log('node');
      client.write(toBuffer(data));
      client.on('data', data => resolve(toArrayBuffer(data)));
    }
  });
};

function sendTcp (){
  console.log('ini');
  initConnToServer('192.168.8.29',9090).then(() => sendToServer_simple('Hello!').then(
      (data) => {console.log(data);}
    )
  )
};

const sendBtn = document.getElementById('send');
sendBtn.addEventListener('click', function (event) {
  sendTcp();
});
