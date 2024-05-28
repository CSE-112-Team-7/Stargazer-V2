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

const login_dir = "pages/login_page/"
const login_page = login_dir + "login.html";
const login_js = login_dir + "login.js"
const login_css = login_dir + "login.css"

const login_index_dir = "pages/login_index_page/"
const login_index_page = login_index_dir + "login_index.html";
const login_index_js = login_dir + "login_index.js"
const login_index_css = login_dir + "login_index.css"

const signup_dir = "pages/signup_page/"
const signup_page = signup_dir + "signup.html";
const signup_js = signup_dir + "signup.js"
const signup_css = signup_dir + "signup.css"

const explanation_dir = "pages/explanation_page/"
const explanation_page = explanation_dir + "explanation.html"
const explanation_css = explanation_dir + "explanation.css"
const explanation_js = explanation_dir + "explanation.js"

const landing_dir = "pages/landing_page/"
const landing_page = landing_dir + "landing.html"
const landing_css = landing_dir + "landing.css"
const landing_js = landing_dir + "landing.js"

const response_dir = "pages/response_page/"
const response_page = response_dir + "response.html"
const response_css = response_dir + "response.css"
const response_js = response_dir + "response.js"

const skymap_dir = "pages/skymap_page/"
const skymap_page = skymap_dir + "skymap.html"
const skymap_background_js = skymap_dir + "Background.js"
const skymap_constellation_js = skymap_dir + "Constellation.js"
const skymap_constellation_star_js = skymap_dir + "ConstellationStar.js"
const skymap_js = skymap_dir + "skymap.js"
const skymap_css = skymap_dir + "skymap.css"

const thankyou_dir = "pages/thankyou_page/"
const thankyou_page =  thankyou_dir + "thankyou.html"
const thankyou_css = thankyou_dir + "thankyou.css"
const thankyou_js = thankyou_dir + "thankyou.js"

// GENERAL ASSETS
const toplevel_css = "pages/toplevel.css"
const shootingstars_css = "pages/shootingStars.css"
const shootingstars_js = "pages/shootingStar.js"
const favicon_img = "assets/favicon.ico"
const background_img = "assets/background/PreviewMap.png"
const teller_img = "assets/background/Teller-shack-background.png"
const constellation_dir = "assets/constellations/"
const aries_exp_img = constellation_dir + "Aries-explanation.png"
const aries_star_img = constellation_dir + "Aries-star.png"
const aries_base_img = constellation_dir + "Aries.png"
const armadillo_exp_img = constellation_dir + "ArmadilloDragon-explanation.png"
const armadillo_star_img = constellation_dir + "ArmadilloDragon-star.png"
const armadillo_base_img = constellation_dir + "ArmadilloDragon.png"
const canis_exp_img = constellation_dir + "CanisMajor-explanation.png"
const canis_star_img = constellation_dir + "CanisMajor-star.png"
const canis_base_img = constellation_dir + "CanisMajor.png"
const carina_exp_png = constellation_dir + "Carina-explanation.png"
const carina_star_img = constellation_dir + "Carina-star.png"
const carina_base_img = constellation_dir + "Carina.png"
const crux_exp_img = constellation_dir + "Crux-explanation.png"
const crux_star_img = constellation_dir + "Crux-star.png"
const crux_base_img = constellation_dir + "Crux.png"
const ophi_exp_img = constellation_dir + "Ophiuchus-explanation.png"
const ophi_star_img = constellation_dir + "Ophiuchus-star.png"
const ophi_base_img = constellation_dir + "Ophiuchus.png"
const orion_exp_img = constellation_dir + "Orion-explanation.png"
const orion_star_img = constellation_dir + "Orion-star.png"
const orion_base_img = constellation_dir + "Orion.png"
const ursa_exp_img = constellation_dir + "UrsaMajor-explanation.png"
const ursa_star_img = constellation_dir + "UrsaMajor-star.png"
const ursa_base_img = constellation_dir + "UrsaMajor.png"

const icons_dir = "assets/Icons"
const career_img = icons_dir + "Career.png"
const daily_scope_img = icons_dir + "DailyHoroscope.png"
const health_img = "Health.png"
const rel_img = "Relationship.png"

const music_dir = "assets/music/"
const career_mp = music_dir + "careerClick.mp3"
const daily_mp = music_dir + "dailyClick.mp3"
const default_mp = music_dir + "defaultClick.mp3"
const health_mp = music_dir + "healthClick.mp3"
const rel_mp = music_dir + "relationshipClick.mp3"
const gaze_mp = music_dir + "starGazingBGMusic.mp3"

const myths_dir = "assets/myths"
const aries_myth_img = myths_dir + "Aries-myth.jpeg"
const armadillo_myth_img = myths_dir + "ArmadilloDragon-myth.jpeg"
const canis_myth_img = myths_dir + "CanisMajor-myth.jpeg"
const carina_myth_img = myths_dir + "Carina-myth.jpeg"
const crux_myth_img = myths_dir + "Crux-myth.jpeg"
const ophi_myth_img = myths_dir + "Ophiuchus-myth.jpeg"
const orion_myth_img = myths_dir + "Orion-myth.jpeg"
const ursa_myth_img = myths_dir + "UrsaMajor-myth.jpeg"

const sky_dir = "assets/skymap"
const gaze_asset_img = sky_dir + "Stargazer-asset.img"
const gaze_background_img = sky_dir + "Stargazer-background.png"
const gaze_background_psd = sky_dir + "Stargazer-background.psd"
const gaze_stars_img = sky_dir + "Stargazer-fillerStars.png"

const teller_dir = "assets/teller/"
const arm_left_img = teller_dir + "armadillo-claw-left.png"
const arm_right_img = teller_dir + "armadillo-claw-right.png"
const ball_img = teller_dir + "CrystalBall.png"
const fortune_img = teller_dir + "FortuneTeller.png"
const response_img = teller_dir + "responseTeller.png"
const thankyou_img = teller_dir +"ThankYou_teller.png"

const util_dir = "utils/"
const play_music_script = util_dir + "playBgMusic.js"
const play_clicksound_script = util_dir + "playClickSound.js"
const root_dir = "../source"




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

// GET REQUESTS GRABBING PAGES AND PAGE ASSETS

// TOPLEVEL STYLE SHEET

// MAIN PAGE
app.get("/login/page", (req, res) => {
  console.log("RECIEVED LOGIN PAGE REQUEST");
  res.sendFile(login_page, { root: root_dir });
});

// PAGE ASSETS
app.get("/login/style", (req, res) => {
  console.log("RECIEVED LOGIN STYLESHEET REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(login_css, { root: root_dir })
})

app.get("/login/script", (req,res) => {
  console.log("RECIEVED LOGIN SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(login_js, { root: root_dir })
})

// MAIN PAGE
app.get("/login_index/page", (req, res) => {
  console.log("RECIEVED LOGIN INDEX PAGE REQUEST");
  res.sendFile(login_index_page, { root: root_dir });
  console.log("ACTIVE COOKIES");
  console.log(req.cookies);
});


// PAGE ASSETS
app.get("/login_index/style", (req, res) => {
  console.log("RECIEVED LOGIN INDEX STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(login_index_css, { root: root_dir })
})

app.get("/login_index/script", (req, res) => {
  console.log("RECIEVED LOGIN INDEX SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(login_index_js, { root: root_dir })
})

// MAIN PAGE
app.get("/signup/page", (req, res) => {
  console.log("RECIEVED SIGNUP PAGE REQUEST");
  res.sendFile(signup_page, { root: root_dir });
});

// PAGE ASSETS
app.get("/signup/style", (req, res) => {
  console.log("RECIEVED SIGNUP STYLE REQUEST");
  res.set('Content-Type', 'text/css')
  res.sendFile(signup_css, { root: root_dir })
})

app.get("/signup/script", (req, res) => {
  console.log("RECIEVED SIGNUP SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(signup_js, { root: root_dir })
})

// MAIN PAGE
app.get("/explanation/page", (req,res) => {
  console.log("RECIEVED EXPLANATION PAGE REQUEST")
  res.sendFile(explanation_page, { root: root_dir })
})


// PAGE ASSETS
app.get("/explanation/style", (req, res) => {
  console.log("RECIEVED EXPLANATION STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(explanation_css, { root: root_dir })
})

app.get("/explanation/script", (req, res) => {
  console.log("RECIEVED EXPLANATION SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(explanation_js, { root: root_dir })
})

// MAIN PAGE
app.get("/landing/page", (req, res) => {
  console.log("RECIEVED LANDING PAGE REQUEST")
  res.sendFile(landing_page, { root: root_dir })
})

// PAGE ASSETS
app.get("/landing/style", (req, res) => {
  console.log("RECIEVED LANDING STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(landing_css, { root: root_dir })
})

app.get("/landing/script", (req, res) => {
  console.log("RECIEVED LANDING SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(landing_js, { root: root_dir })
})

// MAIN PAGE
app.get('/response/page', (req, res) => {
  console.log("RECIEVED RESPONSE PAGE REQUEST")
  res.sendFile(response_page, { root: root_dir })
})

// PAGE ASSETS
app.get("/response/style", (req, res) => {
  console.log("RECIEVED RESPONSE STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(response_css, { root: root_dir})
})

app.get("/response/script", (req, res) => {
  console.log("RECIEVED RESPONSE SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(response_js, { root: root_dir})
})

// MAIN PAGE
app.get('/skymap/page', (req, res) => {
  console.log("RECIEVED SKYMAP PAGE REQUEST")
  res.sendFile(skymap_page, { root: root_dir })
})

// PAGE ASSETS
app.get('/skymap/style', (req, res) => {
  console.log("RECIEVED SKYMAP STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(skymap_css, { root: root_dir })
})

app.get('/skymap/script', (req, res) => {
  console.log("RECIEVED SKYMAP SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(skymap_js, { root: root_dir })
})

app.get('/skymap/background/script', (req, res) => {
  console.log("RECIEVED SKYMAP BACKGROUND SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(skymap_background_js, { root: root_dir })
})

app.get('/skymap/constellation/script', (req, res) => {
  console.log("RECIEVED SKYMAP CONSTELLATION SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(skymap_constellation_js, { root: root_dir } )
})

app.get('/skymap/constellation_star/script', (req, res) => {
  console.log("RECIEVED SKYMAP CONSTELLATION STAR SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(skymap_constellation_star_js, { root: root_dir })
})


// MAIN PAGE
app.get('/thankyou/page', (req, res) => {
  console.log("RECIEVED THANK YOU PAGE REQUEST")
  res.sendFile(thankyou_page, { root: root_dir })
})

// PAGE ASSETS
app.get('/thankyou/style', (req, res) => {
  console.log("RECIEVED THANK YOU STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(thankyou_css, { root: root_dir })
})

app.get('thankyou/script', (req, res) => {
  console.log("RECIEVED THANK YOU SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(thankyou_js, { root: root_dir })
})

// GENERAL ASSETS
app.get('/assets/toplevel/style', (req, res) => {
  console.log("RECIEVED TOP LEVEL STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(toplevel_css, { root: root_dir})
})

app.get('/assets/favicon/img', (req, res) => {
  console.log("RECIEVED FAVICON IMAGE REQUEST")
  res.set('Content-Type', 'image/x-icon')
  res.sendFile(favicon_img, { root: root_dir })
})

app.get('/assets/shootingstars/style', (req, res) => {
  console.log("RECIEVED SHOOTING STARS STYLE REQUEST")
  res.set('Content-Type', 'text/css')
  res.sendFile(shootingstars_css, { root: root_dir })
})

app.get('/assets/shootingstars/script', (req, res) => {
  console.log("RECIEVED SHOOTING STARS SCRIPT REQUEST")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(shootingstars_js, { root: root_dir })
})

// BACKGROUND IMAGES
app.get('/assets/background/preview/img', (req, res) => {
  console.log("RECIEVED PREVIEW BACKGROUND IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(background_img, { root: root_dir })
})

app.get('/assets/background/teller/img', (req, res) => {
  console.log("RECIEVED TELLER BACKGROUND IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(teller_img, { root: root_dir })
})

// CONSTELLATION IMAGES

// ARIES:
app.get('/assets/constellation/aries/exp/img', (req, res) => {
  console.log("RECIEVED ARIES EXP IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(aries_exp_img, { root: root_dir })
})

app.get('/assets/constellation/aries/star/img', (req, res) => {
  console.log("RECIEVED ARIES STAR IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(aries_star_img, { root: root_dir })
})

app.get('/assets/constellation/aries/base/img', (req, res) => {
  console.log("RECIEVED ARIES BASE IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(aries_base_img, { root: root_dir })
})

app.get('/assets/constellation.aries/myth/img', (req, res) => {
  console.log("RECIEVED ARIES MYTH IMAGE REQUEST")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(aries_myth_img, { root: root_dir })
})

//ARMADILLO:
app.get('/assets/constellation/armadillo/exp/img', (req, res) => {
  console.log("RECIEVED ARMADILLO EXP IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(armadillo_exp_img, { root: root_dir })
})

app.get('/assets/constellation/armadillo/star/img', (req, res) => {
  console.log("RECIEVED ARMADILLO STAR IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(armadillo_star_img, { root: root_dir })
})

app.get('/assets/constellation/armadillo/base/img', (req, res) => {
  console.log("RECIEVED ARMADILLO BASE IMAGE REQUEST")
  res.set('Content-Type', 'image/png')
  res.sendFile(armadillo_base_img, { root: root_dir })
})

app.get('/assets/constellation/armadillo/myth/img', (req, res) => {
  console.log("RECIEVED ARMADILLO MYTH IMAGE REQUEST")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(armadillo_myth_img, { root: root_dir })
})

//CANIS:
app.get('/assets/constellation/canis/exp/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CANIS EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(canis_exp_img, { root: root_dir })
})

app.get('/assets/constellation/canis/base/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CANIS BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(canis_base_img, { root: root_dir })
})

app.get('/assets/constellation/canis/star/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CANIS STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(canis_star_img, { root: root_dir })
})

app.get('/assets/constellation.canis/myth/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CANIS MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(canis_myth_img, { root: root_dir })
})

// CARINA:
app.get('/assets/constellation/carina/exp/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CARINA EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(carina_exp_png, { root: root_dir })
})

app.get('/assets/constellation/carina/star/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CARINA STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(carina_star_img, { root: root_dir })
})


app.get('/assets/constellation/carina/base/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CARINA BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(carina_base_img, { root: root_dir })
})

app.get('/assets/constellation/carina/myth/img' , (req, res) => {
  console.log("RECIEVED REQUEST FOR CARINA MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(carina_myth_img, { root: root_dir})
})

//CRUX: 
app.get('/assets/constellation/crux/exp/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CRUX EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(crux_exp_img, { root: root_dir })
})

app.get('/assets/constellation/crux/star/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CRUX STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(crux_star_img, { root: root_dir })
})

app.get('/assets/constellation/crux/base/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CRUX BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(crux_base_img, { root: root_dir})
})

app.get('/assets/constellation/crux/myth/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CRUX MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(crux_myth_img, { root: root_dir })
})

//OPHI:
app.get('/assets/constellation/ophi/exp/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR OPHI EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ophi_exp_img, { root: root_dir })
})

app.get('/assets/constellation/ophi/star/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR OPHI STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ophi_star_img, { root: root_dir })
})

app.get('/assets/constellation/ophi/base/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR OPHI BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ophi_base_img, { root: root_dir })
})

app.get('/assets/constellation/ophi/myth/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR OPHI MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(ophi_myth_img, { root: root_dir })
})

//ORION:
app.get('/assets/constellation/orion/exp/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR ORION EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(orion_exp_img, { root: root_dir })
})

app.get('/assets/constellation/orion/star/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR ORION STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(orion_star_img, { root: root_dir })
})

app.get('/assets/constellation/orion/base/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR ORION BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(orion_base_img, { root: root_dir })
})

app.get('/assets/constellation/orion/myth/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR ORION MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(orion_myth_img, { root: root_dir })
})

//URSA:
app.get('/assets/constellation/ursa/exp/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR URSA EXP IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ursa_exp_img, { root: root_dir })
})

app.get('/assets/constellation/ursa/star/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR URSA STAR IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ursa_star_img)
})

app.get('/assets/constellation/ursa/base/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR URSA BASE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ursa_base_img, { root: root_dir })
})

app.get('/assets/constellation/ursa/myth/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR URSA MYTH IMAGE")
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(ursa_myth_img, { root: root_dir })
})

//ICON IMAGES

// CAREER ICON
app.get('/assets/icons/career/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR CAREER ICON")
  res.set('Content-Type', 'image/png')
  res.sendFile(career_img, { root: root_dir })
})

// DAILY HOROSCOPE ICON
app.get('/assets/icons/daily_scope/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR DAILY HOROSCOPE ICON")
  res.set('Content-Type', 'image/png')
  res.sendFile(daily_scope_img, { root: root_dir })
})

// HEALTH ICON 
app.get('/assets/icons/health/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR HEALTH ICON")
  res.set('Content-Type', 'image/png')
  res.sendFile(health_img, { root: root_dir })
})

// RELATIONSHIP ICON
app.get('/assets/icons/rel/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR RELATIONSHIP ICON")
  res.set('Content-Type', 'image/png')
  res.sendFile(rel_img)
})

// MUSIC ASSETS

// CAREER CLICK SOUND
app.get('/assets/music/career/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR CAREER SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(career_mp, { root: root_dir })
})

// DAILY HOROSCOPE CLICK SOUND
app.get('/assets/music/daily/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR DAILY HOROSCOPE SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(daily_mp, { root: root_dir })
})

// DEFAULT CLICK SOUND
app.get('/assets/music/default/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR DEFAULT SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(default_mp, { root: root_dir })
})

// HEALTH CLICK SOUND
app.get('/assets/music/health/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR HEALTH SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(health_mp, { root: root_dir })
})

// RELATIONSHIP CLICK SOUND
app.get('/assets/music/rel/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR RELATIONSHIP SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(rel_mp, { root: root_dir })
})

// GAZE CLICK SOUND
app.get('/assets/music/gaze/mp', (req, res) => {
  console.log("RECIEVED REQUEST FOR GAZE SOUND")
  res.set('Content-Type', 'audio/mpeg')
  res.sendFile(gaze_mp, { root: root_dir })
})


// SKYMAP ASSETS:

// GAZE ASSET IMAGE
app.get('/assets/skymap/gaze_asset/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR GAZE ASSET IMAGE")
  res.set('Content-Type', 'image/*')
  res.sendFile(gaze_asset_img, { root: root_dir })
})

// GAZE BACKGROUND IMAGE
app.get('/assets/skymap/gaze_background/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR GAZE BACKGROUND IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(gaze_background_img, { root: root_dir })
})

// GAZE BACKGROUND PSD
app.get('/assets/skymap/gaze_background/psd', (req, res) => {
  console.log("RECIEVED REQUEST FOR GAZE BACKGROUND PSD")
  res.set('Content-Type', 'image/vnd.adobe.photoshop')
  res.sendFile(gaze_background_psd, { root: root_dir })
})

// GAZE STARS IMAGE
app.get('/assets/skymap/gaze_stars/img', (req, res) => {
  console.log("RECIEVED REQUEST FOR GAZE STARS IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(gaze_stars_img, { root: root_dir })
})

// TELLER ASSETS:

// LEFT ARM IMAGE
app.get('/assets/teller/arms/left/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR LEFT ARM IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(arm_left_img, { root: root_dir })
})

// RIGHT ARM IMAGE
app.get('/assets/teller/arms/right/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR RIGHT ARM IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(arm_right_img, { root: root_dir })
})

// CRYSTAL BALL IMAGE
app.get('/assets/teller/ball/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR CRYSTAL BALL IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(ball_img, { root: root_dir })
})

// FORTUNE TELLER IMAGE
app.get('/assets/teller/fortune/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR FORTUNE TELLER IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(fortune_img, { root: root_dir })
})

// TELLER RESPONSE IMAGE 
app.get('/assets/teller/response/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR TELLER RESPONSE IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(response_img, { root: root_dir })
})

// TELLER THANK YOU IMAGE
app.get('/assets/teller/thankyou/img', (req, res) => {
  console.log("RECIEVED A REQUEST FOR TELLER THANK YOU IMAGE")
  res.set('Content-Type', 'image/png')
  res.sendFile(thankyou_img, { root: root_dir })
})

// UTIL ASSETS:

app.get('/assets/utils/playclick/script', (req, res) => {
  console.log("RECIEVED A REQUEST FOR CLICKSOUND SCRIPT")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(play_clicksound_script, { root: root_dir })

})

app.get('/assets/utils/playmusic/script', (req, res) => {
  console.log("RECIEVED A REQUEST FOR PLAY MUSIC SCRIPT")
  res.set('Content-Type', 'text/javascript')
  res.sendFile(play_music_script, { root: root_dir })

})


// POST REQUEST ATTEMPTING TO LOG IN A USER
// async and await used to ensure database is checked before continuing
app.post("/login/attempt", async (req, res) => {
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
app.post("/signup/attempt", async (req, res) => {
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
