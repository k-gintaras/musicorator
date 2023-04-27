const fs = require('fs');
const path = require('path');
const player = require('play-sound')((opts = {}));

class MusicPlayer {
  constructor(directoryPaths) {
    this.directoryPaths = directoryPaths;
    this.mp3Files = [];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
  }

  // Function to play a track
  playTrack(trackPath) {
    console.log(`Now playing: ${trackPath}`);
    const playerInstance = player.play(trackPath, (err) => {
      if (err) throw err;
    });
    this.isPlaying = true;
    playerInstance.on('close', (code) => {
      console.log(`Finished playing: ${trackPath}`);
      this.isPlaying = false;
      this.nextTrack();
    });
  }

  // Function to play the next track
  nextTrack() {
    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.mp3Files.length) {
      // If we've reached the end of the playlist, stop playing
      console.log('End of playlist');
      this.isPlaying = false;
      return;
    }
    const trackPath = this.mp3Files[this.currentTrackIndex];
    this.playTrack(trackPath);
  }

  // Function to play the previous track
  playPrevious() {
    this.currentTrackIndex--;
    if (this.currentTrackIndex < 0) {
      console.log('No previous track available');
      this.currentTrackIndex = 0;
      return;
    }
    const trackPath = this.mp3Files[this.currentTrackIndex];
    this.playTrack(trackPath);
  }

  // Function to play tracks from all directories
  playAll() {
    // Read the names of MP3 files in all directories and add them to the mp3Files array
    let filesProcessed = 0;
    let allFiles = [];
    this.directoryPaths.forEach((directoryPath) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;
        const mp3Files = files
          .filter((file) => path.extname(file) === '.mp3')
          .map((file) => path.join(directoryPath, file));
        allFiles = allFiles.concat(mp3Files);
        filesProcessed++;
        if (filesProcessed === this.directoryPaths.length) {
          if (allFiles.length === 0) {
            console.log('No MP3 files found in any directory');
            return;
          }
          console.log(`Found ${allFiles.length} MP3 files`);
          this.mp3Files = allFiles;
          // Start playing the first track in the playlist
          const firstTrackPath = this.mp3Files[0];
          this.playTrack(firstTrackPath);
        }
      });
    });
  }
}

module.exports = MusicPlayer;
