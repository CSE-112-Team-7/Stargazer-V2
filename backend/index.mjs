 // express and cors used to handle http request, cookie parser used to generate cookies 
import express from "express"
import cors from "cors";
import cookie_parser from "cookie-parser";

// MONGO VARIABLES
import { MongoClient } from "mongodb";
const client_url = // URL where mongodb is stored
  "mongodb+srv://bahorowitz:HxfQTvBgarDEoXTE@stargazercluster.j46iehf.mongodb.net/?retryWrites=true&w=majority&appName=stargazerCluster";
const db_name = "Stargazer"; // name of database
const users_collection_name = "users"; // name of user table in database
const client = new MongoClient(client_url, { // construct a new client 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MONGODB CODE

// creating a mongoDB connection pool so that a connection between db and server can be maintained at all times
async function run() {
  try {
    await client.connect();
    console.log("SUCCESSFULLY CONNECTED TO ATLAS");
  } catch (err) {
    console.log(err.stack);
  }
}

run().catch(console.dir);

// given a username and a password, checks whether or not the user exists in users database
async function check_credentials(username, password) {
  try {
    console.log("CHECKING IF USERNAME AND PASSWORD COMBO EXISTS IN DB");
    const database = client.db(db_name);
    const collection = database.collection(users_collection_name);
    console.log("WAITING FOR RESULT FROM DB");
    const user = await collection.findOne({ 
      username: username,
      password: password,
    });
    console.log("RESULT RECIEVED");
    console.log(user);
    return user != null;
  } catch (error) {
    console.error("ERROR WHILE CHECKING USERNAME AND PASSWORD:", error);
    return false;
  }
}

// given a username, check whether the username is already in use
async function check_username(username) {
  try {
    console.log("CHECKING IF USERNAME IS ALREADY TAKEN IN DB");
    const database = client.db(db_name);
    const collection = database.collection(users_collection_name);
    console.log("WAITING FOR RESULT FROM DB");
    const user = await collection.findOne({ username: username });
    console.log("RESULT RECIEVED");
    console.log(user);
    return user != null;
  } catch (error) {
    console.error("ERROR WHILE CHECKING USERNAME", error);
    return true;
  }
}

// given a username which is not already in our database
// and a password, place the pair in our database
async function place_credentials(username, password) {
  try {
    console.log("ATTEMPTING TO ADD NEW USER TO DB");
    const database = client.db(db_name);
    const collection = database.collection(users_collection_name);
    console.log("WAITING FOR PLACEMENT IN DB TO FINISH");
    const success = await collection.insertOne({
      username: username,
      password: password,
    });
    console.log("SUCCESS STATUS: " + success);
    return success;
  } catch (error) {
    console.error("ERROR WHILE PLACING NEW USER IN DATABASE", error);
    return false;
  }
}

// PAGE DIRECTORY VARIABLES
const login_dir = "pages/login_page/";
const login_index_dir = "pages/login_index_page/";
const signup_dir = "pages/signup_page/";

// SERVER SETUP
// Set up node js and routes
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookie_parser());

app.listen(port, () => {
  console.log("stargazer listening on port " + port);
});

// GET REQUESTS GRABBING PAGE ASSETS
app.get("/login", (req, res) => {
  console.log("RECIEVED LOGIN PAGE REQUEST");
  res.sendFile(login_dir + "login.html", { root: "../source" });
});

app.get("/login_index", (req, res) => {
  console.log("RECIEVED LOGIN INDEX PAGE REQUEST");
  res.sendFile(login_index_dir + "login_index.html", { root: "../source" });
  console.log("ACTIVE COOKIES");
  console.log(req.cookies);
});

app.get("/signup", (req, res) => {
  console.log("RECIEVED SIGNUP PAGE REQUEST");
  res.sendFile(signup_dir + "signup.html", { root: "../source" });
});

// POST REQUEST ATTEMPTING TO LOG IN A USER
// async and await used to ensure database is checked before continuing
app.post("/login_attempt", async (req, res) => {
  console.log("RECIEVED LOGIN ATTEMPT!");
  const { rec_username, rec_password } = req.body; // unpack request into variables
  console.log("username attempted to login with " + rec_username);
  console.log("password attempted to login with " + rec_password);
  if (await check_credentials(rec_username, rec_password)) { // check if the credentials exist in db
    console.log("SUCCESSFUL LOGIN!"); // if they do assign cookies and return a success
    res.status(200);
    res.cookie("loggedin", "true");
    res.cookie("username", rec_username);
    res.end("LOGIN SUCCEEDED");
    console.log(res);
  } else { // if they don't assign different cookies and return in failure 
    console.log("FAILED LOGIN!");
    res.status(401);
    res.cookie("loggedin", "false");
    res.end("LOGIN FAILED");
    console.log(res);
  }
});

// POST REQUEST ATTEMPTING TO MAKE A NEW USER
app.post("/signup_attempt", async (req, res) => {
  console.log("RECIEVED SIGNUP ATTEMPT");
  const { new_username, new_password, new_password_conf } = req.body; // unpack request into variables
  console.log("username attempted to signup with " + new_username);
  console.log("password attempted to signup with " + new_password);
  console.log(
    "password confirmation attempted to signup with " + new_password_conf,
  );
  if (new_password != new_password_conf) { // make sure password and confirmation are same
    res.status(400);
    res.end("ERROR: PASSWORD VALUES ARE NOT THE SAME");
    return;
  }
  if (await check_username(new_username)) { // if username is already in database don't let user register
    res.status(200);
    res.end("SIGNUP FAILED: USERNAME IS ALREADY TAKEN");
    return;
  }
  if (await place_credentials(new_username, new_password)) { // if username and password are valid add them to database set cookies and return 
    res.status(200);
    res.cookie("loggedin", "true");
    res.cookie("username", new_username);
    res.end("SIGNUP SUCCEEDED: REGISTERED NEW USER");
    return;
  } else { // if there was some issue in the process of creating the credentials let the user know
    res.status(204);
    res.end("ERROR: UNABLE TO CREATE USER FOR UNKNOWN REASONS");
    return;
  }
});
