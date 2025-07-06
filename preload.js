const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getFolders: () => ipcRenderer.invoke('get-folders'),
    addFolder: () => ipcRenderer.invoke('add-folder'),
    removeFolder: (path) => ipcRenderer.invoke('remove-folder', path),
    gitPullAll: () => ipcRenderer.invoke('git-pull-all'),
    gitPullOne: (folder) => ipcRenderer.invoke('git-pull-one', folder)
});

contextBridge.exposeInMainWorld('pkgapi', {
    detectAll: () => ipcRenderer.invoke('detect-packages'),
    checkLatestPackage: (type, name) => ipcRenderer.invoke('check-latest-package', type, name),
});