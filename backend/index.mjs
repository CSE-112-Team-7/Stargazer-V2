// Import  express 
import express from "express";
import cors from "cors";

const login_dir = 'pages/login_page/'
const login_index_dir = 'pages/login_index_page/'
const signup_dir = 'pages/signup_page/'

// Set up node js and routes
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log('stargazer listening on port ' + port)
})


// FOREIGN PAGE GET REQUESTS
app.get('/login', (req, res) => {
  console.log('RECIEVED LOGIN PAGE REQUEST')
  res.sendFile(login_dir + 'login.html', { root: '../source'})
})


app.get('/login_index', (req, res) => {
  console.log('RECIEVED LOGIN INDEX PAGE REQUEST')
  res.sendFile(login_index_dir + 'login_index.html', {root: '../source'} )
})

app.get('/signup', (req, res) => {
  console.log('RECIEVED SIGNUP PAGE REQUEST')
  res.sendFile(signup_dir + 'signup.html', {root: '../source'} )
})





