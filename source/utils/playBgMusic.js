// get the music play time of the last page from local storage, then play at that time
export default function playBgMusic(backgroundMusic, setTime) {
  if (setTime) {
    backgroundMusic.currentTime = localStorage.getItem("musicPlayTime") | 0;
  }
  let volume = localStorage.getItem("volume");
  if (volume != null) {
    backgroundMusic.volume = volume;
  } else {
    backgroundMusic.volume = 0;
  }
  backgroundMusic.play().catch((error) => {
    console.error(error);
  });
}
