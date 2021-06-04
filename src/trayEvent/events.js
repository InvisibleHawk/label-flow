const { ipcRenderer, remote } = require('electron')

const btnPrint = document.querySelector('.print')
const btnClose = document.querySelector('.btn-close')
const dataClient = document.getElementsByTagName('input')
const dataClientArr = [...dataClient]

const sendToPrintWindow = (data) => {
  ipcRenderer.send('printLabel', data)
}

btnPrint.addEventListener('click', (event) => {
  const client = dataClientArr
    .map((item) => {
      return `<p>${item.value}</p><br/>`
    })
    .join('')
    .toString()

  sendToPrintWindow(client)
})

btnClose.addEventListener('click', () => {
  remote.getCurrentWindow().hide()
})
