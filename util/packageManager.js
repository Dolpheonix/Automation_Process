const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const detectProjectType = (folderPath) => {
  if (fs.existsSync(path.join(folderPath, 'package.json'))) return 'node';
  if (fs.existsSync(path.join(folderPath, 'requirements.txt'))) return 'python';
  return 'unknown';
}

const readNodePackages = (folderPath) => {
    const packageJson = path.join(folderPath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf-8'));

    const dependencies = pkg.dependencies || {};
    const devDependencies = pkg.devDependencies || {};

    const allDependencies = {...dependencies, ...devDependencies};
    return Object.entries(allDependencies).map(([name, version]) => {
        return {
            name: name, 
            version: version,
        }
    });
}

const readPythonPackages = (folderPath) => {
    const requirementsTxt = path.join(folderPath, 'requirements.txt');
    
    const allDependencies = fs.readFileSync(requirementsTxt, 'utf-8').split('\n');
    return allDependencies.map((val) => {
        const nameValue = val.split('==');
        return {
            name: nameValue[0],
            version: nameValue[1] || 'latest'
        }
    });
}

const checkLatestPackage = (type, name) => {
    if (type === 'node') {
        return new Promise((resolve, reject) => {
            exec(`npm show ${name} version`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error checking latest version for ${name}:`, error);
                    resolve('Error');
                } else {
                    console.log(stdout);
                    resolve(stdout.trim());
                }
            });
        });
    } else if (type === 'python') {
        return new Promise((resolve, reject) => {
            exec(`pip index versions ${name}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error checking latest version for ${name}:`, error);
                    resolve('Error');
                } else {
                    const match = stdout.match(/Available versions: (.+)/);
                    if (match) {
                        const versions = match[1].split(',').map(v => v.trim());
                        resolve(versions[0]);
                    } else {
                        resolve('Unknown');
                    }
                }
            });
        });
    }
    return Promise.resolve('Unknown');
};

module.exports = { readNodePackages, readPythonPackages, detectProjectType, checkLatestPackage };