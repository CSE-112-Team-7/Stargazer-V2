// PAGE DIRECTORY VARIABLES

const login_dir = "pages/login_page/";
const login_page = login_dir + "login.html";
const login_js = login_dir + "login.js";
const login_css = login_dir + "login.css";

const login_index_dir = "pages/login_index_page/";
const login_index_page = login_index_dir + "login_index.html";
const login_index_js = login_dir + "login_index.js";
const login_index_css = login_dir + "login_index.css";

const signup_dir = "pages/signup_page/";
const signup_page = signup_dir + "signup.html";
const signup_js = signup_dir + "signup.js";
const signup_css = signup_dir + "signup.css";

const explanation_dir = "pages/explanation_page/";
const explanation_page = explanation_dir + "explanation.html";
const explanation_css = explanation_dir + "explanation.css";
const explanation_js = explanation_dir + "explanation.js";

const starting_dir = "pages/starting_page/";
const starting_page = starting_dir + "starting.html";
const starting_css = starting_dir + "starting.css";
const starting_js = starting_dir + "starting.js";

const selection_dir = "pages/selection_page/";
const selection_page = selection_dir + "selection.html";
const selection_css = selection_dir + "selection.css";
const selection_js = selection_dir + "selection.js";

const response_dir = "pages/response_page/";
const response_page = response_dir + "response.html";
const response_css = response_dir + "response.css";
const response_js = response_dir + "response.js";
const response_json = response_dir + "all_responses.json";

const skymap_dir = "pages/skymap_page/";
const skymap_page = skymap_dir + "skymap.html";
const skymap_background_js = skymap_dir + "Background.js";
const skymap_constellation_js = skymap_dir + "Constellation.js";
const skymap_constellation_star_js = skymap_dir + "ConstellationStar.js";
const skymap_js = skymap_dir + "skymap.js";
const skymap_css = skymap_dir + "skymap.css";
const skymap_stars_json = skymap_dir + "connected_stars_pair.json";
const skymap_constellation_json = skymap_dir + "constellation_location.json";

const thankyou_dir = "pages/thankyou_page/";
const thankyou_page = thankyou_dir + "thankyou.html";
const thankyou_css = thankyou_dir + "thankyou.css";
const thankyou_js = thankyou_dir + "thankyou.js";

// GENERAL ASSETS
const toplevel_css = "pages/toplevel.css";
const favicon_img = "assets/favicon.ico";
const constellation_dir = "assets/constellations/";
const aries_exp_img = constellation_dir + "Aries-explanation.png";
const aries_star_img = constellation_dir + "Aries-star.png";
const aries_base_img = constellation_dir + "Aries.png";
const armadillo_exp_img = constellation_dir + "ArmadilloDragon-explanation.png";
const armadillo_star_img = constellation_dir + "ArmadilloDragon-star.png";
const armadillo_base_img = constellation_dir + "ArmadilloDragon.png";
const canis_exp_img = constellation_dir + "CanisMajor-explanation.png";
const canis_star_img = constellation_dir + "CanisMajor-star.png";
const canis_base_img = constellation_dir + "CanisMajor.png";
const carina_exp_png = constellation_dir + "Carina-explanation.png";
const carina_star_img = constellation_dir + "Carina-star.png";
const carina_base_img = constellation_dir + "Carina.png";
const crux_exp_img = constellation_dir + "Crux-explanation.png";
const crux_star_img = constellation_dir + "Crux-star.png";
const crux_base_img = constellation_dir + "Crux.png";
const ophi_exp_img = constellation_dir + "Ophiuchus-explanation.png";
const ophi_star_img = constellation_dir + "Ophiuchus-star.png";
const ophi_base_img = constellation_dir + "Ophiuchus.png";
const orion_exp_img = constellation_dir + "Orion-explanation.png";
const orion_star_img = constellation_dir + "Orion-star.png";
const orion_base_img = constellation_dir + "Orion.png";
const ursa_exp_img = constellation_dir + "UrsaMajor-explanation.png";
const ursa_star_img = constellation_dir + "UrsaMajor-star.png";
const ursa_base_img = constellation_dir + "UrsaMajor.png";

const icons_dir = "assets/Icons/";
const career_img = icons_dir + "Career.png";
const daily_scope_img = icons_dir + "DailyHoroscope.png";
const health_img = icons_dir + "Health.png";
const rel_img = icons_dir + "Relationship.png";
const setting_img = icons_dir + "setting.svg";

const music_dir = "assets/music/";
const career_mp = music_dir + "careerClick.mp3";
const daily_mp = music_dir + "dailyClick.mp3";
const default_mp = music_dir + "defaultClick.mp3";
const health_mp = music_dir + "healthClick.mp3";
const rel_mp = music_dir + "relationshipClick.mp3";
const gaze_mp = music_dir + "starGazingBGMusic.mp3";

const myths_dir = "assets/myths/";
const aries_myth_img = myths_dir + "Aries-myth.jpeg";
const armadillo_myth_img = myths_dir + "ArmadilloDragon-myth.jpeg";
const canis_myth_img = myths_dir + "CanisMajor-myth.jpeg";
const carina_myth_img = myths_dir + "Carina-myth.jpeg";
const crux_myth_img = myths_dir + "Crux-myth.jpeg";
const ophi_myth_img = myths_dir + "Ophiuchus-myth.jpeg";
const orion_myth_img = myths_dir + "Orion-myth.jpeg";
const ursa_myth_img = myths_dir + "UrsaMajor-myth.jpeg";

const teller_dir = "assets/teller/";
const response_img = teller_dir + "responseTeller.png";
const thankyou_img = teller_dir + "ThankYou_teller.png";

const background_dir = "assets/background/";
const mountains_img = background_dir + "mountain-and-star.png";

const font_dir = "assets/fonts/";
const gideon_roman = font_dir + "GideonRoman-Regular.ttf";

const util_dir = "utils/";
const play_music_script = util_dir + "playBgMusic.js";
const setting_script = util_dir + "setting.js";

const routes = [
  { path: "/", file: starting_page },
  { path: "/login/page", file: login_page },
  { path: "/login/style", file: login_css },
  { path: "/login/script", file: login_js },
  { path: "/login_index/page", file: login_index_page },
  { path: "/login_index/style", file: login_index_css },
  { path: "/login_index/script", file: login_index_js },
  { path: "/signup/page", file: signup_page },
  { path: "/signup/style", file: signup_css },
  { path: "/signup/script", file: signup_js },
  { path: "/explanation/page", file: explanation_page },
  { path: "/explanation/style", file: explanation_css },
  { path: "/explanation/script", file: explanation_js },
  { path: "/starting/page", file: starting_page },
  { path: "/starting/style", file: starting_css },
  { path: "/starting/script", file: starting_js },
  { path: "/selection/page", file: selection_page },
  { path: "/selection/style", file: selection_css },
  { path: "/selection/script", file: selection_js },
  { path: "/response/page", file: response_page },
  { path: "/response/style", file: response_css },
  { path: "/response/script", file: response_js },
  { path: "/response/json", file: response_json },
  { path: "/skymap/page", file: skymap_page },
  { path: "/skymap/style", file: skymap_css },
  { path: "/skymap/script", file: skymap_js },
  { path: "/skymap/background/script", file: skymap_background_js },
  { path: "/skymap/constellation/script", file: skymap_constellation_js },
  {
    path: "/skymap/constellation_star/script",
    file: skymap_constellation_star_js,
  },
  { path: "/skymap/stars/json", file: skymap_stars_json },
  { path: "/skymap/constellation/json", file: skymap_constellation_json },
  { path: "/thankyou/page", file: thankyou_page },
  { path: "/thankyou/style", file: thankyou_css },
  { path: "/thankyou/script", file: thankyou_js },
  { path: "/assets/toplevel/style", file: toplevel_css },
  { path: "/assets/favicon/img", file: favicon_img },
  { path: "/assets/constellation/aries/exp/img", file: aries_exp_img },
  { path: "/assets/constellation/aries/star/img", file: aries_star_img },
  { path: "/assets/constellation/aries/base/img", file: aries_base_img },
  { path: "/assets/constellation/aries/myth/img", file: aries_myth_img },
  { path: "/assets/constellation/armadillo/exp/img", file: armadillo_exp_img },
  {
    path: "/assets/constellation/armadillo/star/img",
    file: armadillo_star_img,
  },
  {
    path: "/assets/constellation/armadillo/base/img",
    file: armadillo_base_img,
  },
  {
    path: "/assets/constellation/armadillo/myth/img",
    file: armadillo_myth_img,
  },
  { path: "/assets/constellation/canis/exp/img", file: canis_exp_img },
  { path: "/assets/constellation/canis/star/img", file: canis_star_img },
  { path: "/assets/constellation/canis/base/img", file: canis_base_img },
  { path: "/assets/constellation/canis/myth/img", file: canis_myth_img },
  { path: "/assets/constellation/carina/exp/img", file: carina_exp_png },
  { path: "/assets/constellation/carina/star/img", file: carina_star_img },
  { path: "/assets/constellation/carina/base/img", file: carina_base_img },
  { path: "/assets/constellation/carina/myth/img", file: carina_myth_img },
  { path: "/assets/constellation/crux/exp/img", file: crux_exp_img },
  { path: "/assets/constellation/crux/star/img", file: crux_star_img },
  { path: "/assets/constellation/crux/base/img", file: crux_base_img },
  { path: "/assets/constellation/crux/myth/img", file: crux_myth_img },
  { path: "/assets/constellation/ophi/exp/img", file: ophi_exp_img },
  { path: "/assets/constellation/ophi/star/img", file: ophi_star_img },
  { path: "/assets/constellation/ophi/base/img", file: ophi_base_img },
  { path: "/assets/constellation/ophi/myth/img", file: ophi_myth_img },
  { path: "/assets/constellation/orion/exp/img", file: orion_exp_img },
  { path: "/assets/constellation/orion/star/img", file: orion_star_img },
  { path: "/assets/constellation/orion/base/img", file: orion_base_img },
  { path: "/assets/constellation/orion/myth/img", file: orion_myth_img },
  { path: "/assets/constellation/ursa/exp/img", file: ursa_exp_img },
  { path: "/assets/constellation/ursa/star/img", file: ursa_star_img },
  { path: "/assets/constellation/ursa/base/img", file: ursa_base_img },
  { path: "/assets/constellation/ursa/myth/img", file: ursa_myth_img },
  { path: "/assets/icons/career/img", file: career_img },
  { path: "/assets/icons/daily_scope/img", file: daily_scope_img },
  { path: "/assets/icons/health/img", file: health_img },
  { path: "/assets/icons/rel/img", file: rel_img },
  { path: "/assets/icons/setting/img", file: setting_img },
  { path: "/assets/music/career/mp", file: career_mp },
  { path: "/assets/music/daily/mp", file: daily_mp },
  { path: "/assets/music/default/mp", file: default_mp },
  { path: "/assets/music/health/mp", file: health_mp },
  { path: "/assets/music/rel/mp", file: rel_mp },
  { path: "/assets/music/gaze/mp", file: gaze_mp },
  { path: "/assets/teller/response/img", file: response_img },
  { path: "/assets/teller/thankyou/img", file: thankyou_img },
  { path: "/assets/background/mountain-and-star/img", file: mountains_img },
  { path: "/assets/fonts/GideonRoman-Regular/ttf", file: gideon_roman },
  { path: "/utils/playmusic/script", file: play_music_script },
  { path: "/utils/setting/script", file: setting_script },
];

export default routes;
