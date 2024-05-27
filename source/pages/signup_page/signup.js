let password = document.getElementById("new_password")
let conf_password = document.getElementById("new_password_conf");

function confirmPassword(){
  if (password.value != conf_password.value) {
    conf_password.setCustomValidity("Passwords Do Not Match");
  } else {
    conf_password.setCustomValidity('');
  }
}

password.onchange = confirmPassword;
conf_password.onkeyup = confirmPassword;