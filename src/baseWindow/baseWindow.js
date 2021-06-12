const { ipcRenderer, remote } = require('electron')
const closeBtn = document.querySelector('.btn-close')
const menuBtn = document.querySelector('.call-menu')
const menu = document.querySelector('.menu')

const blogMenu = `<div class="main-menu">
<a href="#" class="menu-btn">Menu</a>
<a href="#" class="menu-btn">Data Base</a>
<a href="#" class="menu-btn">Statics</a>
<a href="#" class="menu-btn">Documents</a>
</div>`

closeBtn.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})

menuBtn.addEventListener('click', () => {
  menu.innerHTML = blogMenu
})
