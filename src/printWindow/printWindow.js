const { ipcRenderer } = require('electron')
const label = document.querySelector('.label')

ipcRenderer.on('printLabel', (event, data) => {
  label.innerHTML = data

  ipcRenderer.send('sendToPrinter')
})




