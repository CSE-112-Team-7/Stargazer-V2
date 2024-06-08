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

document.getElementById('myForm').addEventListener('submit', function(event){
  event.preventDefault();


  

  let formData = new FormData(this);
  console.log(formData);

  let xhr = new XMLHttpRequest();

  xhr.open('POST', '/signup/attempt', true);
  xhr.setRequestHeader("Content-Type", 'application/json');

  xhr.onload = function () {
      if(xhr.status === 201){
          console.log("Successful login");
          const errorMsg = document.getElementById('takenUsername');
          errorMsg.style.display = 'none';
          const ukProb = document.getElementById('unknownProblem');
          ukProb.style.display = 'none';
          window.location.href = "/selection/page";
      } else if(xhr.status === 200){
          const takenUser = document.getElementById('takenUsername');
          takenUser.style.display = 'block';
          console.error("Error:", xhr.statusText);
      }else if(xhr.status === 204){
        const ukProb = document.getElementById('unknownProblem');
        ukProb.style.display = 'block';
        console.error("Error:", xhr.statusText);
    }
  }

  xhr.onerror = function () {
      console.error('Network Error');
  }

  xhr.send(JSON.stringify(Object.fromEntries(formData)));

  
});
  