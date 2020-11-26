// stop chrome complaining
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// a must have
let { app, ipcMain } = require('electron');

// globals
let canBigError = false;
let appWindow;
let currentEvent;

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

// other
const settingsFileName = 'user-settings.json';

const suggestions = {
  tags: {
    weird: { color: '#6e40aa', group: 'funk', i: 0 },
    funky: { color: '#7d3faf', group: 'funk', i: 1 },
    cool: { color: '#8e3eb2', group: 'funk', i: 2 },
    cute: { color: '#9e3db3', group: 'funk', i: 3 },
    epic: { color: '#af3cb2', group: 'funk', i: 4 },
    fast: { color: '#bf3caf', group: 'speed', i: 5 },
    slow: { color: '#cf3da9', group: 'speed', i: 6 },
    chill: { color: '#dd3fa2', group: 'speed', i: 7 },
    progressive: { color: '#ea4299', group: 'speed', i: 8 },
    house: { color: '#f5468e', group: 'speed', i: 9 },
    dnb: { color: '#fe4b83', group: 'speed', i: 10 },
    electro: { color: '#ff5276', group: 'vocals', i: 11 },
    pop: { color: '#ff5a6a', group: 'vocals', i: 12 },
    vocal: { color: '#ff635d', group: 'vocals', i: 13 },
    male: { color: '#ff6d51', group: 'vocals', i: 14 },
    female: { color: '#ff7847', group: 'vocals', i: 15 },
    robo: { color: '#ff833d', group: 'vocals', i: 16 },
    uplifting: { color: '#ff9036', group: 'mood', i: 17 },
    happy: { color: '#f69d31', group: 'mood', i: 18 },
    positive: { color: '#edaa2e', group: 'mood', i: 19 },
    neutral: { color: '#d7c432', group: 'mood', i: 20 },
    passive: { color: '#ccd038', group: 'mood', i: 21 },
    sad: { color: '#c1dc41', group: 'mood', i: 22 },
    modern: { color: '#b7e64c', group: 'age', i: 23 },
    new: { color: '#aff05b', group: 'age', i: 24 },
    old: { color: '#9cf357', group: 'age', i: 25 },
    classy: { color: '#88f557', group: 'age', i: 26 },
    classical: { color: '#75f65a', group: 'age', i: 27 },
    electronic: { color: '#63f75f', group: 'instruments', i: 28 },
    intrumental: { color: '#52f667', group: 'instruments', i: 29 },
    mix: { color: '#43f471', group: 'instruments', i: 30 },
    heavy: { color: '#36f17c', group: 'instruments', i: 31 },
    light: { color: '#2bec89', group: 'instruments', i: 32 },
    rhythmic: { color: '#23e696', group: 'melody', i: 33 },
    melodic: { color: '#1ddfa3', group: 'melody', i: 34 },
    dance: { color: '#1ad6b0', group: 'melody', i: 35 },
    loud: { color: '#19cdbc', group: 'volume', i: 36 },
    quiet: { color: '#1bc2c7', group: 'volume', i: 37 },
    deep: { color: '#1eb7d1', group: 'volume', i: 38 },
    low: { color: '#23abd8', group: 'volume', i: 39 },
    high: { color: '#2a9fde', group: 'volume', i: 40 },
  },
};

// WINDOW
function initWindow() {
  const { format } = require('url');
  const { BrowserWindow } = require('electron');
  canBigError = true;
  //frame:false to disable windows header with close and stuff
  appWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'Musicorator',
    // transparent: true,
    // frame: false,
  });
  // TODO: will not be able to see console
  // appWindow.setMenu(null);

  appWindow.loadURL(
    format({
      pathname: getJoinedPath(__dirname, `../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  setupSettingFile();
}

app.on('ready', initWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    initWindow();
  }
});

// TODO: COMMAND LISTENERS
ipcMain.on('requestFromRenderer', (event, optionsObj) => {
  const validRequests = [
    'openDirectory',
    'getDirectoryAllFiles',
    'createFolder',
    'getLastfmWebsite',
    'getWebsite',
    'playAudio',
    'getFilesByType',
    'getMusicData',
    'setMusicData',
    'getAllMusicData',
    'copyAllFiles',
  ];
  // optionsObj={
  //  anyName:any,
  //  dir:'qq'
  // }
  currentEvent = event;
  const key = optionsObj.key;

  //  in future allow only options.openFolder.title, so that we can easier error check
  if (optionsObj) {
    if (optionsObj.dir) {
      const dir = optionsObj.dir;
      if (!dir) {
        feedback('Invalid Path: ' + dir);
      }
    }
  } else {
    feedback('Invalid Options: ' + dir);
  }

  switch (key) {
    case 'openDirectory':
      startOpenDirectory(optionsObj);
      break;
    case 'getDirectoryAllFiles':
      startGetDirectoryAllFiles(optionsObj);
      break;
    case 'createFolder':
      startCreateFolder(optionsObj);
      break;
    case 'getLastfmWebsite':
      startGetLastfmWebsite(optionsObj);
      break;
    case 'getWebsite':
      startGetWebsite(optionsObj);
      break;
    case 'playAudio':
      startPlayAudio(optionsObj);
      break;
    case 'getFilesByType':
      startGetFilesByType(optionsObj);
      break;
    case 'getMusicData':
      startGetMusicData(optionsObj);
      break;
    case 'setMusicData':
      startSetMusicData(optionsObj);
      break;
    case 'getAllMusicData':
      startGetAllMusicData(optionsObj);
      break;
    case 'copyAllFiles':
      startCopyAllFiles(optionsObj);
      break;
    case 'getSettings':
      startGetSettings(optionsObj);
      break;
    case 'saveSettings':
      startSaveSettings(optionsObj);
      break;

    default:
      feedback('Wrong Request: ' + key);
      break;
  }
});

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

function doRespondBack(key, response) {
  if (currentEvent) {
    currentEvent.sender.send(key, response);
  }
}

function feedback(s) {
  doRespondBack('getFeedback', s);
}

function startOpenDirectory(options) {
  doOpenDir(options);
}

function startGetDirectoryAllFiles(options) {
  const dir = options.dir;
  if (dir) {
    getFiles(dir)
      .then((fileArray) => {
        doRespondBack.send('getDirectoryAllFiles', fileArray);
      })
      .catch((err) => {
        feedback(err.message);
      });
  } else {
    feedback('Missing Get Files Data.');
  }
}

function startCreateFolder(options) {
  const where = options.where;
  const dirName = options.name;
  if (where && dirName) {
    doCreateFolder(where, dirName);
  } else {
    feedback('Missing Create Folder Data.');
  }
}

function startGetLastfmWebsite(options) {
  // TODO: use own data
  // Application name	music searcher
  // API key	fe9f2adbe646d34240330df269571bb4
  // Shared secret	202df50802f63dd74b55079f8499c232
  // Registered to	ubaby_original
  // let title = options.title;
  // let artist = options.artist;
  // var lfm = new LastfmAPI({
  //   api_key: "fe9f2adbe646d34240330df269571bb4",
  //   secret: "202df50802f63dd74b55079f8499c232",
  // });
  // lfm.track.getInfo(
  //   {
  //     artist: artist,
  //     track: title,
  //   },
  //   (err, track) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log(track);
  //     }
  //   }
  // );
}

function startGetWebsite(options) {
  // const link = options.link;
  // const request = net.request(link);
  // request.on("response", (response) => {
  //   console.log("STATUS: " + response.statusCode);
  //   console.log("HEADERS:" + JSON.stringify(response.headers));
  //   response.on("data", (chunk) => {
  //     console.log("BODY" + chunk);
  //   });
  //   response.on("end", () => {
  //     console.log("No more data in response.");
  //   });
  // });
  // request.end();
}

function startPlayAudio(options) {
  const dir = options.dir;
  if (dir) {
    doPlayAudio(dir);
  } else {
    feedback('Missing Play Data.');
  }
}

function startGetFilesByType(options) {
  const dir = options.dir;
  const type = options.type;
  if (type && dir) {
    getFilesByType(dir, type)
      .then((fileArray) => {
        doRespondBack('getFilesByType', fileArray);
      })
      .catch((err) => {
        feedback(err);
      });
  } else {
    feedback('Missing Get Files Data.');
  }
}

function startGetMusicData(options) {
  const dir = options.dir;
  if (dir) {
    getMusicData(dir)
      .then((metadata) => {
        doRespondBack('getMusicData', metadata);
      })
      .catch((err) => {
        feedback(err);
      });
  } else {
    feedback('Missing Play Data.');
  }
}

function startSetMusicData(options) {
  const dir = options.dir;
  const tagsObject = options.tagsObject;
  if (dir && tagsObject) {
    setMusicData(dir, tagsObject)
      .then((metadata) => {
        doRespondBack('setMusicData', metadata);
      })
      .catch((err) => {
        feedback(err.message);
      });
  } else {
    feedback('Missing Set Track Data.');
  }
}

function startGetAllMusicData(options) {
  feedback('Getting Files: ');
  const promises = [];
  const filesArray = options.folders;

  if (filesArray) {
    if (filesArray.length > 0) {
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        promises.push(getMusicDataExtra(file));
      }

      Promise.all(promises)
        .then((result) => {
          doRespondBack('getAllMusicData', result);
        })
        .catch((err) => {
          feedback(err.message);
        });
    } else {
      feedback('Missing Get All Track Data 2.');
    }
  } else {
    feedback('Missing Get All Track Data 1.');
  }
}

function startCopyAllFiles(options) {
  if (!basename) {
    basename = require('path').basename;
  }
  feedback('Copying Files: ');
  const promises = [];

  if (options) {
    const folderWhere = options.folder;
    const folderName = options.name;
    const filesArray = options.folders;
    if (folderWhere && folderName && filesArray) {
      if (filesArray.length > 0) {
        const newFolder = getJoinedPath(folderWhere, folderName);

        for (let i = 0; i < filesArray.length; i++) {
          const file = filesArray[i];
          const fileName = basename(file);
          const toWhereWithFileName = getJoinedPath(newFolder, fileName);
          promises.push(copyFileExtra(file, toWhereWithFileName));
        }

        Promise.all(promises)
          .then(() => {
            doRespondBack('copyAllFiles', 'Completed Copying.');
            openPathInShell(newFolder);
          })
          .catch((err) => {
            feedback(err);
          });
      } else {
        feedback('Missing Copy All Data 3.');
      }
    } else {
      feedback('Missing Copy All Data 2.');
    }
  } else {
    feedback('Missing Copy All Data 1.');
  }
}

// function isValidPath(path) {
//   if (path) {
//     return true;
//   }
//   return false;
// }

function copyFileExtra(fromWhereWithFileName, toWhereWithFileName) {
  if (!copyFile) {
    copyFile = require('fs').promises.copyFile;
  }
  return copyFile(fromWhereWithFileName, toWhereWithFileName)
    .then(() => {
      feedback(
        'Moved: ' + fromWhereWithFileName + ' to: ' + toWhereWithFileName
      );
    })
    .catch((err) => {
      feedback(err);
    });
}

function doOpenDir(options) {
  if (!dialog) {
    dialog = require('electron').dialog;
  }
  dialog
    .showOpenDialog(appWindow, {
      properties: ['openDirectory'],
    })
    .then((data) => {
      doRespondBack('openDirectory', data.filePaths[0]);
    })
    .catch((err) => {
      feedback(err);
    });
}

function doCreateFolder(where, dirName) {
  if (!mkdir) {
    mkdir = require('fs').promises.mkdir;
  }
  const newPath = getJoinedPath(where, dirName);
  mkdir(newPath)
    .then(() => {
      doRespondBack('createFolder', 'Created Folder.');
    })
    .catch((res) => {
      feedback(res);
    });
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

function openPathInShell(dir) {
  if (!shell) {
    shell = require('electron').shell;
  }
  // shell.openPath(dir);
  const link = getJoinedPath('file://', dir);
  shell.openExternal(link);
}

function getMusicData(dir) {
  if (!nodeId3) {
    nodeId3 = require('node-id3').Promise;
  }

  return nodeId3.read(dir, {
    exclude: ['private', 'PRIV', 'image', 'APIC'],
  });
}

function getCurrentFolder() {
  if (!remote) {
    remote = require('electron').app;
  }
  return remote.getAppPath();
}

function doGetFile(dir) {
  getFile(dir)
    .then((res) => {
      doRespondBack('readFile', res);
    })
    .catch((res) => {
      feedback(res);
    });
}

function getFile(dir) {
  if (!readFile) {
    readFile = require('fs').promises.readFile;
  }

  return readFile(dir, 'utf8'); // TODO: allow different encoding
}

function doSaveFile(dir, data) {
  saveFile(dir, data)
    .then((res) => {
      doRespondBack('writeFile', res);
    })
    .catch((res) => {
      feedback(res);
    });
}

async function setupSettingFile() {
  const currentFolder = getCurrentFolder();
  const dir = getJoinedPath(currentFolder, settingsFileName);
  const file = await getFile(dir).catch((err) => {
    if (err) {
      // doesnt exist
      saveFile(dir, JSON.stringify(suggestions)).catch((err) => {
        if (err) {
          console.log('Can`t save settings. ' + err);
        }
      });
    }
  });
}

function startGetSettings() {
  feedback('Getting Settings.');

  getSettingsFile()
    .then((res) => {
      if (isValidJson(res)) {
        doRespondBack('getSettings', JSON.parse(res));
      } else {
        feedback('Something wrong with JSON settings file.');
      }
    })
    .catch((err) => {
      if (err) {
        feedback(err);
      }
    });
}

function startSaveSettings(dataObject) {
  feedback('Saving Settings.');
  const data = dataObject.data;

  if (data) {
    const json = JSON.stringify(data);
    if (json) {
      saveSettingsFile(json)
        .then((res) => {
          feedback('Saved Settings.');
          doRespondBack('saveSettings', res);
        })
        .catch((err) => {
          if (err) {
            feedback(err);
          }
        });
    }
  } else {
    feedback('Not saving empty data.');
  }
}

function isValidJson(json) {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
}

function getSettingsFile() {
  const currentFolder = getCurrentFolder();
  const dir = getJoinedPath(currentFolder, settingsFileName);
  return getFile(dir).catch((err) => {
    if (err) {
      feedback(err);
    }
  });
}

function saveSettingsFile(data) {
  const currentFolder = getCurrentFolder();
  const dir = getJoinedPath(currentFolder, settingsFileName);
  return saveFile(dir, data).catch((err) => {
    if (err) {
      feedback(err);
    }
  });
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

  return nodeId3
    .read(dir, {
      exclude: ['private', 'PRIV', 'image', 'APIC'],
    })
    .then((result) => {
      feedback(dir);
      return { file: dir, data: result };
    })
    .catch((err) => {
      return { file: dir, data: err };
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
