import playBgMusic from "/utils/playmusic/script";

const iconsPath = "/assets/icons/";
const constellationsPath = "/assets/constellation/";

/**
 * Function that loads constellation and text body to the popup
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

// Send GET request to server to fetch DB user data
var req = new XMLHttpRequest();
req.open("GET", "/horoscope/get", true);
req.setRequestHeader("Content-Type", "application/json");

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
      //otherwise add on to existing object ONLY IF it doesnt have an existing entry
      dateObj[packet.catagory] = {
        constellation: packet.constellation,
        text: packet.horoscope,
      };
    }
  });

  return jsonList;
}

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

function getRelationshipButton(relationshipJSON) {
  // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
  if (relationshipJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "rel/img";
  button.alt = "Relationship Icon";

  button.onclick = () => {
    // HERE we store the text for the specific category
    /**
     * we want to load the json.category.constellation and json.category.text
     * into the place where we display the generated ones
     */

    openPopup(relationshipJSON.constellation, relationshipJSON.text);
  };

  return button;
}

function getHealthButton(healthJSON) {
  // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
  if (healthJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "Health/img";
  button.alt = "Health Icon";

  button.onclick = () => {
    // HERE we store the text for the specific category
    /**
     * we want to load the json.category.constellation and json.category.text
     * into the place where we display the generated ones
     */

    openPopup(healthJSON.constellation, healthJSON.text);
  };

  return button;
}
function getHoroscopeButton(horoscopeJSON) {
  // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
  if (horoscopeJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "daily_scope/img";
  button.alt = "Horoscope Icon";

  button.onclick = () => {
    // HERE we store the text for the specific category
    /**
     * we want to load the json.category.constellation and json.category.text
     * into the place where we display the generated ones
     */

    openPopup(horoscopeJSON.constellation, horoscopeJSON.text);
  };

  return button;
}

function getCareerButton(careerJSON) {
  // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
  if (careerJSON === undefined) {
    return getBlankButton();
  }

  const button = document.createElement("input");
  button.type = "image";
  button.classList.add("card-button");
  button.src = iconsPath + "Career/img";
  button.alt = "Career Icon";

  button.onclick = () => {
    // HERE we store the text for the specific category
    openPopup(careerJSON.constellation, careerJSON.text);
  };

  return button;
}

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

// Function to history card
function loadCards(formattedJSON) {
  const cardsContainer = document.getElementById("scrollable-content");
  //for each date JSON, make a new card :D
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

  //set the link to the back button
  document.getElementById("back-button").addEventListener("click", () => {
    if (loginStatus == true) {
      window.location.href = "/selection/page";
    } else {
      window.location.href = "/starting/page";
    }
  });
});
