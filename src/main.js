const path = require('path')
const { app, Menu, Tray, BrowserWindow, ipcMain } = require('electron')

let trayWindow = null
let tray = null
let printWindow = null
let baseWindow = null

const winSize = {
  trayWinSize: {
    width: 250,
    height: 400,
  },
  baseWin: {
    width: 1200,
    height: 750,
  },
}

const printer_options = {
  silent: true,
  deviceName: 'Gprinter  GP-3120TU',
}

app.on('ready', () => {
  trayWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    height: winSize.trayWinSize.height,
    width: winSize.trayWinSize.width,
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
  })

  baseWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    height: winSize.baseWin.height,
    width: winSize.baseWin.width,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    movable: true,
  })

  printWindow = new BrowserWindow({
    height: 130,
    width: 130,
    frame: false,
    resizable: false,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  })

  baseWindow.webContents.loadFile('src/baseWindow/baseWindow.html')
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

ipcMain.on('btn-up', () => {
  baseWindow.show()
})

ipcMain.on('printLabel', (event, data) => {
  console.log(data)
  printWindow.webContents.send('printLabel', data)
})

ipcMain.on('sendToPrinter', (event) => {
  printWindow.webContents.print(printer_options, (success, errorType) => {
    if (!success) console.log(errorType)
  })
})
