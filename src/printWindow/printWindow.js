const { ipcRenderer } = require('electron')

ipcRenderer.on('printLabel', (event, data) => {
  document.body.innerHTML = data

  ipcRenderer.send('sendToPrinter')
})
