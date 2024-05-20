// get the music play time of the last page from local storage, then play at that time
export default function playBgMusic(backgroundMusic) {
  backgroundMusic.currentTime = localStorage.getItem("musicPlayTime") | 0;
  if(localStorage.getItem("musicVolume") != null) {
    backgroundMusic.volume = localStorage.getItem("musicVolume");
  }
  backgroundMusic.muted = false;
  backgroundMusic.play().catch((error) => {
    console.error(error);
  });
}
