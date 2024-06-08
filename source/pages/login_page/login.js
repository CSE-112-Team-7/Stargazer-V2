// document.getElementById('togglePassword').addEventListener('click', function() {
//     var passwordField = document.getElementById('rec_password');
//     var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordField.setAttribute('type', type);
//     this.textContent = type === 'password' ? '👁️' : '🙈'; // Optional: Toggle icon
// });




// document.getElementById('submitButton').addEventListener('click', function(){
//     const cookies = document.cokie;
    
    
//     if (cookies == 'loggedin=true'){
//         fetch('/selection/page')
//         .then(response => {
//             if (response.ok) {
//             // If the response is successful, navigate to the new page
//             window.location.href = '/selection/page';
//             } else {
//             // Handle error if the response is not successful
//             console.error('Failed to fetch:', response.statusText);
//             // Optionally show an error message or perform other actions
//             }
//         })
//         window.location.href = "/selection/page";
//         console.log('logged in is false');
//     }else {
//         popup.style.display = 'inline-block';
//         overlay.style.display = 'inline-block';
//     }

    
// });


// document.getElementById('popupButton').addEventListener('click', function(){
//     popup.style.display = 'none';
//     overlay.style.display = 'none';
//     const username = document.getElementById('rec_username');
//     username.value = ''; // Clear the input field
//     const pass = document.getElementById('rec_password');
//     pass.value = ''; // Clear the input field
// });

// // testUser1 testPassOne