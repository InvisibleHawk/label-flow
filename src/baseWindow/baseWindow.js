const { ipcRenderer, remote } = require('electron')
const closeBtn = document.querySelector('.btn-close')
const menuBtn = document.querySelector('.call-menu')
const menu = document.querySelector('.menu')

closeBtn.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})
