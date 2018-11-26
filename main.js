const { app, BrowserWindow, Tray, Menu } = require('electron');

app.setAppUserModelId('com.internetlojas.il-diary-online');

const path = require('path');
const url = require('url');
const shell = require('electron').shell;

process.env.NODE_ENV = 'developer';

let win = null;
//__dirname + '/src/assets/icons/win/icon.ico'
let appLogo = path.join(__dirname, '/src/assets/icons/win/', 'icon.ico');

/**creted window */

const createWindow = () => {
  let wWidth = '800',
    wHeight = '600',
    iconApp = appLogo;

  win = new BrowserWindow({
    title      : 'DiaryOnline',
    icon       : iconApp,
    width      : wWidth,
    height     : wHeight
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  win.setMenu(null);

  win.on('closed', () => {
    app.quit();
  });

  win.on('close', e => {
    if (!app.isQuitting) {
      e.preventDefault();
      win.hide();
    }
  });
};

/**create menu tray */
const generateTray = () => {
  const menuTray = [
    {
      label: 'Mostrar DiaryOnline',
      click() {
        //open app
        win.show();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Fechar',
      click() {
        app.isQuitting = true;
        if (process.platform !== 'darwin') {
          app.quit();
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Sair',
      click() {
        process.exit(0);
      }
    }
  ];

  /**tray menu */
  const contextMenu = Menu.buildFromTemplate(menuTray);
  const tray = new Tray(appLogo);
  tray.setContextMenu(contextMenu);
};

/**create main menu */

const generateMenu = () => {
  const mainMenuTemplate = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Internetlojas',
          accelerator: process.plataform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click() {
            shell.openExternal('http://www.internetlojas.com');
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.plataform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    }
  ];

  let mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // if mac, add empty object to menu
  if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
  }

  // Add developerTools for developer in mainmenu
  if (process.env.NODE_ENV !== 'production') {
    //win.webContents.openDevTools();
    mainMenuTemplate.push({
      label: 'Ferramenta do desenvolvedor',
      submenu: [
        {
          label: 'Abrir',
          accelerator: process.plataform == 'darwin' ? 'Command+D' : 'Ctrl+D',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'recarregar'
        }
      ]
    });
  }
  mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
};

app.on('ready', () => {
  createWindow();
  generateMenu();
  generateTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
