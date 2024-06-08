import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  const homeButton = document.querySelector(".button");
  homeButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
}
