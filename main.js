const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const Menu = electron.Menu;
const path = require('path')
const url = require('url')
const {shell} = require('electron')

var myAppMenu, menuTemplate;

let mainWindow

function createWindow(urlPath){
  mainWindow = new BrowserWindow({width: 1000, height: 900})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, urlPath),
    protocol: 'file:',
    slashes: true,
    icon: path.join(__dirname, 'assets/icons/png/icon.png')
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    app.quit()
  })
}

menuTemplate = [
    {
        label: 'AllAboard',
        submenu: [
            {
                label: 'About AllAboard',
                click() {shell.openExternal('http:www.google.com')}
            },
            {role: 'quit'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    }
];

app.on('ready', function() {
    createWindow('index.html');

    myAppMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(myAppMenu);
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
