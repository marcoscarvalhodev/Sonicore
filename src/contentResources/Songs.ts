
export default function Songs() {
  const songs = [
    '/songs/streamline.mp3',
    '/songs/hells_bells.mp3',
    '/songs/enter_sandman.mp3',
    '/songs/lift_me_up.mp3',
    '/songs/rock_you_like_a_hurricane.mp3',
  ];

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const shuffledSongs = [...songs];
  shuffleArray(shuffledSongs);

  const audioPlayer = document.getElementById('audioPlayer');
  const toggleButton = document.getElementById('toggleButton');

  let currentSongIndex = 0;
  let isPlaying = false; 


  function playNextSong() {
    if (audioPlayer instanceof Audio && toggleButton) {
      audioPlayer.src = shuffledSongs[currentSongIndex];
      audioPlayer.play();
      isPlaying = true;
      
    }

    currentSongIndex = (currentSongIndex + 1) % shuffledSongs.length;
  }

  function togglePlayPause() {
    if (audioPlayer instanceof Audio && toggleButton instanceof HTMLImageElement)
      if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        toggleButton.src = "/svg/sound-mute.svg";
      } else {
        if (audioPlayer.src === '') {
          playNextSong();
          toggleButton.src = "/svg/sound-max.svg";
        } else {
          audioPlayer.play();
          isPlaying = true;
          toggleButton.src = "/svg/sound-max.svg";
        }
      }
  }

  if (toggleButton && audioPlayer) {
    toggleButton.addEventListener('click', togglePlayPause);

    audioPlayer.addEventListener('ended', playNextSong);
  }
}
