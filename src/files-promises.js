module.exports = {
  getFiles: getFiles,
  getFilesByType: getFilesByType,
  getMusicDataExtra: getMusicDataExtra,
  setMusicData: setMusicData,
  saveFile: saveFile,
  copyFileExtra: copyFileExtra,
  getFile: getFile,
  getCurrentFolder: getCurrentFolder,
  doOpenDir: doOpenDir,
  doCreateFolder: doCreateFolder,
  getJoinedPath: getJoinedPath,
  doPlayAudio: doPlayAudio,
  openPathInShell: openPathInShell,
  copyAllFiles: copyAllFiles,
  getAllMusicData: getAllMusicData,
};

// imports later...
// electron
let shell;
let dialog;
let remote;
// fs
let readdir;
let copyFile;
let mkdir;
let readFile;
let writeFile;
// path
let resolve;
let join;
let basename;
// id3
let nodeId3;

// TODO: useful
// function error(s) {
//   if (s && canBigError) {
//     popup("Error: ", s)
//       .then()
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     console.log("Error: ", "Unknown Electron App Error!");
//   }
// }

// function popup(titleIn, messageIn) {
//   console.log(messageIn);
//   const msg = JSON.stringify(messageIn);
//   return dialog
//     .showMessageBox(null, {
//       type: "warning",
//       defaultId: 2,
//       title: titleIn,
//       message: msg,
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

function getAllMusicData(filesArray, feedbackCallback) {
  let f = feedback;

  if (feedbackCallback) {
    f = feedbackCallback;
  }
  f('Getting Files: ');

  const promises = [];

  for (let i = 0; i < filesArray.length; i++) {
    const currentFile = filesArray[i];
    const musicDataPromise = getMusicDataExtra(currentFile)
      .then((result) => {
        f(currentFile);
        return { file: currentFile, data: result };
      })
      .catch((err) => {
        return { file: currentFile, data: err };
      });
    promises.push(musicDataPromise);
  }

  return Promise.all(promises);
}

function copyAllFiles(folderWhere, folderName, filesArray, feedbackCallback) {
  if (!basename) {
    basename = require('path').basename;
  }
  let f = feedback;

  if (feedbackCallback) {
    f = feedbackCallback;
  }

  f('Copying Files: ');
  const promises = [];

  const newFolder = getJoinedPath(folderWhere, folderName);

  for (let i = 0; i < filesArray.length; i++) {
    const file = filesArray[i];
    const fileName = basename(file);
    const toWhereWithFileName = getJoinedPath(newFolder, fileName);
    const copyFilePromise = copyFileExtra(file, toWhereWithFileName)
      .then(() => {
        f('Moved: ' + file + ' to: ' + toWhereWithFileName);
      })
      .catch((err) => {
        f(err);
      });
    promises.push(copyFilePromise);
  }

  return Promise.all(promises);
}

function feedback(s) {
  console.log(s);
}

function openPathInShell(dir) {
  if (!shell) {
    shell = require('electron').shell;
  }
  // shell.openPath(dir);
  const link = getJoinedPath('file://', dir);
  shell.openExternal(link);
}

function doPlayAudio(dir) {
  if (!shell) {
    shell = require('electron').shell;
  }
  // shell.openPath(dir);
  const link = getJoinedPath('file://', dir);
  shell.openExternal(link);
}

function getJoinedPath(a, b) {
  if (!join) {
    join = require('path').join;
  }
  return join(a, b);
}

function doCreateFolder(where, dirName) {
  if (!mkdir) {
    mkdir = require('fs').promises.mkdir;
  }
  const newPath = getJoinedPath(where, dirName);
  return mkdir(newPath);
}

function doOpenDir(appWindow) {
  if (!dialog) {
    dialog = require('electron').dialog;
  }
  return dialog.showOpenDialog(appWindow, {
    properties: ['openDirectory'],
  });
}

function getCurrentFolder() {
  if (!remote) {
    remote = require('electron').app;
  }
  return remote.getAppPath();
}

function getFile(dir) {
  if (!readFile) {
    readFile = require('fs').promises.readFile;
  }

  return readFile(dir, 'utf8'); // TODO: allow different encoding
}

function copyFileExtra(fromWhereWithFileName, toWhereWithFileName) {
  if (!copyFile) {
    copyFile = require('fs').promises.copyFile;
  }
  return copyFile(fromWhereWithFileName, toWhereWithFileName);
}

function saveFile(dir, data) {
  if (!writeFile) {
    writeFile = require('fs').promises.writeFile;
  }

  return writeFile(dir, data);
}

function getMusicDataExtra(dir) {
  if (!nodeId3) {
    nodeId3 = require('node-id3').Promise;
  }

  return nodeId3.read(dir, {
    exclude: ['private', 'PRIV', 'image', 'APIC'],
  });
}

function setMusicData(dir, tags) {
  if (!nodeId3) {
    nodeId3 = require('node-id3').Promise;
  }

  return nodeId3.update(tags, dir);
}

// thanks to @qwtel
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function getFiles(dir) {
  if (!readdir) {
    readdir = require('fs').promises.readdir;
  }
  if (!resolve) {
    resolve = require('path').resolve;
  }
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
}

async function getFilesByType(dir, hasString) {
  if (!readdir) {
    readdir = require('fs').promises.readdir;
  }
  if (!resolve) {
    resolve = require('path').resolve;
  }
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files
    .reduce((a, f) => a.concat(f), [])
    .filter((res) => {
      return res.indexOf(hasString) > -1;
    });
}
