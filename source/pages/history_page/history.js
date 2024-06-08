  //were gonna get an array of a LOT of JSON files
  // 


  //parse db data into formatted json

  //save formatted json into local storage

  //db response format
  //max of 20
  // min of 0
  //gets code 500 if fail
  //{username:"username", category:"", constellation: "", horoscope: "", timestamp: "timestamp" }

  const dbJSON = []
  // [
  //   {username:"buba", category:"Relationship", constellation: "Crux",  text: "flavortown", timestamp: "04/20"},
  //   {username:"buba", category:"Relationship", constellation: "Aries", text: "guguns", timestamp: "04/20"},
  //   {username:"buba", category:"Horoscope", constellation: "Orion", text: "dunba systems green", timestamp: "04/20"},
  //   {username:"buba", category:"Horoscope", constellation: "Canis Major", text: "dunba systems green", timestamp: "09/11"},
  //   {username:"buba", category:"Career", constellation: "Carina", text: "dunba systems green", timestamp: "09/11"},
  //   {username:"buba", category:"Horoscope", constellation: "Ophiuchus", text: "dunba systems green", timestamp: "01/11"},
  //   {username:"buba", category:"Career", constellation: "Armadillo Dragon", text: "dunba systems green", timestamp: "01/11"},
  // ]

  const formattedJSON = formatJSON(dbJSON);

  function formatJSON(dbJSON){
    const jsonList = []
    
    dbJSON.forEach(packet => {
      const simpleDate = packet.timestamp; //THIS IS WRONG!!! what do timestamps look like
      //TODO: properly format the timestamp into month/day
      dateObj = jsonList.find(e => e.date === simpleDate);  
      
      // if no date exists yet for this packet, make a new one!
      if(dateObj === undefined){  
        const newDate = {date:simpleDate}
        newDate[packet.category] = {constellation: packet.constellation, text:packet.text}
        jsonList.push(newDate);

      } else if(dateObj[packet.category] === undefined ) {  //otherwise add on to existing object ONLY IF it doesnt have an existing entry
        dateObj[packet.category] = {constellation: packet.constellation, text:packet.text}
      }

    });

    return jsonList;
  }

  const mockJSON = [
    { 
      date:"04/20",
      relationship:{constellation:"your mom", text:"heehee"},
      career:{constellation:"your dad", text:"he went to get milk"},
      health:{constellation:"your uncle", text:"you're getting touched"},
      horoscope:{constellation:"rusty nickle", text:"try licking"}
    },

    { date:"09/11",
      relationship:{constellation:"your..son?", text:"boo hoo"},
      // career:{constellation:"your dad", text:"he went to get milk"},
      // health:{constellation:"your uncle", text:"you're getting touched"},
      horoscope:{constellation:"chipped penny", text:"mostly zinc"}
    }

  ]

  function getBlankButton(){
    const button = document.createElement("input");
    button.type = "button";
    button.classList.add("card-button")
    // button.src = iconsPath + "Relationship.png";
    button.alt = "blank button";
    button.onclick = (() => {
        console.log("BLANK BUTTON!!! no data found for this category")
        const noDataTitle = "No Data Found for this category!"
        const noDataText = " please choose a different category with an icon!"
        updateDisplay(noDataTitle, noDataText);
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
    button.src = iconsPath + "Relationship.png";
    button.alt = "Relationship Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category RELATIONSHIP: constellation:[" + relationshipJSON.constellation + "] " + relationshipJSON.text);
        updateDisplay(relationshipJSON.constellation, relationshipJSON.text);
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
    button.src = iconsPath + "Health.png";
    button.alt = "Health Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category HEALTH: constellation:[" + healthJSON.constellation + "] " + healthJSON.text);
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
    button.src = iconsPath + "DailyHoroscope.png";
    button.alt = "Horoscope Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category HOROSCOPE: constellation:[" + horoscopeJSON.constellation + "] " + horoscopeJSON.text);
        updateDisplay(horoscopeJSON.constellation, horoscopeJSON.text);
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
    button.src = iconsPath + "Career.png";
    button.alt = "Career Icon";

    button.onclick = (() => {
        // HERE we store the text for the specific category
        /**
         * we want to load the json.category.constellation and json.category.text
         * into the place where we display the generated ones
         */
        
        console.log("loading category CAREER: constellation:[" + careerJSON.constellation + "] " + careerJSON.text);
        updateDisplay(careerJSON.constellation, careerJSON.text);
    });

    return button;
  }
  

  /**
   * Function that loads constellation and text body to the right column display
   * 
   * TODO: needs to load image
   * use img = src + constellation + "-response.png" or something???
   */
  function updateDisplay(constellation, textbody){
    const displayTitle = document.getElementById("display-title");
    const displayBody = document.getElementById("display-body");
    const imageElem = document.getElementById("popup-img");

    const popup = document.getElementById("popup");

    if(popup.style.display === "block"){
      popup.style.display = "none"
    }
    else {
      popup.style.display = "block"
    }
    imageElem.src = constellationsPath + constellation.replace(' ', '') + "-explanation.png";
    imageElem.alt = constellationsPath + constellation.replace(' ', '') + "-explanation.png";
    


    displayTitle.textContent =  "Constellation: " + constellation;
    displayBody.textContent = textbody;

  }


  const iconsPath = "../../assets/Icons/"
  const constellationsPath = "../../assets/constellations/"

  function createDateCard(dateJSON) {
    // create the HTML element for the card itself
    const card = document.createElement("div");
    card.classList.add("card");    // set its class to 'item_card'

    // create Relationship button
    console.log(JSON.stringify(dateJSON));
    const relationshipButton = getRelationshipButton(dateJSON.Relationship);
    const healthButton = getHealthButton(dateJSON.Health);
    const careerButton = getCareerButton(dateJSON.Career);
    const horoscopeButton = getHoroscopeButton(dateJSON.Horoscope);

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


// Function to history c
function loadCards() {
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

    loadCards();
});
