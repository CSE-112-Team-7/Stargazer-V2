import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(this);

      let xhr = new XMLHttpRequest();

      xhr.open("POST", "/login/attempt", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log("Successful login");
          const errorMsg = document.getElementById("errorMsg");
          errorMsg.style.visibility = "hidden";
          window.location.href = "/selection/page";
        } else {
          const errorMsg = document.getElementById("errorMsg");
          errorMsg.style.visibility = "visible";
          console.error("Error:", xhr.statusText);
        }
      };

      xhr.send(JSON.stringify(Object.fromEntries(formData)));
    });
}
