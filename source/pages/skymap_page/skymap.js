import { Background } from "/skymap/background/script";
import { Constellation } from "/skymap/constellation/script";
import playBgMusic from "/utils/playmusic/script";

const debug = false;

const constellationList = [
  {
    name: "Aries",
    imageLink: "/assets/constellation/aries/base/img",
  },
  {
    name: "Canis Major",
    imageLink: "/assets/constellation/canis/base/img",
  },
  {
    name: "Crux",
    imageLink: "/assets/constellation/crux/base/img",
  },
  {
    name: "Orion",
    imageLink: "/assets/constellation/orion/base/img",
  },
  {
    name: "Armadillo Dragon",
    imageLink: "/assets/constellation/armadillo/base/img",
  },
  {
    name: "Carina",
    imageLink: "/assets/constellation/carina/base/img",
  },
  {
    name: "Ophiuchus",
    imageLink: "/assets/constellation/ophi/base/img",
  },
  {
    name: "Ursa Major",
    imageLink: "/assets/constellation/ursa/base/img",
  },
];

const backgroundMusic = document.getElementById("background-music");
let cameraOffset;
let constellation_arr;

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 * @Property {Function} Starts the program, all function calls trace back here
 */
async function init() {
  playBgMusic(backgroundMusic, true);

  const { cloc, connect } = await loadJsonData();
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Create background object
  let sky_background = new Background(ctx, ratio, canvas.width, canvas.height);
  cameraOffset = setCanvasPanning(canvas, sky_background);
  // Create an array of constellation from json file data
  constellation_arr = Object.keys(cloc).map(
    (name) =>
      new Constellation(
        name,
        connect[name],
        ctx,
        cloc[name],
        ratio,
        canvas.width,
        canvas.height
      )
  );
  canvas.addEventListener("click", (event) =>
    handleClickCanvas(event, constellation_arr, sky_background)
  );
  // Begin animation
  animate(canvas, ctx, constellation_arr, sky_background, cameraOffset);
}

/**
 * @Property {Function} Calculate background ratio according to the user screen size
 *                      (2:1 of the screen size)
 */
function setRatio() {
  let defaultWidth = 1920;
  let defaultHeight = 1080;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let desiredWidth = screenWidth * 2;
  let desiredHeight = screenHeight * 2;
  return Math.max(
    Math.ceil(desiredHeight / defaultHeight),
    Math.ceil(desiredWidth / defaultWidth)
  );
}

let ratio = setRatio();

/**
 * Set up canvas with panning
 * @param {HTMLCanvasElement} canvas
 * @param {Background} sky_background
 * @returns cameraOffset
 * Reference: https://codepen.io/chengarda/pen/wRxoyB
 */
function setCanvasPanning(canvas, sky_background) {
  // User's view point, use it to move the skymap
  let cameraOffset = { x: 0, y: 0 };

  // Hook even listener for panning event
  canvas.addEventListener("mousedown", onPointerDown);
  canvas.addEventListener("touchstart", (e) => handleTouch(e, onPointerDown));
  canvas.addEventListener("mouseup", onPointerUp);
  canvas.addEventListener("touchend", (e) => handleTouch(e, onPointerUp));
  canvas.addEventListener("mousemove", onPointerMove);
  canvas.addEventListener("touchmove", (e) => handleTouch(e, onPointerMove));

  /**
   * Gets the relevant location from a mouse or single touch event
   * @param {Event} e mouse event
   * @returns x: e.clientX coordinate
   *          y: e.clientY coordinate
   */
  function getEventLocation(e) {
    if (e.touches && e.touches.length == 1)
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    else if (e.clientX && e.clientY) return { x: e.clientX, y: e.clientY };
  }

  // Handle panning events
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  /**
   * Mouse down to start dragging
   * @param {Event} e mouse event
   */
  function onPointerDown(e) {
    isDragging = true;
    dragStart.x = getEventLocation(e).x - cameraOffset.x;
    dragStart.y = getEventLocation(e).y - cameraOffset.y;
    canvas.style.cursor = "grabbing";
  }

  /**
   * Mouse up to stop dragging
   * @param {Event} e mouse event
   */
  function onPointerUp(e) {
    isDragging = false;
    canvas.style.cursor = "grab";
  }

  /**
   * Mouse move to drag if is dragging
   * @param {Event} e mouse event
   */
  function onPointerMove(e) {
    if (isDragging && getEventLocation(e)) {
      cameraOffset.x = getEventLocation(e).x - dragStart.x;
      cameraOffset.y = getEventLocation(e).y - dragStart.y;
      cameraOffset.x = cameraOffset.x <= 0 ? cameraOffset.x : 0;
      cameraOffset.y = cameraOffset.y <= 0 ? cameraOffset.y : 0;
      cameraOffset.x =
        canvas.width - cameraOffset.x <= 1920 * ratio
          ? cameraOffset.x
          : canvas.width - 1920 * ratio;
      cameraOffset.y =
        canvas.height - cameraOffset.y <= 1080 * ratio
          ? cameraOffset.y
          : canvas.height - 1080 * ratio;
    }
  }

  /**
   * Touch event for mobile version
   * @param {Event} e mouse event
   * @param {Function} singleTouchHandler handler on touch
   */
  function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
      singleTouchHandler(e);
    } else if (e.type == "touchmove" && e.touches.length == 2) {
      isDragging = false;
    }
  }

  return cameraOffset;
}

/**
 * Handle click when the user click on the canvas to trigger the
 * star click and count the total if clicked on the star.
 * @param {Event} event
 * @param {Constellation} constellation_arr
 * @param {Background} sky_background
 */
function handleClickCanvas(event, constellation_arr, sky_background) {
  let canvas = document.querySelector("canvas");
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.x;
  let y = event.clientY - rect.y;
  let total = 0; //Keep track of total stars selected

  // Click on the star and increment constellation counter of the selected star
  for (const constellation of constellation_arr) {
    constellation.click(x, y);
    total += constellation.selected_number;
    document.querySelector("span").innerHTML = total;
  }
  // If 5 stars are selected, start calculating which constellation has the most stars.
  if (total == 5) {
    decideConstellation(constellation_arr, sky_background);
    canvas.style.pointerEvents = "none";
  }
  // Get constellation ratio list
  let ratios = {};
  for (const constellation of constellation_arr) {
    ratios[constellation.name] = constellation.selected_ratio;
  }
  if (debug) {
    console.log(ratios);
  }
}
// zoom out canvas and move camera to the selected constellation when 5 stars are selected, called only in decideConstellation()
function zoomOutCanvas(finalConstellation) {
  // map constellation name to x-axis
  const constellation_xAxis = {
    Orion: -800,
    Crux: -500,
    Aries: -1300,
    "Canis Major": -160,
    "Ursa Major": -1400,
    Carina: -825,
    Ophiuchus: -90,
    "Armadillo Dragon": -1425,
  };
  const canvas = document.querySelector("canvas");
  ratio *= 0.5;

  cameraOffset.x = constellation_xAxis[finalConstellation.name];
  cameraOffset.y = 0;
  cameraOffset.x =
    canvas.width - cameraOffset.x <= 1920 * ratio
      ? cameraOffset.x
      : canvas.width - 1920 * ratio;
  cameraOffset.y =
    canvas.height - cameraOffset.y <= 1080
      ? cameraOffset.y
      : canvas.height - 1080 * rate;

  constellation_arr.forEach((constellation) =>
    constellation.updateRatio(ratio)
  );
}

// Decide which constellation is selected based on most stars selected;
function decideConstellation(constellation_arr, sky_background) {
  let numStar = constellation_arr[0].selected_number;
  let finalConstellation = constellation_arr[0];
  let index = 0;

  // loop though all the constellation and to selected
  // the final constellation if 5 stars are selected
  for (const constellation of constellation_arr) {
    if (constellation.selected_number > numStar) {
      numStar = constellation.selected_number;
      finalConstellation = constellation;
      index = constellation_arr.indexOf(constellation);
    }
  }
  //********* Manual Testing section helper ************/
  // un-comment the below code
  // then, change line 193 -> if (total == 5) to if (total == 1) for easier testing
  // adjust the below index to test different constellation
  // index = 7;
  // finalConstellation = constellation_arr[index];
  //************************ **************************/
  zoomOutCanvas(finalConstellation);

  // Connect final constellation stars
  constellation_arr[index].connectAll();

  sky_background.load_image(
    finalConstellation,
    constellationList[
      constellationList.findIndex(
        (item) => item.name === finalConstellation.name
      )
    ].imageLink
  );

  // Show button to next page
  document.querySelector("a").style.display = "block";
  document.querySelector("#hint").style.display = "none";

  // Record the result to the local storage
  finalConstellation.setChosen(true);
  localStorage.setItem("chosenConstellation", finalConstellation.name);

  // Store music play time to local storage before navigating to the next page
  document.querySelector("a").addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
}

/**
 * @Property {Function} Animation loop to update the skymap
 */
function animate(canvas, ctx, constellation_arr, sky_background, cameraOffset) {
  requestAnimationFrame(() =>
    animate(canvas, ctx, constellation_arr, sky_background, cameraOffset)
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sky_background.update(cameraOffset.x, cameraOffset.y, ratio);
  // Update constellations
  for (const constellation of constellation_arr) {
    if (constellation.isChosen)
      constellation.updateNew(cameraOffset.x, cameraOffset.y);
    else constellation.update(cameraOffset.x, cameraOffset.y);
    // Update offset
    constellation.setOffset(cameraOffset.x, cameraOffset.y);
  }
}

/**
 * @Property {Function} Helper function to load json data for constellation and stars
 * @return cloc, connect constellation location and connect
 */
async function loadJsonData() {
  const clocResponse = await fetch("/skymap/constellation/json");
  const cloc = await clocResponse.json();
  const connectResponse = await fetch("/skymap/stars/json");
  const connect = await connectResponse.json();
  return { cloc, connect };
}
