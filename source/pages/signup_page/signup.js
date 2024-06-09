let password = document.getElementById("new_password");
let conf_password = document.getElementById("new_password_conf");

function confirmPassword() {
  if (password.value != conf_password.value) {
    conf_password.setCustomValidity("Passwords Do Not Match");
  } else {
    conf_password.setCustomValidity("");
  }
}

password.onchange = confirmPassword;
conf_password.onkeyup = confirmPassword;

document.getElementById("myForm").addEventListener("submit", function (event) {
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
      ukProb.style.display = "none"
      console.error("Error:", xhr.statusText);
    } else if (xhr.status === 204) {
      takenUser.style.visibility = "hidden";
      ukProb.style.display = "block";
      console.error("Error:", xhr.statusText);
    }
  };

  xhr.send(JSON.stringify(Object.fromEntries(formData)));
});
