const path = require('path')
const { app, Menu, Tray, BrowserWindow, ipcMain } = require('electron')

let trayWindow = null
let tray = null
let printWindow = null

const winSize = {
  width: 250,
  height: 400,
}

app.on('ready', () => {
  trayWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    height: winSize.height,
    width: winSize.width,
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
  })

  printWindow = new BrowserWindow({
    height: 250,
    width: 300,
    frame: false,
    resizable: false,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  })

  printWindow.webContents.openDevTools()

  printWindow.webContents.loadFile('src/printWindow/printWindow.html')
  trayWindow.webContents.loadFile('src/trayWindow.html')

  const iconName = 'TrayLogo.png'
  const iconPath = path.join(__dirname, `./assets/${iconName}`)
  console.log(iconPath)
  tray = new Tray(iconPath)
  tray.setToolTip('My app')
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds
    const { height, width } = trayWindow.getBounds()
    if (trayWindow.isVisible()) {
      trayWindow.hide()
    } else {
      trayWindow.setBounds({
        x: Math.floor(x - width / 2),
        y: Math.floor(y - height),
        height,
        width,
      })
      trayWindow.show()
    }
  })
})

ipcMain.on('printLabel', (event, data) => {
  console.log(data)
  printWindow.webContents.send('printLabel', data)
})
