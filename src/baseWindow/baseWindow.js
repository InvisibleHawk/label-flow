const { ipcRenderer, remote } = require('electron')
const closeBtn = document.querySelector('.btn-close')

closeBtn.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})
