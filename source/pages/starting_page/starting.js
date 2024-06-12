import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

/**
 * Play background music on starting page and save the music
 * time to make it continuous when naviate to another page
 */
function init() {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  const guestButton = document.querySelectorAll(".button")[2];
  guestButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
}
