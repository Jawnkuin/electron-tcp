// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
// Module to control application life.
const ipcRenderer = electron.ipcRenderer;

const sendBtn = document.getElementById('send');
const textInput = document.getElementById('text');

sendBtn.addEventListener('click', () => {
  if (textInput.value) {
    ipcRenderer.send('SEND_DATA', textInput.value);
  }
});
