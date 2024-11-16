// List of songs with names, paths, and album covers
const songs = [
  { title: 'F.N', src: 'music/song1.mp3', cover: 'images/song2-cover.jpg' },
  { title: 'Forever', src: 'music/song2.mp3', cover: 'images/song3-cover.jpg' },
  { title: 'Mood Swings', src: 'music/song3.mp3', cover: 'images/song4-cover.jpg' },
  { title: 'Sex Sounds', src: 'music/song4.mp3', cover: 'images/song5-cover.jpg' },
  { title: 'Still love you', src: 'music/song5.mp3', cover: 'images/song1-cover.jpg' },
  { title: 'Ice Cold', src: 'music/song6.mp3', cover: 'images/song6-cover.jpg' },
  { title: 'Beat the odds', src: 'music/song7.mp3', cover: 'images/song7-cover.jpg' }
];

// Shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(songs); // Shuffle songs at start

const player = document.getElementById('radio-player');
let currentSongIndex = 0;

// Load the first song
player.src = songs[currentSongIndex].src;

// Display song list with album covers and titles
const songListContainer = document.getElementById('song-list');
songs.forEach((song, index) => {
  const songDiv = document.createElement('div');
  songDiv.classList.add('song-item');
  
  const albumCover = document.createElement('img');
  albumCover.src = song.cover;
  albumCover.classList.add('album-cover');

  const songTitle = document.createElement('p');
  songTitle.textContent = song.title;

  songDiv.appendChild(albumCover);
  songDiv.appendChild(songTitle);
  
  // When song is clicked, set it as the current song
  songDiv.addEventListener('click', () => {
    currentSongIndex = index;
    player.src = songs[currentSongIndex].src;
    player.play();
    updatePlayPauseIcon('pause'); // Change to pause icon when playing
  });

  songListContainer.appendChild(songDiv);
});

// Function to toggle play/pause
function togglePlay() {
  const playPauseIcon = document.getElementById('play-pause-icon');
  if (player.paused) {
    player.play();
    playPauseIcon.textContent = '❚❚'; // Pause icon
  } else {
    player.pause();
    playPauseIcon.textContent = '▶'; // Play icon
  }
}

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  player.src = songs[currentSongIndex].src;
  player.play();
  updatePlayPauseIcon('pause'); // Update to pause icon when song starts playing
}

// Play the next song when the current one ends
player.addEventListener('ended', playNextSong);

// Function to update play/pause icon
function updatePlayPauseIcon(state) {
  const playPauseIcon = document.getElementById('play-pause-icon');
  if (state === 'play') {
    playPauseIcon.textContent = '▶'; // Play icon
  } else if (state === 'pause') {
    playPauseIcon.textContent = '❚❚'; // Pause icon
  }
}
