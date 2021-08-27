const { ipcRenderer, remote } = require('electron')

const btnPrint = document.querySelector('.print')
const btnClose = document.querySelector('.btn-close')
const btnUp = document.querySelector('.up')
const dataClient = document.getElementsByTagName('input')
const dataClientArr = [...dataClient]

const sendToPrintWindow = (data) => {
  ipcRenderer.send('printLabel', data)
}
const sendToDBView = (data) => {
  ipcRenderer.send('db_view', data)
}

btnPrint.addEventListener('click', (event) => {
  const clientDB = []
  const client = dataClientArr
    .map((item, index) => {
      if (index == 0) {
        clientDB.push(item.value)
        return `<h4>&#128100;${item.value}
        </h4><p class="date">${new Date().toLocaleDateString()}--${new Date()
          .toLocaleTimeString()
          .slice(0, 5)}</p>`
      }
      if (index == 1) {
        clientDB.push(item.value)
        return `<p>&#128222; ${item.value}</p>`
      }
      if (index == 2) {
        if (item.value) {
          clientDB.push(item.value)
          return `<div class="price"><p>${item.value}<b>&#8381;</b></p></div>`
        }
        clientDB.push(item.value)
        return `<div class="price" style="width:40%; height:10%;"><p>${item.value}</p></div>`
      }
      clientDB.push(item.value)
      return `<p>&#128296; ${item.value}</p>`
    })
    .join('')
    .toString()
  sendToDBView(clientDB)
  sendToPrintWindow(client)
})

btnUp.addEventListener('click', () => {
  ipcRenderer.send('btn-up')
})

btnClose.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})
