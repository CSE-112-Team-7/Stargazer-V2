import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

const backgroundMusic = document.getElementById("background-music");

function init() {
    playBgMusic(backgroundMusic, true);

    const guestButton = document.querySelectorAll(".button")[2];
    guestButton.addEventListener("click", () => {
        localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
    });
}
