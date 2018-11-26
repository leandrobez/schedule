const {app, BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

let win;

const createWindow = () => {
  let wWidth = '800',
    wHeight = '600',
    iconApp = __dirname + '/images/app-icon.jpg';

  win = new BrowserWindow({
    width: wWidth,
    height: wHeight,
    icon: iconApp
  });

  win.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file:',
        slashes:true
  }));

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
});