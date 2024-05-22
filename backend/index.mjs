// Import  express 
import express from "express";
import cors from "cors";
import cookie_parser from 'cookie-parser';


// MONGO VARIABLES
import { MongoClient } from 'mongodb';
const client_url = 'mongodb+srv://bahorowitz:HxfQTvBgarDEoXTE@stargazercluster.j46iehf.mongodb.net/?retryWrites=true&w=majority&appName=stargazerCluster'
const db_name = 'Stargazer'
const users_collection_name = 'users'
const client = new MongoClient(client_url, { useNewUrlParser: true, useUnifiedTopology: true });

// MONGODB CODE

// creating a mongoDB connection pool so that a connection between db and server can be maintained at all times
async function run() {
  try {
    await client.connect()
    console.log('SUCCESSFULLY CONNECTED TO ATLAS')
  } catch(err) {
    console.log(err.stack)
  }
}

run().catch(console.dir);






// given a username and a password, checks whether or not the user exists in users database
async function check_credentials(username, password) {
  try {
    console.log("CHECKING CREDENTIALS")
    const database = client.db(db_name)
    const collection = database.collection(users_collection_name)
    console.log('WAITING FOR RESULT FROM DB')
    const user = await collection.findOne({ username: username, password: password })
    console.log("RESULT RECIEVED")
    console.log(user)
    return user != null
  } catch(error) {
    console.error("ERROR WHILE CHECKING CREDENTIALS:", error)
    return false
  }
}

// PAGE DIRECTORY VARIABLES
const login_dir = 'pages/login_page/'
const login_index_dir = 'pages/login_index_page/'
const signup_dir = 'pages/signup_page/'


// SERVER SETUP
// Set up node js and routes
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookie_parser())



app.listen(port, () => {
  console.log('stargazer listening on port ' + port)
})


// GET REQUESTS GRABBING PAGE ASSETS
app.get('/login', (req, res) => {
  console.log('RECIEVED LOGIN PAGE REQUEST')
  res.sendFile(login_dir + 'login.html', { root: '../source'})
})


app.get('/login_index', (req, res) => {
  console.log('RECIEVED LOGIN INDEX PAGE REQUEST')
  res.sendFile(login_index_dir + 'login_index.html', {root: '../source'} )
  console.log("ACTIVE COOKIES")
  console.log(req.cookies)
})

app.get('/signup', (req, res) => {
  console.log('RECIEVED SIGNUP PAGE REQUEST')
  res.sendFile(signup_dir + 'signup.html', {root: '../source'} )
})



// POST REQUEST ATTEMPTING TO LOG IN A USER
// async and await used to ensure database is checked before continuing
app.post('/login_attempt', async (req, res) => {
  console.log("RECIEVED LOGIN ATTEMPT!")
  const {rec_username, rec_password} = req.body
  console.log('username attempted to login with ' + rec_username)
  console.log('password attempted to login with ' + rec_password)
  if (await check_credentials(rec_username, rec_password)) {
    console.log('SUCCESSFUL LOGIN!');
    res.status(200)
    res.cookie('loggedin', 'true')
    res.cookie('username', rec_username)
    res.end("LOGIN SUCCEEDED") 
  } else { 
    console.log('FAILED LOGIN!');
    res.status(401)
    res.cookie('loggedin', 'false')
    res.end('LOGIN FAILED')
  } 
})






