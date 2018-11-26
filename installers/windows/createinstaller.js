const createWindowsInstaller = require('electron-winstaller')
  .createWindowsInstaller;
const path = require('path');

const getInstallerConfig = () => {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release-builds');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'schedule-win32-ia32/'),
    authors: 'Leandro Bezerra - InternetLojas.com',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'schedule.exe',
    setupExe: 'ScheduleInstaller.exe',
    setupIcon: path.join(
      rootPath + 'src/',
      'assets',
      'icons',
      'win',
      'icon.ico'
    )
  });
};

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch(error => {
    console.error(error.message || error);
    process.exit(1);
  });
