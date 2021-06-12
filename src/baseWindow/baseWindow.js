const { ipcRenderer, remote } = require('electron')
const closeBtn = document.querySelector('.btn-close')
const menuBtn = document.querySelector('.call-menu')
const menu = document.querySelector('.menu')

const menu_items = {
  main: 'Главное',
  dbm: 'Клиенты',
  finance: 'Финансы',
  doc: 'Документы',
}

const blogMenu = `<div class="main-menu">
<a href="#" class="menu-btn">${menu_items.main}</a>
<a href="#" class="menu-btn">${menu_items.dbm}</a>
<a href="#" class="menu-btn">${menu_items.finance}</a>
<a href="#" class="menu-btn">${menu_items.doc}</a>
</div>`

closeBtn.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})

menuBtn.addEventListener('click', (event) => {
  if (menu.children.length === 0) menu.innerHTML = blogMenu
  else menu.innerHTML = ''
})
