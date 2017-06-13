# electron-tcp

**Integrate tcp into Electron**

This Electron application is based on the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start) within the Electron documentation.

Electron apps use Http and websocket in most situations, while in some particular circumstances, tcp connecting is also required.

Main process of the Electron app has the whole application's event lifecycle in control, and be responsible for creating and managing [BrowserWindow](https://electron.atom.io/docs/api/browser-window/).
CPU intensive work in main process may block event-loop and [lock up all renderer process](https://medium.com/@ccnokes/deep-dive-into-electrons-main-and-renderer-processes-7a9599d5c9e2).

Seperate tcp handlers to a individual process would be better option to avoid bad performace, especially when high frequency buffer operations and encryptions/decryptions happend.
## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# open another terminal type below to listen port 9090
nc -l 9090
```


```bash
# Clone this repository
git clone https://github.com/Jawnkuin/electron-tcp
# Go into the repository
cd electron-tcp
# Install dependencies
npm install

# Run the app in the fisrt terminal
npm start
```


#### License [CC0 1.0 (Public Domain)](LICENSE.md)
