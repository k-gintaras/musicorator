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

const suggestionsJson =
  '{"tags":{"quiet":{"color":"#6e40aa","group":"volume","i":0},"loud":{"color":" #773fad","group":"volume","i":1},"slow":{"color":" #813eb0","group":"speed","i":2},"progressive":{"color":" #8c3eb2","group":"speed","i":3},"fast":{"color":" #963db3","group":"speed","i":4},"flowing":{"color":" #a03db3","group":"beats","i":5},"rhythmic":{"color":" #ab3cb2","group":"beats","i":6},"classical":{"color":" #b53cb1","group":"age","i":7},"classy":{"color":" #bf3caf","group":"age","i":8},"old":{"color":" #c93dab","group":"age","i":9},"modern":{"color":" #d23ea7","group":"age","i":10},"new":{"color":" #db3fa3","group":"age","i":11},"electro":{"color":" #e4419d","group":"vocals","i":12},"vocal":{"color":" #eb4397","group":"vocals","i":13},"instrumental":{"color":" #f24591","group":"vocals","i":14},"electronic":{"color":" #f9488a","group":"instruments","i":15},"acoustic":{"color":" #fe4b83","group":"instruments","i":16},"classic":{"color":" #ff4f7b","group":"instruments","i":17},"orchestra":{"color":" #ff5473","group":"instruments","i":18},"mix":{"color":" #ff596b","group":"instruments","i":19},"guitar":{"color":" #ff5e63","group":"instruments","i":20},"piano":{"color":" #ff645c","group":"instruments","i":21},"sax":{"color":" #ff6a54","group":"instruments","i":22},"synth":{"color":" #ff714d","group":"instruments","i":23},"strings":{"color":" #ff7847","group":"instruments","i":24},"unusual":{"color":" #ff7f41","group":"funk","i":25},"beautiful":{"color":" #ff873b","group":"funk","i":26},"cool":{"color":" #ff8e37","group":"funk","i":27},"epic":{"color":" #fb9633","group":"funk","i":28},"funky":{"color":" #f59f30","group":"funk","i":29},"cute":{"color":" #efa72f","group":"attitude","i":30},"naughty":{"color":" #e9af2e","group":"attitude","i":31},"chill":{"color":" #e2b72f","group":"attitude","i":32},"neutral":{"color":" #dbbf30","group":"attitude","i":33},"serious":{"color":" #d4c733","group":"attitude","i":34},"light":{"color":" #cdcf37","group":"weight","i":35},"heavy":{"color":" #c6d63c","group":"weight","i":36},"deep":{"color":" #c0dd42","group":"pitch","i":37},"high":{"color":" #bae449","group":"pitch","i":38},"minimal":{"color":" #b4ea51","group":"melody","i":39},"melodic":{"color":" #aff05b","group":"melody","i":40},"dance":{"color":" #a3f258","group":"melody","i":41},"passive":{"color":" #97f357","group":"energy","i":42},"active":{"color":" #8bf457","group":"energy","i":43},"ambient":{"color":" #7ff658","group":"voice","i":44},"industrial":{"color":" #73f65a","group":"voice","i":45},"robo":{"color":" #67f75e","group":"voice","i":46},"male":{"color":" #5df662","group":"voice","i":47},"female":{"color":" #52f667","group":"voice","i":48},"chorus":{"color":" #49f56d","group":"voice","i":49},"gentle":{"color":" #40f373","group":"sounds","i":50},"soft":{"color":" #38f17b","group":"sounds","i":51},"balanced":{"color":" #30ef82","group":"sounds","i":52},"strong":{"color":" #2aeb8a","group":"sounds","i":53},"chillout":{"color":" #25e892","group":"genre","i":54},"atmospheric":{"color":" #21e39b","group":"genre","i":55},"house":{"color":" #1ddfa3","group":"genre","i":56},"techno":{"color":" #1bd9ab","group":"genre","i":57},"trance":{"color":" #1ad4b3","group":"genre","i":58},"dnb":{"color":" #19cebb","group":"genre","i":59},"pop":{"color":" #1ac7c2","group":"genre","i":60},"blues":{"color":" #1bc1c9","group":"genre","i":61},"rock":{"color":" #1dbace","group":"genre","i":62},"folk":{"color":" #20b2d4","group":"genre","i":63},"rap":{"color":" #23abd8","group":"genre","i":64},"tense":{"color":" #27a3dc","group":"mood","i":65},"sad":{"color":" #2c9cdf","group":"mood","i":66},"calm":{"color":" #3194e0","group":"mood","i":67},"positive":{"color":" #368ce1","group":"mood","i":68},"happy":{"color":" #3c84e1","group":"mood","i":69},"uplifting":{"color":" #417de0","group":"mood","i":70}}}';
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
      saveFile(dir, suggestionsJson).catch((err) => {
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
