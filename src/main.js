const path = require('path')
const { app, Menu, Tray, BrowserWindow } = require('electron')

let trayWindow = null
let tray = null

app.on('ready', () => {
  trayWindow = new BrowserWindow({
    height: 400,
    width: 250,
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
  })

  trayWindow.webContents.loadFile('src/trayWindow.html')

  const iconName = 'TrayLogo.png'
  const iconPath = path.join(__dirname, `./assets/${iconName}`)
  console.log(iconPath)
  tray = new Tray(iconPath)
  tray.setToolTip('My app')
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds
    const { height, width } = trayWindow.getBounds()

    console.log(bounds.x, bounds.y)
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
