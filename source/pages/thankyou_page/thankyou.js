import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

/**
 * Play background music, all function calls in thankyou page trace back here
 */
function init() {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  // if user is logged in, direct back to selection page instead of home page
  const homeButton = document.querySelector(".button");
  if (document.cookie.includes("loggedin=true")) {
    homeButton.href = "/selection/page";
  } else {
    homeButton.href = "/";
  }

  homeButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
}
