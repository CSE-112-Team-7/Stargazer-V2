import playBgMusic from "/utils/playmusic/script";

/**
 * @constant {string} iconsPath stores backend file path to the icon images
 * @constant {string} constellationsPath stores backend file path to the constellation images
 */
const iconsPath = "/assets/icons/";
const constellationsPath = "/assets/constellation/";

/**
 * Function that loads constellation and text body to the popup display.
 * @param {string} constellation constellation of the selected fortune in user history
 * @param {string} textbody text corresponding to the constellation
 */
function openPopup(constellation, textbody) {
  const displayTitle = document.getElementById("display-title");
  const displayBody = document.getElementById("display-body");
  const imageElem = document.getElementById("popup-img");

  const popup = document.getElementById("popup");
  if (popup.style.display === "flex") {
    popup.style.display = "none";
  } else {
    popup.style.display = "flex";
  }

  const starPath = getStarPath(constellation);

  if (starPath == "undefined") {
    imageElem.src = "";
    imageElem.alt = "";
  } else {
    imageElem.src = constellationsPath + starPath + "/exp/img";
    imageElem.alt = constellationsPath + starPath + "/exp/img";
  }

  displayTitle.textContent = "Constellation: " + constellation;
  displayBody.textContent = textbody;
}

/**
 * Returns the corresponding constellation title in string based on its backend format.
 * @param {string} constellation constellation of the selected fortune in user history
 */
function getStarPath(constellation) {
  switch (constellation) {
    case "Aries":
      return "aries";

    case "Armadillo Dragon":
      return "armadillo";

    case "Canis Major":
      return "canis";

    case "Carina":
      return "carina";

    case "Crux":
      return "crux";

    case "Ophiuchus":
      return "ophi";

    case "Orion":
      return "orion";

    case "Ursa Major":
      return "ursa";

    default:
      return "undefined";
  }
}

/**
 * @var {XMLHttpRequest} req GET request to server to fetch database user data
 */
var req = new XMLHttpRequest();
req.open("GET", "/horoscope/get", true);
req.setRequestHeader("Content-Type", "application/json");

/**
 * @var {boolean} loginStatus stores if the user is logged in or not
 */
let loginStatus = false;

req.onload = function () {
  if (req.status === 200) {
    // Array of JSON files
    const dbJSONArr = JSON.parse(req.response);
    const formattedJSONArr = formatJSON(dbJSONArr);
    loadCards(formattedJSONArr);

    loginStatus = true;
  } else {
    // When GET fails to fetch data
    let scrollContainter = document.getElementById("scrollable-content");
    let backButton = document.getElementById("back-button");
    let backText = document.getElementById("back-text");

    const errorMsg = document.createElement("h2");
    errorMsg.classList.add("error-msg");
    errorMsg.textContent = "please login to view your user history";

    backButton.textContent = "To Menu";
    backText.textContent = "Click here to go back to the login menu.";

    scrollContainter.appendChild(errorMsg);

    loginStatus = false;
  }
};
req.send();

/**
 * Formats the db data to match what is displayed and used by user history.
 * @param {string} dbJSONArr JSON file from the database
 */
function formatJSON(dbJSONArr) {
  const jsonList = [];

  dbJSONArr.forEach((packet) => {
    const rawDate = new Date(packet.timestamp);
    const day = rawDate.getDate();
    const month = rawDate.getMonth() + 1;

    const simpleDate = month + "/" + day;
    var dateObj = jsonList.find((e) => e.date === simpleDate);

    // if no date exists yet for this packet, make a new one!
    if (dateObj === undefined) {
      const newDate = { date: simpleDate };
      newDate[packet.catagory] = {
        constellation: packet.constellation,
        text: packet.horoscope,
      };
      jsonList.push(newDate);
    } else if (dateObj[packet.catagory] === undefined) {
      // otherwise add on to existing object ONLY IF it doesnt have an existing entry
      dateObj[packet.catagory] = {
        constellation: packet.constellation,
        text: packet.horoscope,
      };
    }
  });

  return jsonList;
}

/**
 * Creates a blank fortune button and handles when it is clicked.
 */
function getBlankButton() {
  const button = document.createElement("input");
  button.type = "button";
  button.classList.add("card-button");
  button.alt = "blank button";

  button.onclick = () => {
    const noDataTitle = "No Data Found for this category!";
    const noDataText = " (please choose a different category with an icon!)";
    openPopup(noDataTitle, noDataText);
  };

  return button;
}

/**
 * Creates a Relationship fortune button and handles when it is clicked.
 * @param {string} relationshipJSON JSON array holding database information for the Relationship fortune
 */
function getRelationshipButton(relationshipJSON) {
  if (relationshipJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "rel/img";
  button.alt = "Relationship Icon";

  button.onclick = () => {
    openPopup(relationshipJSON.constellation, relationshipJSON.text);
  };

  return button;
}

/**
 * Creates a Health fortune button and handles when it is clicked.
 * @param {string} healthJSON JSON array holding database information for the Health fortune
 */
function getHealthButton(healthJSON) {
  if (healthJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "Health/img";
  button.alt = "Health Icon";

  button.onclick = () => {
    openPopup(healthJSON.constellation, healthJSON.text);
  };

  return button;
}

/**
 * Creates a Horoscope fortune button and handles when it is clicked.
 * @param {string} horoscopeJSON JSON array holding database information for the Horoscope fortune
 */
function getHoroscopeButton(horoscopeJSON) {
  if (horoscopeJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "daily_scope/img";
  button.alt = "Horoscope Icon";

  button.onclick = () => {
    openPopup(horoscopeJSON.constellation, horoscopeJSON.text);
  };

  return button;
}

/**
 * Creates a Career fortune button and handles when it is clicked.
 * @param {string} careerJSON JSON array holding database information for the Career fortune
 */
function getCareerButton(careerJSON) {
  if (careerJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "Career/img";
  button.alt = "Career Icon";

  button.onclick = () => {
    openPopup(careerJSON.constellation, careerJSON.text);
  };

  return button;
}

/**
 * Creates fortune cards and all the fortune buttons for user's database entries on the given date.
 * @param {string} dateJSON JSON array holding the user's database information for each fortune
 */
function createDateCard(dateJSON) {
  // create the HTML element for the card itself
  const card = document.createElement("div");
  card.classList.add("card"); // set its class to 'item_card'

  // create Relationship button
  const relationshipButton = getRelationshipButton(dateJSON.RELATIONSHIP);
  const healthButton = getHealthButton(dateJSON.HEALTH);
  const careerButton = getCareerButton(dateJSON.CAREER);
  const horoscopeButton = getHoroscopeButton(dateJSON.HOROSCOPE);

  const date = document.createElement("p");
  date.textContent = dateJSON.date;

  // append card contents to card as children
  card.appendChild(date);
  card.appendChild(relationshipButton);
  card.appendChild(healthButton);
  card.appendChild(careerButton);
  card.appendChild(horoscopeButton);

  return card;
}

/**
 * Create and display the user history cards.
 * @param {string} formattedJSON JSON array holding database information formatted for the user history
 */
function loadCards(formattedJSON) {
  const cardsContainer = document.getElementById("scrollable-content");
  // for each date JSON, make a new card :D
  formattedJSON.forEach((dateJSON) => {
    const singleDateCard = createDateCard(dateJSON);
    cardsContainer.appendChild(singleDateCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });

  // set the link to the back button
  document.getElementById("back-button").addEventListener("click", () => {
    if (loginStatus == true) {
      window.location.href = "/selection/page";
    } else {
      window.location.href = "/starting/page";
    }
  });
});
