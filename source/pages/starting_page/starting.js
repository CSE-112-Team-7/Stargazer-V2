import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

const backgroundMusic = document.getElementById("background-music");
// The below commented out section is for testing purpose on setting-panel branch,
// feel free to delete it's currently on other branches

// const volumeSlider = document.querySelector("input");
// const closeButton = document.querySelector("#close");
// const settingPanel = document.querySelector("#setting-panel");
// const settingButton = document.querySelector("#setting");

// const loginLink = document.querySelector("#login");
// const logoutButton = document.querySelector("#logout");
// const historyLink = document.querySelector("#history");

function init() {
  playBgMusic(backgroundMusic, true);

  // if (document.cookie.includes("loggedin=true")) {
  //   loginLink.style.display = "none";
  //   logoutButton.style.display = "block";
  //   historyLink.style.display = "block";
  // } else {
  //   logoutButton.style.display = "none";
  //   historyLink.style.display = "none";
  //   loginLink.style.display = "block";
  // }

  const guestButton = document.querySelectorAll(".button")[2];
  guestButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });

  // let volume = localStorage.getItem("volume");
  // if (volume != null) {
  //   volumeSlider.value = volume;
  // }

  // logoutButton.addEventListener("click", logoutFunction);

  // volumeSlider.addEventListener("change", changeVolume);
  // closeButton.addEventListener("click", closeSetting);
  // settingButton.addEventListener("click", openSetting);
}

// function logoutFunction() {
//   let xhr = new XMLHttpRequest();

//   xhr.open("POST", "/logout/attempt");

//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       window.location.href = "/";
//     } else {
//       console.error("Error:", xhr.statusText);
//     }
//   };

//   xhr.send();
// }

// function changeVolume(element) {
//     let currentVolume = localStorage.getItem("volume")
//     if (currentVolume == null || currentVolume == '0') {
//         backgroundMusic.currentTime = 0;
//     }
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
