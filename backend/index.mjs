/**
 * this class contains all source code for the backend server and is
 * responsible for sending all assets to a client ( mainly JS/CSS/HTML files, and images)
 * it is also responsible for querying the database for, and verifying user information (username, password, horoscope data)
 * finally it is also responsible for storing user information in the database if a signup occurs, or a new horoscope is generated
 */

// express and cors used to handle http request, cookie parser used to generate cookies
import express from "express";
import cors from "cors";
import cookie_parser from "cookie-parser";

// DATABASE VARIABLES
import { MongoClient } from "mongodb";
/**
 * @constant {string} client_url stores url from which database can be accessed to add/remove/query data
 * @constant {string} db_name stores the name of the database which holds both user history and registration info
 * @constant {string} users_collection_name stores name of the collection which holds user's usernames and password info
 * @constant {string} horoscopes_collection_name stores name of the collection which holds user's horoscope information - foreign key is username
 * @constant {MongoClient} client mongo object used to make API requests to database
 */

const client_url =
  "mongodb+srv://bahorowitz:HxfQTvBgarDEoXTE@stargazercluster.j46iehf.mongodb.net/?retryWrites=true&w=majority&appName=stargazerCluster";
const db_name = "Stargazer"; // name of database
const users_collection_name = "users"; // name of user table in database
const horoscopes_collection_name = "horoscopes"; // name of horoscope table in database
const client = new MongoClient(client_url, {
  // construct a new client
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
});

/**
 * launches a connection to the database from the server
 * immediately when the server is started
 */
async function run() {
  try {
    await client.connect();
    console.log("SUCCESSFULLY CONNECTED TO ATLAS");
  } catch (err) {
    console.log(err.stack);
  }
}

run().catch(console.dir);

/**
 * checks whether a user with passed through username and password
 * has a registered stargazer account
 * @param {string} username username of user to check
 * @param {string} password password of user to check
 * @returns {boolean} true if user exists, false if not
 */
async function check_credentials(username, password) {
  try {
    console.log("CHECKING IF USERNAME AND PASSWORD COMBO EXISTS IN DB");
    const database = client.db(db_name);
    const collection = database.collection(users_collection_name);
    console.log("WAITING FOR RESULT FROM DB");
    const user = await collection
      .find({
        username: username,
        password: password,
      })
      .toArray();
    console.log("RESULT RECIEVED");
    console.log(user);

    return user.length != 0;
  } catch (error) {
    console.error("ERROR WHILE CHECKING USERNAME AND PASSWORD:", error);
    return false;
  }
}

/**
 * checks whether or not a passed in username is registered to a stargazer account
 * @param {string} username username to check existence
 * @returns {boolean} true if user exists, false otherwise
 */
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

/**
 * registers a new account in the stargazers database
 * @param {string} username username of new account
 * @param {string} password password of new account
 * @returns true if registration was successful, false if any errors occured
 */
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

/**
 * places a new horoscope in the stargazers db and links it to a registered user and a time
 * @param {string} username username of registered stargazer account to link horoscope data to
 * @param {string} catagory catagory of horoscope
 * @param {string} constellation constellation of horoscope
 * @param {string} horoscope text data of horoscope
 * @returns {boolean} true if horoscope was placed successfully, false if any error occurs
 */
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
/**
 * given a registered user returns up to twenty of the most recently placed horoscopes associated
 * to the user in a JSON array
 * @param {string} username registered user's username
 * @returns {JSON[]} array of up to 20 of the most recently placed horoscopes in stargazers assigned to user
 */
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

/**
 * @constant {string} content stores beginning of header of response packet
 * @constant {string} html_type stores ending of header of response packet when sending html file
 * @constant {string} png_type stores ending of header of response packet when sending css file
 * @constant {string} jpeg_type stores ending of header of response packet when sending jpeg file
 * @constant {string} icon_type_type stores ending of header of response packet when sending icon file
 * @constant {string} image_type stores ending of header of response packet when sending  base image
 * @constant {string} js_file_type_type stores ending of header of response packet when sending  javascript file
 * @constant {string} mp3_type_type stores ending of header of response packet when sending mp3 file
 * @constant {string} font_type stores ending of header of response packet when sending font file
 * @constant {string} json_type stores ending of header of response packet when sending json file
 * @constant {string} root_dir stores root directory where all web assets are stored
 * @constant {express} app express object used to create post/get requests
 * @constant {Integer} port port number the server is running on, if running locally always set to port 4000, if running on heroku given a random port #
 */
const content = "Content-Type";
const html_type = "text/html";
const css_type = "text/css";
const png_type = "image/png";
const jpeg_type = "image/jpeg";
const icon_type = "image/x-icon";
const image_type = "image/*";
const gif_type = "image/gif";
const js_file_type = "text/javascript";
const mp3_type = "audio/mpeg";
const font_type = "font/ttf";
const json_type = "application/json";
const svg_type = "image/svg+xml";
var root_dir = "../source";
const login_success_page = "/pages/selection_page/selection.html";
const login_fail_page = "/pages/login_fail_page/login_fail.html";
const signup_success_page = login_success_page;
const signup_fail_page = "/pages/signup_fail_page/signup_fail.html";
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
/**
 * turns on the server to listen at the specified port number
 */
app.listen(port, () => {
  console.log("stargazer listening on port " + port);
});

// get request for root page will wipe all cookies
app.get("/", (req, res) => {
  if(port != 4000) {
    root_dir = "/app/source"
  }
  res.cookie("loggedin", "false");
  res.cookie("username", "");
  res.sendFile("/pages/starting_page/starting.html", { root: root_dir });
});

/**
 * given a path, and a file from routes.json creates a get request
 * allowing a client to ping the path to get the file from the server
 */

// GET REQUESTS GRABBING PAGES AND PAGE ASSETS
routes.forEach(({ path, file }) => {
  // if port is not 4000 we are running on horoku not the app and need to add /app to the root directory
  app.get(path, (req, res) => {
    console.log("recieved request for " + file);
    if (port != 4000) {
      console.log("RUNNING OFF OF A HEROKU DEPLOYMENT");
      root_dir = "/app/source";
      console.log("UPDATED ROOT TO POINT TO " + root_dir);
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
    } else if (file.includes(".gif")) {
      content_type = gif_type;
    } else if (file.includes(".svg")) {
      content_type = svg_type;
    } else {
      console.log("ERROR, UNEXPECTED FILE TYPE");
      res.status(404).send("UNSUPPORTED FILE TYPE REQUESTED");
      return;
    }
    res.set(content, content_type);
    res.sendFile(file, { root: root_dir });
  });
});

/**
 * post request which attempts to log a user in by setting their cookies
 * must be passed in a user name and a password
 * will check if username and password exist, and if so
 * will set logged in and username cookies
 * else won't do anything
 */
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
    res.end();
    // res.sendFile(login_success_page, { root: root_dir });
  } else {
    // if they don't assign different cookies and return in failure
    console.log("FAILED LOGIN!");
    res.status(201);
    res.cookie("loggedin", "false");
    res.end();
    // res.sendFile(login_fail_page, { root: root_dir });
  }
});

/**
 * given a new stargazer's user information
 * will attempt to register them, and make sure all information is valid
 * if username already assigned to a registered account will return fail
 */
app.post("/signup/attempt", async (req, res) => {
  console.log("RECIEVED SIGNUP ATTEMPT");
  const { new_username, new_password, new_password_conf } = req.body; // unpack request into variables
  console.log("username attempted to signup with " + new_username);
  console.log("password attempted to signup with " + new_password);
  console.log(
    "password confirmation attempted to signup with " + new_password_conf
  );
  if (new_password != new_password_conf) {
    // make sure password and confirmation are same
    res.status(400);
    res.end();
    // res.sendFile(signup_fail_page, { root: root_dir });
    // res.end("ERROR: PASSWORD VALUES ARE NOT THE SAME");
    return;
  }
  if (await check_username(new_username)) {
    // if username is already in database don't let user register
    res.status(200);
    res.end();
    // res.sendFile(signup_fail_page, { root: root_dir });
    // res.end("SIGNUP FAILED: USERNAME IS ALREADY TAKEN");
    return;
  }
  if (await place_credentials(new_username, new_password)) {
    // if username and password are valid add them to database set cookies and return
    res.status(201);
    res.cookie("loggedin", "true");
    res.cookie("username", new_username);
    res.end();
    // res.sendFile(signup_success_page, { root: root_dir });
    // res.end("SIGNUP SUCCEEDED: REGISTERED NEW USER");

    return;
  } else {
    // if there was some issue in the process of creating the credentials let the user know
    res.status(204);
    res.end();
    // res.sendFile(signup_fail_page, { root: root_dir });
    // res.end("ERROR: UNABLE TO CREATE USER FOR UNKNOWN REASONS");
    return;
  }
});

/**
 * post request logging out a user by wiping cookie values
 */
app.post("/logout/attempt", (req, res) => {
  console.log("ATTEMPTING TO LOG OUT USER");
  // check if a user is currently logged in
  if (req.cookies.loggedin != "true") {
    console.log("unable to log out as no user is currently logged in");
    res.status(403).end("can't log out of a profile if you are not logged in!");
  }
  console.log("USER INPUT CORRECT, LOGGING THEM OUT");
  res.cookie("username", ""); // clear the username cookie
  res.cookie("loggedin", "false");
  res.status(200).end();
});

/**
 * post request attempting to store generated horoscope information in database
 * if horoscope was created by a guest account will not store it
 */
app.post("/horoscope/post", async (req, res) => {
  console.log("RECIEVED REQUEST TO STORE HOROSCOPE DATA IN SERVER");
  const { catagory, constellation, horoscope } = req.body;
  const loggedin = req.cookies.loggedin;
  console.log(loggedin);
  if (loggedin != "true") {
    console.log("ERROR: NO USER IS LOGGED IN SO WE CANNOT STORE USER DATA");
    res.status(422).end();
    return;
  }
  const username = req.cookies.username;
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

/**
 * get request grabbing 20 most recent horoscopes created by user from server
 * if guest account will not send anything
 */
app.get("/horoscope/get", async (req, res) => {
  console.log("RECIEVED REQUEST TO GRAB HOROSCOPE DATA FROM SERVER");
  const loggedin = req.cookies.loggedin;
  if (loggedin != true) {
    console.log("ERROR: NO USER IS LOGGED IN SO WE CANT SEND BACK USER DATA");
    res.status(422).end();
    return;
  }
  const username = req.cookies.username;
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
