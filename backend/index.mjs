// Import  express 
import express from "express";
import cors from "cors";

// MONGO VARIABLES
import { MongoClient } from 'mongodb';
const db_url = 'mongodb+srv://bahorowitz:HxfQTvBgarDEoXTE@stargazercluster.j46iehf.mongodb.net/?retryWrites=true&w=majority&appName=stargazerCluster'

// PAGE DIRECTORY VARIABLES
const login_dir = 'pages/login_page/'
const login_index_dir = 'pages/login_index_page/'
const signup_dir = 'pages/signup_page/'


const stored_username = 'username'

const stored_password = 'password'

// DB CONNECTION
async function main() {
  const client = new MongoClient(db_url)
  try {
    await client.connect()
    await listDatabases(client)
  } catch (e) {
    console.error(e)
  }
  finally {
    await client.close();
  }
}

main().catch(console.error)

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};




// SERVER SETUP
// Set up node js and routes
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));



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

app.post('/login_attempt', (req, res) => {
  console.log("RECIEVED LOGIN ATTEMPT!")
  const {rec_username, rec_password} = req.body
  console.log('username attempted to login with ' + rec_username)
  console.log('password attempted to login with ' + rec_password)
  if(rec_username == stored_username && rec_password == stored_password) {
    console.log('SUCCESSFUL LOGIN!')
    res.send('LOGIN SUCCESSFUL')
  } else {
    console.log('FAILED LOGIN!')
    res.send('LOGIN FAILED')
  }
  
})





