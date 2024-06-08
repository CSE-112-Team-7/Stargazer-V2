import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

const backgroundMusic = document.getElementById("background-music");
// ! All commented out section is for testing purpose, don't delete for now !
// const volumeSlider = document.querySelector("input");
// const closeButton = document.querySelector("#setting-panel > button");
// const settingPanel = document.querySelector("#setting-panel");
// const settingButton = document.querySelector("#setting");

function init() {
    playBgMusic(backgroundMusic, true);

    const guestButton = document.querySelectorAll(".button")[2];
    guestButton.addEventListener("click", () => {
        localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
    });

    // let volume = localStorage.getItem("volume");
    // if (volume != null) {
    //     volumeSlider.value = volume;
    // }
    // volumeSlider.addEventListener("change", changeVolume);
    // closeButton.addEventListener("click", closeSetting);
    // settingButton.addEventListener("click", openSetting);
}


// function changeVolume(element) {
//     let setVolume = element.currentTarget.value;
//     localStorage.setItem("volume", setVolume);
//     playBgMusic(backgroundMusic, false);
// }

// function closeSetting() {
//     settingPanel.style.display = "none";
// }

// function openSetting() {
//     settingPanel.style.display = "flex";
// }