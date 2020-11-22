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
// fs
let readdir;
let copyFile;
let mkdir;
// path
let resolve;
let join;
let basename;
// id3
let nodeId3;

const requirements = {};

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
  });
  // TODO: will not be able to see console
  appWindow.setMenu(null);

  appWindow.loadURL(
    format({
      pathname: getJoinedPath(__dirname, `../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );
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
      if (dir) {
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
