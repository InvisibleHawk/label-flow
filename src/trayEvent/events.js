const { ipcRenderer, remote } = require('electron')

const btnPrint = document.querySelector('.print')
const btnClose = document.querySelector('.btn-close')
const btnUp = document.querySelector('.up')
const dataClient = document.getElementsByTagName('input')
const dataClientArr = [...dataClient]

const sendToPrintWindow = (data) => {
  ipcRenderer.send('printLabel', data)
}

btnPrint.addEventListener('click', (event) => {
  const client = dataClientArr
    .map((item, index) => {
      if (index == 0) return `<h4>&#128100; ${item.value}</h4>`
      if (index == 1) return `<p>&#128222; ${item.value}</p>`
      if (index == 2) {
        if (item.value)
          return `<div class="price"><p>${item.value}<b>&#8381;</b></p></div>`
        return `<div class="price" style="width:40%; height:10%;"><p>${item.value}</p></div>`
      }
      return `<p>&#128296; ${item.value}</p>`
    })
    .join('')
    .toString()

  sendToPrintWindow(client)
})

btnUp.addEventListener('click', () => {
  ipcRenderer.send('btn-up')
})

btnClose.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})
