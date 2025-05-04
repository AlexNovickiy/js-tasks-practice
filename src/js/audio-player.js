import song1 from '../public/audio-player/Darin - Step Up.mp3';
import song2 from '../public/audio-player/Kesha - Tik Tok.mp3';
import song3 from '../public/audio-player/MGMT - Little Dark Age.mp3';
import song4 from '../public/audio-player/Disturbed - Down With The Sickness.mp3';
import song5 from '../public/audio-player/DVRST feat. Игорь Скляр & Atomic Heart - Komarovo (DVRST Phonk Remix).mp3';
import song6 from '../public/audio-player/fifty-fifty-cupid-twin-ver-(meloua.com).mp3';
import song7 from '../public/audio-player/fireflight_-_so_help_me_god_(z3.fm).mp3';
import song8 from '../public/audio-player/Gorillaz.mp3';
import song9 from '../public/audio-player/jaymes-young-infinity-(meloua.com).mp3';
import song10 from '../public/audio-player/Kenshi Yonezu Kick Back.mp3';
import song11 from '../public/audio-player/King Gnu Specialz.mp3';
import song12 from '../public/audio-player/Loreen - Tattoo.mp3';
import song13 from '../public/audio-player/Marshmello-Friends.mp3';
import cover from '../public/audio-player/Cover.png';

const playlist = [
  { title: 'Step Up', artist: 'Darin', src: song1 },
  { title: 'Tik Tok', artist: 'Kesha', src: song2 },
  { title: 'Little Dark Age', artist: 'MGMT', src: song3 },
  { title: 'Down With The Sickness', artist: 'Disturbed', src: song4 },
  { title: 'Komarovo (DVRST Phonk Remix)', artist: 'DVRST', src: song5 },
  { title: 'Cupid (Twin Ver)', artist: 'Fifty Fifty', src: song6 },
  { title: 'So Help Me God', artist: 'Fireflight', src: song7 },
  { title: 'Gorillaz', artist: 'Gorillaz', src: song8 },
  { title: 'Infinity', artist: 'Jaymes Young', src: song9 },
  { title: 'Kick Back', artist: 'Kenshi Yonezu', src: song10 },
  { title: 'Specialz', artist: 'King Gnu', src: song11 },
  { title: 'Tattoo', artist: 'Loreen', src: song12 },
  { title: 'Friends', artist: 'Marshmello', src: song13 },
];

const container = document.querySelector('.container-audio-player');
const trackSelect = document.querySelector('#track-select');
let currentTrackIndex = Math.floor(Math.random() * playlist.length);
let isPlaying = false;
let audio = new Audio(playlist[currentTrackIndex].src);

function renderPlayer() {
  container.innerHTML = `
    <div class="audio-cover">
      <img src="${cover}" alt="Cover" />
    </div>
    <div class="audio-info">
      <h2 class="audio-title">${playlist[currentTrackIndex].title}</h2>
      <p class="audio-artist">${playlist[currentTrackIndex].artist}</p>
    </div>
    <div class="audio-controls">
      <button class="btn-prev">⏮</button>
      <button class="btn-play">${isPlaying ? '⏸' : '▶'}</button>
      <button class="btn-next">⏭</button>
    </div>
    <div class="audio-progress">
      <span class="current-time">0:00</span>
      <input type="range" class="progress-bar" min="0" max="100" value="0" />
      <span class="total-time">0:00</span>
    </div>
    <div class="audio-volume">
      <label for="volume-control">Volume:</label>
      <input type="range" id="volume-control" min="0" max="1" step="0.01" value="${audio.volume}" />
    </div>
  `;

  const playButton = container.querySelector('.btn-play');
  const prevButton = container.querySelector('.btn-prev');
  const nextButton = container.querySelector('.btn-next');
  const progressBar = container.querySelector('.progress-bar');
  const volumeControl = container.querySelector('#volume-control');
  const currentTimeEl = container.querySelector('.current-time');
  const totalTimeEl = container.querySelector('.total-time');

  playButton.addEventListener('click', togglePlayPause);
  prevButton.addEventListener('click', playPreviousTrack);
  nextButton.addEventListener('click', playNextTrack);
  progressBar.addEventListener('input', seekTrack);
  volumeControl.addEventListener('input', adjustVolume);

  audio.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    currentTimeEl.textContent = currentTime;
    totalTimeEl.textContent = duration || '0:00';
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  });

  audio.addEventListener('ended', playNextTrack);
}

function renderTrackSelector() {
  trackSelect.innerHTML = playlist
    .map(
      (track, index) => `
      <option value="${index}" ${index === currentTrackIndex ? 'selected' : ''}>
        ${track.title} - ${track.artist}
      </option>
    `
    )
    .join('');

  trackSelect.addEventListener('change', (event) => {
    currentTrackIndex = parseInt(event.target.value, 10);
    switchTrack();
  });
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;

  const playButton = container.querySelector('.btn-play');
  playButton.textContent = isPlaying ? '⏸' : '▶';
}

function playPreviousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  switchTrack();
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  switchTrack();
}

function switchTrack() {
  const currentVolume = audio.volume;
  audio.pause();
  isPlaying = false;
  audio = new Audio(playlist[currentTrackIndex].src);
  audio.volume = currentVolume;
  renderPlayer(); 
  renderTrackSelector();
  initializeVolumeSlider(); 
  togglePlayPause();
}

function seekTrack(event) {
  const seekTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function updateVolumeSlider(volumeControl, value) {
  const min = volumeControl.min;
  const max = volumeControl.max;
  const valuePercent = `${(value - min) / (max - min) * 100}%`;

  volumeControl.style.background = `linear-gradient(to right, #4caf50 ${valuePercent}, #ccc ${valuePercent})`;
}

function adjustVolume(event) {
  const volumeControl = event.target;
  audio.volume = volumeControl.value;
  updateVolumeSlider(volumeControl, volumeControl.value);
}

function initializeVolumeSlider() {
  const volumeControl = document.querySelector('#volume-control');
  updateVolumeSlider(volumeControl, audio.volume);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

renderPlayer();
renderTrackSelector();
initializeVolumeSlider(); 
