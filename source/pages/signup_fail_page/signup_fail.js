


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/signup/attempt', {
            method: 'POST',
            body: JSON.stringify({}), // Add your request body here if needed
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.status + "this is the response status");

        // Check if the response status code is 400
        if (response.status === 200) {
            // Display the h1 element with id "takenPass"
            document.getElementById('takenUsername').style.display = 'block';
        }
        if (response.status === 204) {
            // Display the h1 element with id "takenPass"
            document.getElementById('uncertainProblem').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


function getCookies () {
    const cookie = document.cookie;
    const cookies = cookie.split(" ");
    // console.log(cookies + "hahahaha");    
    for (let i = 0; i < cookies.length; i++) {
        if(cookies[i] == 'loggedin=true')
        document.getElementById('takenUsername').style.display = 'none'; // Hide the h1 element
        document.getElementById('uncertainProblem').style.display = 'none'; // Hide the h1 element
        return; // User is logged in, no need to continue checking
        
    }
}




setInterval(getCookies, 100);