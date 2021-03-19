const isDev = require("electron-is-dev");
const Config = require("./src/tools/config");
const { app, BrowserWindow, dialog } = require("electron");
const { downloadApp } = require("./src/tools/download");
const { execApi } = require("./src/tools/exec-api");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow = null,
  launchedExe = null;

const windowMain = () => {
  let createWindow = () => {
    mainWindow = new BrowserWindow({
      title: "Data2Code",
      closable: true,
      autoHideMenuBar: !isDev,
      resizable: true,
      center: true,
      maximizable: true,
      width: 1024,
      height: 800,
      icon: Config.trayAndAppIco,
      webPreferences: {
        nodeIntegration: false,
        preload: ""
      }
    });
    
    mainWindow.on("close", (e) => {
      e.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
      process.exit(0);
    });
  };
  
  app.whenReady().then(() => {
    createWindow();
    // windowMain.hide();
    
    if (!Config.isExeDownloaded()) {
      mainWindow.loadFile("loading.html")
        .then(() => mainWindow.show())
        .catch(e => console.log(e.message));
      downloadApp(mainWindow, launchedExe, true)
        .then(() => {
          if (Config.isExeDownloaded()) {
            execApi(mainWindow);
            mainWindow.loadURL("http://localhost:5000")
              .then(() => {
                mainWindow.reload();
                mainWindow.show();
              })
              .catch(e => console.log(e.message));
            windowMain.show();
          } else {
            mainWindow.webContents.on("will-prevent-unload",
              (event) => {
                const choice = dialog.showMessageBoxSync(mainWindow, {
                  type: "error",
                  buttons: ["Ok"],
                  title: "Error",
                  message: `The download or the application did not install correspondingly, please close the application and try again.
                   If the problem persists please contact the developers.`,
                  defaultId: 0,
                  cancelId: 1
                });
                const leave = (choice === 0);
                if (leave) {
                  event.preventDefault();
                  process.exit(0);
                }
              });
          }
        }).catch(e => console.log(e.message));
    } else {
      execApi(mainWindow);
      mainWindow.loadURL("http://localhost:5000")
        .then(() => {
          mainWindow.reload();
          mainWindow.show();
        })
        .catch(e => console.log(e.message));
      
    }
  }).catch(e => console.log(e.message));
  
  // Closing the application ...
  app.on("before-quit", () => {
    mainWindow.hide();
  });
  
  app.on("window-all-closed", (e) => {
    e.preventDefault();
    process.exit(0);
  });
};

windowMain();
