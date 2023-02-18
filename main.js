// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const path = require('path')


global.share= {ipcMain,dialog};

require("./test")
let myWindow = null
const gotTheLock = app.requestSingleInstanceLock()

const createWindow = async () => {
  // httpServer()
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    },
    
    icon: path.join(__dirname,'./public/images/logo/logo.png')
  })

  // and load the index.html of the app.
  await mainWindow.loadFile('./.dist/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // const ses = mainWindow.webContents.session
  // console.log(ses.defaultSession)
  // mainWindow.webContents.print({silent: true});
  return mainWindow
}



if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // Print out data received from the second instance.
    console.log(additionalData)

    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.