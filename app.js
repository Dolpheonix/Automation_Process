const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { readNodePackages, readPythonPackages, detectProjectType, checkLatestPackage } = require('./util/packageManager');
const fs = require('fs');

// 개발/배포 환경 구분
const configPath = app.isPackaged ? path.join(app.getPath('userData'), 'config.json') : path.join(process.cwd(), 'config.json');
const resourcePath = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(process.cwd(), 'assets');
const loadConfig = () => {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return { folders: [] };
  }
}

const saveConfig = (config) => {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

let config = loadConfig();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 보안 설정
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('./renderer/index.html');
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('get-folders', () => {
    return config.folders;
    });

    ipcMain.handle('add-folder', async () => {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
      });
      if (result.canceled) return config.folders;

      const newPaths = result.filePaths.filter(p => !config.folders.includes(p));
      config.folders.push(...newPaths);
      saveConfig(config);
      return config.folders;
    });

    ipcMain.handle('remove-folder', (event, folderPath) => {
      config.folders = config.folders.filter(p => p !== folderPath);
      saveConfig(config);
      return config.folders;
    });

    ipcMain.handle('git-pull-all', async () => {
      const results = [];
      for (const folder of config.folders) {
          const result = await new Promise(resolve => {
            exec('git pull', { cwd: folder }, (error, stdout, stderr) => {
              if (error) {
                resolve({ folder, success: false, output: stderr || error.message });
              } else {
                resolve({ folder, success: true, output: stdout });
              }
            });
          });
          results.push(result);
      }
      return results;
    });

    ipcMain.handle('git-pull-one', async (event, folder) => {
      return new Promise(resolve => {
        exec('git pull', { cwd: folder }, (error, stdout, stderr) => {
          if (error) {
            resolve({ folder, success: false, output: stderr || error.message });
          } else {
            resolve({ folder, success: true, output: stdout });
          }
        });
      });
    });

    // PakcageManager
    ipcMain.handle('detect-packages', () => {
      return config.folders.map(folder => {
        const type = detectProjectType(folder);
        const packages =
          type === 'node' ? readNodePackages(folder) :
          type === 'python' ? readPythonPackages(folder) :
          [];

        return { folder, type, packages };
      });
    });

    ipcMain.handle('check-latest-package', async (event, type, name) => checkLatestPackage(type, name));

    ipcMain.handle('get-asset-path', (event, assetName) => {
      return path.join(resourcePath, assetName);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});