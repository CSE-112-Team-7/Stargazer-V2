import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

const backgroundMusic = document.getElementById("background-music");
const selectionButtons = document.querySelectorAll("main button");
const icon = document.querySelector("img");
const startButton = document.querySelector("a");
const nextButton = document.querySelector(".button");

let selectedButton = null;

function init() {
  playBgMusic(backgroundMusic, true);

  localStorage.removeItem("questionType");
  localStorage.removeItem("chosenConstellation");
  selectionButtons.forEach(function (element) {
    element.addEventListener("click", handleSelection);
  });

  nextButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
}

function handleSelection(element) {
  let clickedButton = element.target;

  let questionType = clickedButton.innerHTML;
  if (questionType === "RELATIONSHIP") {
    icon.src = "/assets/icons/rel/img";
    icon.alt = "relationship icon";
  } else if (questionType === "HEALTH") {
    icon.src = "/assets/icons/health/img";
    icon.alt = "health icon";
  } else if (questionType === "CAREER") {
    icon.src = "/assets/icons/career/img";
    icon.alt = "career icon";
  } else if (questionType === "HOROSCOPE") {
    icon.src = "/assets/icons/daily_scope/img";
    icon.alt = "horoscope icon";
  }

  if (selectedButton === null) {
    // if no button is previously selected, select the clicked button
    clickedButton.style.backgroundColor = "var(--button-hover-background)";

    localStorage.setItem("questionType", questionType);
    selectedButton = clickedButton;

    startButton.style.display = "block";
    icon.style.display = "block";
  } else if (clickedButton != selectedButton) {
    // unselect the previously selected button, select the clicked button
    selectedButton.style.backgroundColor = "var(--button-background)";

    clickedButton.style.backgroundColor = "var(--button-hover-background)";

    localStorage.setItem("questionType", questionType);
    selectedButton = clickedButton;
  }
}
