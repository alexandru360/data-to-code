const {
    app,
    BrowserWindow,
    Menu,
    Tray,
    process
} = require('electron');
'use strict'

const fs = require('fs')
const path = require('path');
const http = require('http');
const util = require('util');

let tray = null;
let win = null;

function createWindow() {
    win = new BrowserWindow({
        title: "Data2Code",
        width: 742,
        height: 355,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        center: true,
        resizable: false,
        fullscreenable: false,
        icon: __dirname + '/code-16.png'
    });

    win.loadFile('index.html');

    win.on('close', e => {
        e.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
        win.hide();
    })
}

app.on('ready', () => {
    if (app.dock) app.dock.hide();
    tray = new Tray(path.join(__dirname, '/code-16.png'));

    tray.on('right-click', tray.popUpContextMenu);

    const menu = Menu.buildFromTemplate([
        {
            label: 'About...',
            click() {
                if (!win.isVisible()) win.show();
            }
        },
        {
            label: 'Separator', type: 'separator'
        },
        {
            label: '# Data 2 code',
            async click() {
                const {execFile} = require('child_process');
                const child = execFile('node', ['--version'], (error, stdout, stderr) => {
                    if (error) {
                        throw error;
                    }
                    console.log(stdout);
                });

                console.log('child proc:', child.pid);

                child.on('exit', (code) => {
                    console.log(`Program exited with code ${code}`);
                });
            }
        },
        {
            label: 'Update',
            click() {
                downloadImage().then().catch(e => console.log(e.message));
            }
        },
        {
            label: 'Separator', type: 'separator'
        },
        {
            label: 'Quit',
            click() {
                app.exit(0);
            }
        }
    ]);

    tray.setToolTip('');
    tray.setContextMenu(menu);
});

app.whenReady().then(createWindow);

// Closing the application ...
app.on('before-quit', () => {
    // app.quitting = false;
    win.hide();
});

app.on('window-all-closed', (e) => {
    if (process.platform !== 'darwin') {
        e.preventDefault();
    }
});

const download = function (url, dest, cb) {
    const file = fs.createWriteStream(dest);
    const request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};
