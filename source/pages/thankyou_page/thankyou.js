import playClickSound from "/utils/playclick/script";
import playBgMusic from "/utils/playmusic/script";

//const analyticsPageName = "thankYou";
//const analyticsStatus = 0;
let backgroundMusic;
//analyticsManager.defaultPageAnalytics(analyticsPageName, analyticsStatus);

/**
 * @property {Function} toLandingPage sends user back to landing page
 * @property {Function} init initalize name to landing page.
 */
/**
 * Directs user back to the landing page
 */
function toLandingPage() {
  playClickSound(
    document.getElementById("clickSound"),
    localStorage.getItem("questionType"),
    backgroundMusic.currentTime,
    () => (window.location.href = "../landing_page/landing.html")
  );
}

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 * Directs user back to the landing page
 */
async function init() {
  backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic);
  window.toLandingPage = toLandingPage;
}
