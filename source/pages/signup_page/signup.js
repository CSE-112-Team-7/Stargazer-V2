import playBgMusic from "/utils/playmusic/script";

window.addEventListener("DOMContentLoaded", init);

/**
 * @constant {string} password stores the id of the new user's password
 * @constant {string} conf_password stores the id of the new user's confirmation password
 * @constant {string} backgroundMusic stores the id of the background music
 */
const password = document.getElementById("new_password");
const conf_password = document.getElementById("new_password_conf");
const backgroundMusic = document.getElementById("background-music");

/**
 * Sends a POST request with the new user's username and password to the database, and handles request status.
 */
function init() {
  playBgMusic(backgroundMusic, true);

  password.onchange = confirmPassword;
  conf_password.onkeyup = confirmPassword;

  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(this);

      let xhr = new XMLHttpRequest();

      xhr.open("POST", "/signup/attempt", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        const takenUser = document.getElementById("takenUsername");
        const ukProb = document.getElementById("unknownProblem");
        if (xhr.status === 201) {
          console.log("Successful login");
          takenUser.style.visibility = "hidden";
          ukProb.style.display = "none";
          window.location.href = "/selection/page";
        } else if (xhr.status === 200) {
          takenUser.style.visibility = "visible";
          ukProb.style.display = "none";
          console.error("Error:", xhr.statusText);
        } else if (xhr.status === 204) {
          takenUser.style.visibility = "hidden";
          ukProb.style.display = "block";
          console.error("Error:", xhr.statusText);
        }
      };

      xhr.send(JSON.stringify(Object.fromEntries(formData)));
    });
}

/**
 * Checks if the confirmation password and password matches.
 */
function confirmPassword() {
  if (password.value != conf_password.value) {
    conf_password.setCustomValidity("Passwords Do Not Match");
  } else {
    conf_password.setCustomValidity("");
  }
}
