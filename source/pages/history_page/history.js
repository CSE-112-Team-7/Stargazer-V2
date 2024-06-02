  //were gonna get an array of a LOT of JSON files
  // 
  const mockJSON = [
    { date:"04/20",
        relationship:{constellation:"your mom", text:"heehee"},
        career:{constellation:"your dad", text:"he went to get milk"},
        health:{constellation:"your uncle", text:"you're getting touched"},
        horoscope:{constellation:"rusty nickle", text:"try licking"}
    },

    { date:"09/11",
        relationship:{constellation:"your mom", text:"heehee"},
        // career:{constellation:"your dad", text:"he went to get milk"},
        // health:{constellation:"your uncle", text:"you're getting touched"},
        horoscope:{constellation:"rusty nickle", text:"try licking"}
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
    });

    return button;
  }

  function getRelationshipButton(relationshipJSON){
    // DO A CHECK!!!! see if the JSON is "valid" (null or invalid otherwise). If so, then return a blank button
    if(false){
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
        console.log("loading category RELATIONSHIP: constellation:[" + relationshipJSON.constellation + "] " + relationshipJSON.text)
    });

    return button;
  }
  function getHealthButton(){
    return getBlankButton();
  }
  function getHoroscopeButton(){
    return getBlankButton();
  }
  function getCareerButton(){
    return getBlankButton();
  }


  const iconsPath = "../../assets/Icons/"

  function createDateCard(dateJSON) {
    // create the HTML element for the card itself
    const card = document.createElement("div");
    card.classList.add("card");    // set its class to 'item_card'

    // create Relationship button
    const relationshipButton = getRelationshipButton(dateJSON.relationship);
    const healthButton = getHealthButton(dateJSON.health);
    const careerButton = getCareerButton(dateJSON.career);
    const horoscopeButton = getHoroscopeButton(dateJSON.horoscope);

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

// existsCardWithSameDate(date){
//     return false;
// }

// Function to history c
function loadCards() {
    const cardsContainer = document.getElementById("scrollable-content");
    //for each date JSON, make a new card :D
    mockJSON.forEach(dateJSON => {
        const singleDateCard = createDateCard(dateJSON);
        cardsContainer.appendChild(singleDateCard);
        console.log("created new card: " + dateJSON.date)
    });
}

  document.addEventListener("DOMContentLoaded", function() {
    loadCards();
});