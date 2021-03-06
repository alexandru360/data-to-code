﻿"use strict";

const fs = require("fs");
const Path = require("path");
const axios = require("axios");
const Config = require("./config");
const { execApi } = require("./exec-api");
const { DeleteDirContent } = require("./file-manager");
const ExtractZip = require("extract-zip");
const promisify = require("util.promisify");

module.exports.downloadApp = (mainWindow, launchedExe) => {
  return new Promise((res, rej) => {
    let dataResponse = { appUrl: "", executable: "", version: "" };
    let currentVersion = { major: 0, minor: 0 }, serverVersion = { major: 0, minor: 0 };
    const dataOptionsUrl = Config.options.serverVer;
    axios.get(dataOptionsUrl).then(remoteInfo => {
      //Start of then
      try {
        const data = remoteInfo.data;
        switch (process.platform) {
          case "darwin":
            dataResponse.appUrl = data["macOs"].archive;
            dataResponse.executable = data["macOs"].executable;
            dataResponse.version = data["macOs"].version;
            break;
          case "linux":
            dataResponse.appUrl = data["linux"].archive;
            dataResponse.executable = data["linux"].executable;
            dataResponse.version = data["linux"].version;
            break;
          case "win32":
            dataResponse.appUrl = data["win"].archive;
            dataResponse.executable = data["win"].executable;
            dataResponse.version = data["win"].version;
            break;
        }
      } catch (e) {
        rej(e);
      }
      
      let localVer = Config.options.version.split("."),
        srvVer = dataResponse.version.split(".");
      currentVersion.major = Number(localVer[0]);
      currentVersion.minor = Number(localVer[1]);
      serverVersion.major = Number(srvVer[0]);
      serverVersion.minor = Number(srvVer[1]);
      
      // if not exe or major mismatch or minor mismatch then download !
      if (!Config.isExeDownloaded() ||
        serverVersion.major > currentVersion.major ||
        (currentVersion.major = serverVersion.major &&
          currentVersion.minor > serverVersion.minor)) {
        let archiveName
          = dataResponse.appUrl.split("/")[dataResponse.appUrl.split("/").length - 1];
        
        DeleteDirContent(); // delete directory
        const archive = Path.resolve(Config.appPathDownload, archiveName);
        if (!fs.existsSync(Config.appPathDownload))
          fs.mkdirSync(Config.appPathDownload);
        
        const writer = fs.createWriteStream(archive);
        const dataExeUrl = dataResponse.appUrl;
        
        axios({
          url: dataExeUrl,
          method: "get",
          responseType: "stream"
        }).then(response => {
          response.data.pipe(writer);
          
          writer.on("error", rej);
          writer.on("finish", () => {
            let newOptions = { ...Config.options };
            newOptions.exe = dataResponse.executable;
            newOptions.version = dataResponse.version;
            Config.writeConfig(newOptions);
            
            //Extract from archive !
            try {
              // close application
              if (launchedExe) {
                try {
                  launchedExe.stdin.pause();
                  launchedExe.kill();
                } catch (e) {
                  console.error(e.message);
                }
              }
              const unzip = promisify(ExtractZip);
              unzip(archive, { dir: Config.appPathDownload })
                .then(() => {
                  // when successful archive extracted start the process ...
                  execApi(Config, mainWindow);
                  mainWindow.loadFile("").then().catch(e => console.error(e.message));
                  mainWindow.loadURL("http://localhost:5000")
                    .then(() => {
                      mainWindow.reload();
                      res();
                    })
                    .catch((e) => console.log(e.message));
                });
            } catch (e) {
              console.log(e.message);
            }
          });
          
        }).catch(e => console.log(e.message));
      } else res();
      // End of then
    }).catch(e => {
      console.log(e.message);
      rej(e);
    });
  });
};
