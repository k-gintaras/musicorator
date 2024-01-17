const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) => {
    const newCallback = (_, data) => callback(data);
    ipcRenderer.on(channel, newCallback);

    // Return a function to remove this listener
    return () => ipcRenderer.removeListener(channel, newCallback);
  },
});
