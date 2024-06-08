function getCookies () {
    const cookie = document.cookie;
    const cookies = cookie.split(" ");
    // console.log(cookies + "hahahaha");    
    for (let i = 0; i < cookies.length; i++) {
        if(cookies[i] == 'loggedin=true')
        document.querySelector('h1').style.display = 'none'; // Hide the h1 element
        return; // User is logged in, no need to continue checking
        
    }
}




setInterval(getCookies, 100);