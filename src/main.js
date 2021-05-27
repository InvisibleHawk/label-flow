const path = require('path')
const { app, Menu, Tray, BrowserWindow } = require('electron')

let mainWindow = null
let tray = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  })

  mainWindow.webContents.loadFile('src/mainWindow.html')

  const iconName = 'ts-logo.png'
  const iconPath = path.join(__dirname, `./assets/${iconName}`)
  console.log(iconPath)
  tray = new Tray(iconPath)
  tray.setToolTip('My app')
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds
    const { height, width } = mainWindow.getBounds()

    console.log(bounds.x, bounds.y)
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.setBounds({
        x: Math.floor(x - width / 2),
        y: Math.floor(y - height),
        height,
        width,
      })
      mainWindow.show()
    }
  })
})
