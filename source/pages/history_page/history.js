  //were gonna get an array of a LOT of JSON files
  // 
  const userHistoryJSON = [  
    {
        date:"04/20",   // this will have to the millisecond timestamps
        category: "relationship",
        constellation: "your mom",
        text: "haha"
    },

    {
        date:"04/20",   // this will have to the millisecond timestamps
        category: "health",
        constellation: "coughing baby",
        text: "ew yuck"
    },

    {
        date:"06/09",   // this will have to the millisecond timestamps
        category: "relationship",
        constellation: "your dad",
        text: "ahah"
    },

    {
        date:"06/09",   // this will have to the millisecond timestamps
        category: "health",
        constellation: "ash baby",
        text: "AAAAAAAAAAAAAAAA"
    }

    //and we get then a billion more of these. take the most recent ones per category 
    // and assign them to the correct card?

    //the names of the actual components are not correct but whatever we'll figure that out later
];

  const iconsPath = "../../assets/Icons/"

  function createDateCard(item) {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item_card");

    const img = document.createElement("img");
    img.src = iconsPath + "Career.png";
    img.alt = "Career Icon";

    // const titleAndDescription = document.createElement("div");
    // titleAndDescription.classList.add("title_and_description");

    // const title = document.createElement("div");
    // title.classList.add("item_title");
    // title.textContent = `${item.title} ${item.price}`;

    const description = document.createElement("p");
    description.classList.add("card");
    description.textContent = item.date;

    // titleAndDescription.appendChild(title);
    // titleAndDescription.appendChild(description);

    itemCard.appendChild(img);
    // itemCard.appendChild(titleAndDescription);
    itemCard.appendChild(description);


    return itemCard;
}

// existsCardWithSameDate(date){
//     return false;
// }

// Function to history c
function loadCards() {
    const cardsContainer = document.getElementById("scrollable-content");
    userHistoryJSON.forEach(item => {
        const date = item.date;
        //if card with this date does not exist \
        const matchingDateCard = cardsContainer.lastChild;
        if( matchingDateCard == null || date != matchingDateCard.textContent){ // || existsCardWithSameDate(date)
            console.log(date + " not found! creating new card");
            const singleDateCard = createDateCard(item);
            cardsContainer.appendChild(singleDateCard);
        } else {
            console.log(date + " already exists! updating...");
            //otherwise, grab the existing card (with that date) and update the info for that card
            // ONLY if the data at that spot is null
            // this is because im assuming the data comes sorted by most recent, therefore we dont wanna overwrite anything
            
        }

    });
    // const singleDateCard = createDateCard();
    // cardsContainer.appendChild(singleDateCard);
}

  document.addEventListener("DOMContentLoaded", function() {
    loadCards();
});