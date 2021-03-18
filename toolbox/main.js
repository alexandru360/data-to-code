const Config = require("./src/tools/config");
const { execApi } = require("./src/tools/exec-api");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const util = require("./src/tools/download");
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
    
    try {
      // mainWindow.hide();
      mainWindow.loadFile("loading.html")
        .then(() => mainWindow.show())
        .catch((e) => console.log(e.message));
    } catch (ex) {
      console.error(ex.message);
    }
    
    mainWindow.on("close", (e) => {
      e.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
      mainWindow.hide();
    });
  };
  
  app.whenReady().then(() => {
    createWindow();

    //download
    util.downloadImage(mainWindow, launchedExe, true).then(() => {
      execApi(mainWindow).then((r) => {
        console.log("R from :", r);
        mainWindow.show();
      }).catch((e) => console.log(e.message));
    }).catch((e) => console.log(e.message));
    if (app.dock) app.dock.hide();
    
  }).catch((e) => console.log(e.message));
  
  // Closing the application ...
  app.on("before-quit", () => {
    mainWindow.hide();
  });
  
  app.on("window-all-closed", (e) => {
    e.preventDefault();
  });
};

windowMain();
