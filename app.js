const {app, BrowserWindow ,ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let win
function createWindow() {
    win = new BrowserWindow({
        width:1011,
        height:600,
        minWidth:800,
        minHeight:600,
        frame:false,
        show:false,
        center:true,
        hasShadow:true,
        webPreferences:{ 
            disableBlinkFeatures: 'Auxclick',
            experimentalFeatures: true,
            backgroundColor: '#fff' }
    })
    //win.webContents.setVisualZoomLevelLimits(1,1)
    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file:',
        slashes:true
    }))
    win.once('ready-to-show',()=>{
        win.show()
        win.webContents.openDevTools()
    })
    
    win.on('closed',()=>{
        win=null
    })
    win.on('blur',(e)=>{
        win.webContents.send('blur')
    })
}

app.on('ready',createWindow)
app.on('window-all-closed',()=>{
    if(process.platform!='drawin'){
        app.quit()
    }
})
app.on('activate',()=>{
    if(win==null){
        createWindow()
    }
})
require('electron-reload')(__dirname,{
    electron:require('electron')
});