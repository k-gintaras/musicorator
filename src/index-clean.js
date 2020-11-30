// stop chrome complaining
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let {
  getFiles,
  getFilesByType,
  getMusicDataExtra,
  setMusicData,
  saveFile,
  copyFileExtra,
  getFile,
  getCurrentFolder,
  doCreateFolder,
  doOpenDir,
  getJoinedPath,
  doPlayAudio,
  openPathInShell,
  copyAllFiles,
} = require('./files-promises');

// a must have
let { app, ipcMain } = require('electron');

// globals
let appWindow;
let currentEvent;

// other
const settingsFileName = 'user-settings.json';

const suggestionsJson =
  '{"tags":{"quiet":{"color":"#6e40aa","group":"volume","i":0},"loud":{"color":" #773fad","group":"volume","i":1},"slow":{"color":" #813eb0","group":"speed","i":2},"progressive":{"color":" #8c3eb2","group":"speed","i":3},"fast":{"color":" #963db3","group":"speed","i":4},"flowing":{"color":" #a03db3","group":"beats","i":5},"rhythmic":{"color":" #ab3cb2","group":"beats","i":6},"classical":{"color":" #b53cb1","group":"age","i":7},"classy":{"color":" #bf3caf","group":"age","i":8},"old":{"color":" #c93dab","group":"age","i":9},"modern":{"color":" #d23ea7","group":"age","i":10},"new":{"color":" #db3fa3","group":"age","i":11},"electro":{"color":" #e4419d","group":"vocals","i":12},"vocal":{"color":" #eb4397","group":"vocals","i":13},"instrumental":{"color":" #f24591","group":"vocals","i":14},"electronic":{"color":" #f9488a","group":"instruments","i":15},"acoustic":{"color":" #fe4b83","group":"instruments","i":16},"classic":{"color":" #ff4f7b","group":"instruments","i":17},"orchestra":{"color":" #ff5473","group":"instruments","i":18},"mix":{"color":" #ff596b","group":"instruments","i":19},"guitar":{"color":" #ff5e63","group":"instruments","i":20},"piano":{"color":" #ff645c","group":"instruments","i":21},"sax":{"color":" #ff6a54","group":"instruments","i":22},"synth":{"color":" #ff714d","group":"instruments","i":23},"strings":{"color":" #ff7847","group":"instruments","i":24},"unusual":{"color":" #ff7f41","group":"funk","i":25},"beautiful":{"color":" #ff873b","group":"funk","i":26},"cool":{"color":" #ff8e37","group":"funk","i":27},"epic":{"color":" #fb9633","group":"funk","i":28},"funky":{"color":" #f59f30","group":"funk","i":29},"cute":{"color":" #efa72f","group":"attitude","i":30},"naughty":{"color":" #e9af2e","group":"attitude","i":31},"chill":{"color":" #e2b72f","group":"attitude","i":32},"neutral":{"color":" #dbbf30","group":"attitude","i":33},"serious":{"color":" #d4c733","group":"attitude","i":34},"light":{"color":" #cdcf37","group":"weight","i":35},"heavy":{"color":" #c6d63c","group":"weight","i":36},"deep":{"color":" #c0dd42","group":"pitch","i":37},"high":{"color":" #bae449","group":"pitch","i":38},"minimal":{"color":" #b4ea51","group":"melody","i":39},"melodic":{"color":" #aff05b","group":"melody","i":40},"dance":{"color":" #a3f258","group":"melody","i":41},"passive":{"color":" #97f357","group":"energy","i":42},"active":{"color":" #8bf457","group":"energy","i":43},"ambient":{"color":" #7ff658","group":"voice","i":44},"industrial":{"color":" #73f65a","group":"voice","i":45},"robo":{"color":" #67f75e","group":"voice","i":46},"male":{"color":" #5df662","group":"voice","i":47},"female":{"color":" #52f667","group":"voice","i":48},"chorus":{"color":" #49f56d","group":"voice","i":49},"gentle":{"color":" #40f373","group":"sounds","i":50},"soft":{"color":" #38f17b","group":"sounds","i":51},"balanced":{"color":" #30ef82","group":"sounds","i":52},"strong":{"color":" #2aeb8a","group":"sounds","i":53},"chillout":{"color":" #25e892","group":"genre","i":54},"atmospheric":{"color":" #21e39b","group":"genre","i":55},"house":{"color":" #1ddfa3","group":"genre","i":56},"techno":{"color":" #1bd9ab","group":"genre","i":57},"trance":{"color":" #1ad4b3","group":"genre","i":58},"dnb":{"color":" #19cebb","group":"genre","i":59},"pop":{"color":" #1ac7c2","group":"genre","i":60},"blues":{"color":" #1bc1c9","group":"genre","i":61},"rock":{"color":" #1dbace","group":"genre","i":62},"folk":{"color":" #20b2d4","group":"genre","i":63},"rap":{"color":" #23abd8","group":"genre","i":64},"tense":{"color":" #27a3dc","group":"mood","i":65},"sad":{"color":" #2c9cdf","group":"mood","i":66},"calm":{"color":" #3194e0","group":"mood","i":67},"positive":{"color":" #368ce1","group":"mood","i":68},"happy":{"color":" #3c84e1","group":"mood","i":69},"uplifting":{"color":" #417de0","group":"mood","i":70}}}';
// WINDOW
function initWindow() {
  const { format } = require('url');
  const { BrowserWindow } = require('electron');
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

function doRespondBackObject(keyIn, responseIn) {
  const responseObject = { key: keyIn, response: responseIn };
  if (currentEvent) {
    currentEvent.sender.send('responseFromMain', responseObject);
  }
}

function feedback(s) {
  doRespondBackObject('getFeedback', s);
}

function startOpenDirectory(options) {
  doOpenDir(appWindow)
    .then((data) => {
      doRespondBackObject('openDirectory', data.filePaths[0]);
    })
    .catch((err) => {
      feedback(err);
    });
}

function startGetDirectoryAllFiles(options) {
  const dir = options.dir;
  if (dir) {
    getFiles(dir)
      .then((fileArray) => {
        doRespondBackObject('getDirectoryAllFiles', fileArray);
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
    doCreateFolder(where, dirName)
      .then(() => {
        doRespondBackObject('createFolder', 'Created Folder.');
      })
      .catch((res) => {
        feedback(res);
      });
  } else {
    feedback('Missing Create Folder Data.');
  }
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
        doRespondBackObject('getFilesByType', fileArray);
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
        doRespondBackObject('getMusicData', metadata);
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
        doRespondBackObject('setMusicData', metadata);
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
        const musicDataPromise = getMusicDataExtra(file)
          .then((result) => {
            feedback(dir);
            return { file: dir, data: result };
          })
          .catch((err) => {
            return { file: dir, data: err };
          });
        promises.push(musicDataPromise);
      }

      Promise.all(promises)
        .then((result) => {
          doRespondBackObject('getAllMusicData', result);
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
  feedback('Copying Files: ');

  const validated = validateCopyFilesRequest(options);
  if (validated) {
    copyAllFiles(folderWhere, folderName, filesArray, feedback)
      .then(() => {
        doRespondBackObject('copyAllFiles', 'Completed Copying.');
        openPathInShell(newFolder);
      })
      .catch((err) => {
        feedback(err);
      });
  }else{
    feedback("Not copying empty. "+folderWhere+","+ folderName+","+filesArray);
  }
}

function validateCopyFilesRequest(options) {
  if (options) {
    const folderWhere = options.folder;
    const folderName = options.name;
    const filesArray = options.folders;
    if (folderWhere && folderName && filesArray) {
      if (filesArray.length > 0) {
        return true;
      } 
  } 
  return false;
}

function doGetFile(dir) {
  getFile(dir)
    .then((res) => {
      doRespondBackObject('readFile', res);
    })
    .catch((res) => {
      feedback(res);
    });
}

function doSaveFile(dir, data) {
  saveFile(dir, data)
    .then((res) => {
      doRespondBackObject('writeFile', res);
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
        doRespondBackObject('getSettings', JSON.parse(res));
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
          doRespondBackObject('saveSettings', res);
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
