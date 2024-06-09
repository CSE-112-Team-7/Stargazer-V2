  const iconsPath = "/assets/icons/"
  const constellationsPath = "/assets/constellation/"

  /**
   * Function that loads constellation and text body to the popup
   */
function openPopup(constellation, textbody){
  const displayTitle = document.getElementById("display-title");
  const displayBody = document.getElementById("display-body");
  const imageElem = document.getElementById("popup-img");

  const popup = document.getElementById("popup");
  if (popup.style.display === "flex") {
    popup.style.display = "none"
  }
  else {
    popup.style.display = "flex"
  }

  const starPath = getStarPath(constellation)

  if (starPath == "undefined") {
    imageElem.src = "";
    imageElem.alt = "";
  } else {
  imageElem.src = constellationsPath + starPath + "/exp/img";
  imageElem.alt = constellationsPath + starPath + "/exp/img";
  }
  
  displayTitle.textContent =  "Constellation: " + constellation;
  displayBody.textContent = textbody;
}

function getStarPath(constellation){

  switch (constellation) {
    case "Aries":
      return "aries";

    case "ArmadilloDragon":
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

    case "UrsaMajor":
      return "ursa";

    default:
      return "undefined";
  }
}

  // Send GET request to server
  var req = new XMLHttpRequest();
  req.open("GET", "/horoscope/get", true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function() {
    if (req.status === 200) {

      // Array of JSON files
      const dbJSONArr = JSON.parse(req.response);
      const formattedJSONArr = formatJSON(dbJSONArr);
      loadCards(formattedJSONArr);

      console.log(this.responseText);
    } else {
      console.log('Error:', req.statusText);
    }
  };
  req.send();

  function formatJSON(dbJSONArr){
    console.log("formatJSON() working with: ");
    console.log(dbJSONArr);
    const jsonList = [];
    
    dbJSONArr.forEach(packet => {
      const rawDate = new Date(packet.timestamp);
      const day = rawDate.getDate()
      const month = rawDate.getMonth() + 1

      const simpleDate = month + "/" + day;
      var dateObj = jsonList.find(e => e.date === simpleDate);  
      
      // if no date exists yet for this packet, make a new one!
      if(dateObj === undefined){  
        const newDate = {date:simpleDate}
        newDate[packet.catagory] = {constellation: packet.constellation, text:packet.horoscope}
        console.log("created new date card: " + newDate.date + " | " + JSON.stringify([packet.catagory]));
        jsonList.push(newDate);

      } else if(dateObj[packet.catagory] === undefined ) {  //otherwise add on to existing object ONLY IF it doesnt have an existing entry
        console.log("updated existing card: " + dateObj);
        dateObj[packet.catagory] = {constellation: packet.constellation, text:packet.horoscope}
      }

    });

    return jsonList;
  }

  function getBlankButton(){
    const button = document.createElement("input");
    button.type = "button";
    button.classList.add("card-button")
    button.alt = "blank button";

    button.onclick = (() => {
        console.log("BLANK BUTTON!!! no data found for this category")
        const noDataTitle = "No Data Found for this category!"
        const noDataText = " (please choose a different category with an icon!)"
        openPopup(noDataTitle, noDataText);
    });

    return button;
  }

  function getRelationshipButton(relationshipJSON){
    // console.log( "creating relationshipButton w/ data: " +JSON.stringify(relationshipJSON));
    // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
    if(relationshipJSON === undefined){
        return getBlankButton();
    }

    const button = document.createElement("input");
    button.type = "image";
    button.classList.add("card-button")
    button.src = iconsPath + "rel/img";
    button.alt = "Relationship Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category RELATIONSHIP: constellation:[" + relationshipJSON.constellation + "] " + relationshipJSON.text);
        openPopup(relationshipJSON.constellation, relationshipJSON.text);
    });

    return button;
  }
  
  function getHealthButton(healthJSON){
    // console.log( "creating healthButton w/ data: " +JSON.stringify(healthJSON));
    // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
    if(healthJSON === undefined){
        return getBlankButton();
    }

    const button = document.createElement("input");
    button.type = "image";
    button.classList.add("card-button")
    button.src = iconsPath + "Health/img";
    button.alt = "Health Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category HEALTH: constellation:[" + healthJSON.constellation + "] " + healthJSON.text);
        openPopup(healthJSON.constellation, healthJSON.text);
    });

    return button;
  }
  function getHoroscopeButton(horoscopeJSON){
    // console.log( "creating horoscopeButton w/ data: " +JSON.stringify(horoscopeJSON));
    // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
    if(horoscopeJSON === undefined){
        return getBlankButton();
    }

    const button = document.createElement("input");
    button.type = "image";
    button.classList.add("card-button")
    button.src = iconsPath + "daily_scope/img";
    button.alt = "Horoscope Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category HOROSCOPE: constellation:[" + horoscopeJSON.constellation + "] " + horoscopeJSON.text);
        openPopup(horoscopeJSON.constellation, horoscopeJSON.text);
    });

    return button;
  }

  function getCareerButton(careerJSON){
    // console.log( "creating careerButton w/ data: " +JSON.stringify(relationshipJSON));
    // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
    if(careerJSON === undefined){
        return getBlankButton();
    }

    const button = document.createElement("input");
    button.type = "image";
    button.classList.add("card-button")
    button.src = iconsPath + "Career/img";
    button.alt = "Career Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        console.log("loading category CAREER: constellation:[" + careerJSON.constellation + "] " + careerJSON.text);
        openPopup(careerJSON.constellation, careerJSON.text);
    });

    return button;
  }

  function createDateCard(dateJSON) {
    // create the HTML element for the card itself
    const card = document.createElement("div");
    card.classList.add("card");    // set its class to 'item_card'

    // create Relationship button
    console.log("making card for: " + JSON.stringify(dateJSON));
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
    formattedJSON.forEach(dateJSON => {
        const singleDateCard = createDateCard(dateJSON);
        cardsContainer.appendChild(singleDateCard);
        console.log("created new card: " + dateJSON.date)
    });
}

  document.addEventListener("DOMContentLoaded", function() {
    //set the link to the back button
    document.getElementById("back-button").addEventListener("click",() => {
      window.location.href = "/selection/page";
    });
});
