const { app, BrowserWindow } = require('electron')
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html');
    win.webContents.on('did-finish-load', function () {
        const bonjour = require('bonjour')();
        const getPort = require('get-port');
        const uuid = require('uuid');
        var serverlist = [];

        (async () => {
            var availableTcpPort = await getPort({ port: [3000, 3001, 3002] });
            console.log(`尝试端口:${availableTcpPort}`);
            bonjour.publish({ name: '应用' + uuid.v1(), type: 'haust-lyb', port: availableTcpPort });
        })();



        function isANewService(server) {
            serverlist.forEach((item) => {
                var serverid = `${server.name}_${server.referer.address}_${server.referer.port}`;
                var itemid = `${item.name}_${item.referer.address}_${item.referer.port}`;
                if (serverid == itemid) {
                    return false;
                }
            });
            return true;
        }

        bonjour.find({ type: 'haust-lyb' }, function (service) {
            if (isANewService(service)) {
                serverlist.push(service);
                var msg = `发现【${service.type}】服务，serverName：${service.name}，serverAddress：${service.referer.address}，port：${service.port}，protocol:${service.protocol}`;
                win.webContents.send('ping', msg);
                console.log(msg);
            }
        });

    });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})



