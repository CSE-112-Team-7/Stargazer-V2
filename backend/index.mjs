// express and cors used to handle http request, cookie parser used to generate cookies
import express from "express";
import cors from "cors";
import cookie_parser from "cookie-parser";

// MONGO VARIABLES
import { MongoClient } from "mongodb";
const client_url = // URL where mongodb is stored
  "mongodb+srv://bahorowitz:HxfQTvBgarDEoXTE@stargazercluster.j46iehf.mongodb.net/?retryWrites=true&w=majority&appName=stargazerCluster";
const db_name = "Stargazer"; // name of database
const users_collection_name = "users"; // name of user table in database
const horoscopes_collection_name = "horoscopes"; // name of horoscope table in database
const client = new MongoClient(client_url, {
  // construct a new client
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

async function place_horoscope(username, catagory, constellation, horoscope) {
  try {
    console.log("ATTEMPTING TO ADD NEW HOROSCOPE TO DB");
    const database = client.db(db_name);
    const collection = database.collection(horoscopes_collection_name);
    console.log("waiting for placement of horoscope in DB to finish");
    const success = await collection.insertOne({
      username: username,
      catagory: catagory,
      constellation: constellation,
      horoscope: horoscope,
      timestamp: Date(),
    });
    console.log("SUCCESS STATUS: " + success);
    return success;
  } catch (error) {
    console.error("ERROR WHILE PLACING NEW HOROSCOPE IN DATABASE", error);
    return false;
  }
}

async function grab_user_horoscopes(username) {
  try {
    console.log("ATTEMPTING TO GRAB USER " + username + " HOROSCOPE DATA");
    const user_exists = await check_username(username);
    if (!user_exists) {
      console.log("ERROR: USER DOES NOT EXIST IN DATABASE");
      return null;
    }
    const database = client.db(db_name);
    const collection = database.collection(horoscopes_collection_name);
    const horoscopes = await collection.find(username).sort({ timestamp: -1 }); // grabs the previous 20 horoscopes the user has entered, sorted by date
    return horoscopes;
  } catch (error) {
    console.error("ERROR WHILE GRABBING HOROSCOPE DATA FROM DATABASE", error);
    return null;
  }
}

// SET GET REQUEST VARIABLES
const content = "Content-Type";
const html_type = "text/html";
const css_type = "text/css";
const png_type = "image/png";
const jpeg_type = "image/jpeg";
const icon_type = "image/x-icon";
const image_type = "image/*";
const js_file_type = "text/javascript";
const mp3_type = "audio/mpeg";
const font_type = "font/ttf";
const json_type = "application/json";
var root_dir = "/source";
// SERVER SETUP
// Set up node js and routes
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookie_parser());

// routes contains a json file storing all routes and files of basic get requests
import routes from "./routes.mjs";

app.listen(port, () => {
  console.log("stargazer listening on port " + port);
});

// GET REQUESTS GRABBING PAGES AND PAGE ASSETS
routes.forEach(({ path, file }) => {
  // if port is not 4000 we are running on horoku not the app and need to add /app to the root directory
  app.get(path, (req, res) => {
    console.log("recieved request for " + file);
    if(port != 4000) {
      console.log("RUNNING OFF OF A HEROKU DEPLOYMENT")
      root_dir = "/app/source"
      console.log("UPDATED ROOT TO POINT TO " + root_dir)
    }
    // set correct content type
    let content_type;
    if (file.includes(".html")) {
      content_type = html_type;
    } else if (file.includes(".js")) {
      content_type = js_file_type;
    } else if (file.includes(".css")) {
      content_type = css_type;
    } else if (file.includes(".ico")) {
      content_type = icon_type;
    } else if (file.includes(".png")) {
      content_type = png_type;
    } else if (file.includes(".mp3")) {
      content_type = mp3_type;
    } else if (file.includes(".jpeg")) {
      content_type = jpeg_type;
    } else if (file.includes(".img")) {
      content_type = image_type;
    } else if (file.includes(".psd")) {
      content_type = image_type;
    } else if (file.includes(".ttf")) {
      content_type = font_type;
    } else if (file.includes(".json")) {
      content_type = json_type;
    } else {
      console.log("ERROR, UNEXPECTED FILE TYPE");
      res.status(404).send("UNSUPPORTED FILE TYPE REQUESTED");
      return;
    }
    res.set(content, content_type);
    res.sendFile(file, { root: root_dir });
  });
});


// POST REQUEST ATTEMPTING TO LOG IN A USER
// async and await used to ensure database is checked before continuing
app.post("/login/attempt", async (req, res) => {
  console.log("RECIEVED LOGIN ATTEMPT!");
  const { rec_username, rec_password } = req.body; // unpack request into variables
  console.log("username attempted to login with " + rec_username);
  console.log("password attempted to login with " + rec_password);
  if (await check_credentials(rec_username, rec_password)) {
    // check if the credentials exist in db
    console.log("SUCCESSFUL LOGIN!"); // if they do assign cookies and return a success
    res.status(200);
    res.cookie("loggedin", "true");
    res.cookie("username", rec_username);
    res.end("LOGIN SUCCEEDED");
    console.log(res);
  } else {
    // if they don't assign different cookies and return in failure
    console.log("FAILED LOGIN!");
    res.status(401);
    res.cookie("loggedin", "false");
    res.end("LOGIN FAILED");
    console.log(res);
  }
});

// POST REQUEST ATTEMPTING TO MAKE A NEW USER
app.post("/signup/attempt", async (req, res) => {
  console.log("RECIEVED SIGNUP ATTEMPT");
  const { new_username, new_password, new_password_conf } = req.body; // unpack request into variables
  console.log("username attempted to signup with " + new_username);
  console.log("password attempted to signup with " + new_password);
  console.log(
    "password confirmation attempted to signup with " + new_password_conf,
  );
  if (new_password != new_password_conf) {
    // make sure password and confirmation are same
    res.status(400);
    res.end("ERROR: PASSWORD VALUES ARE NOT THE SAME");
    return;
  }
  if (await check_username(new_username)) {
    // if username is already in database don't let user register
    res.status(200);
    res.end("SIGNUP FAILED: USERNAME IS ALREADY TAKEN");
    return;
  }
  if (await place_credentials(new_username, new_password)) {
    // if username and password are valid add them to database set cookies and return
    res.status(200);
    res.cookie("loggedin", "true");
    res.cookie("username", new_username);
    res.end("SIGNUP SUCCEEDED: REGISTERED NEW USER");
    return;
  } else {
    // if there was some issue in the process of creating the credentials let the user know
    res.status(204);
    res.end("ERROR: UNABLE TO CREATE USER FOR UNKNOWN REASONS");
    return;
  }
});

// POST REQUEST LOGGING OUT A USER
app.post("/logout/attempt", (req, res) => {
  console.log("ATTEMPTING TO LOG OUT USER");
  // check if a user is currently logged in
  if (req.cookie.loggedin != "true") {
    console.log("unable to log out as no user is currently logged in");
    res.status(403).end("can't log out of a profile if you are not logged in!");
  }
  console.log("USER INPUT CORRECT, LOGGING THEM OUT");
  res.clearCookie("username"); // clear the username cookie
  res.cookie("loggedin", "false");
  res.status(200).end("successfully logged out user");
});

// POST REQUEST ATTEMPTING TO STORE USER HOROSCOPE DATA
app.post("/horoscope/post", async (req, res) => {
  console.log("RECIEVED REQUEST TO STORE HOROSCOPE DATA IN SERVER");
  const { catagory, constellation, horoscope } = req.body;
  const loggedin = req.cookie.loggedin;
  if (loggedin != true) {
    console.log("ERROR: NO USER IS LOGGED IN SO WE CANNOT STORE USER DATA");
    res.status(422).end("unable to store data as user is not signed in");
    return;
  }
  const username = req.cookie.username;
  console.log("user is signed in! placing data in database");
  if (await place_horoscope(username, catagory, constellation, horoscope)) {
    console.log("SUCCEEDED!");
    res.status(200).end("successfully added new entry to horoscope collection");
    return;
  }
  console.log("FAILED!");
  res
    .status(500)
    .end("unable to process request due to an internal server error");
  return;
});

// GET REQUEST ATTEMPTING TO GRAB USER HOROSCOPE DATA
app.get("/horoscope/get", async (req, res) => {
  console.log("RECIEVED REQUEST TO GRAB HOROSCOPE DATA FROM SERVER");
  const loggedin = req.cookie.loggedin;
  if (loggedin != true) {
    console.log("ERROR: NO USER IS LOGGED IN SO WE CANT SEND BACK USER DATA");
    res.status(422).end("unable to send user data as user is not signed in");
    return;
  }
  const username = req.cookie.username;
  console.log("user is signed in! grabbing its data from database");
  user_horoscopes = await grab_user_horoscopes(username);
  if (user_horoscopes == null) {
    console.log("FAILED!");
    res
      .status(500)
      .end("unable to process request due to an internal server error");
    return;
  }
  console.log("SUCCEEDED!");
  res.json(user_horoscopes);
  res.status(200).end("SUCCESS!");
});
