import playClickSound from "../../utils/playClickSound.js";
import playBgMusic from "../../utils/playBgMusic.js";

let synthExist;

/**
 * @property {Function} init retrieves info from previous page
 * @property {Function} initializeConstellation initalize constellations
 * @property {Function} stopTalkWhenReload stop voice over when reload/back a page
 * @property {Function} stopSpeechSynthesis stop voice over
 */

// array of constellations - name, description, constellation image link, myth image link
let constellationList = [
  {
    name: "Aries",
    description:
      "In Greek mythology, the constellation Aries is associated with the story of the Golden Fleece and the heroic adventures of Jason and the Argonauts. To save the children of the king of Boeotia from murder, a divine golden ram was sent by the gods to whisk the siblings away. Although one child was lost, the other, Phrixus, rode the ram to land of Colchis, upon which he sacrificed the ram's fleece to its king, hanging it on a sacred oak tree and tasking a dragon who never slept to guard it. Later, Jason and his crew known as the Argonauts set sail to find the magical fleece, in hopes of using its royal pedigree to claim his throne in Thessaly. Through cunning, guile, and charisma, Jason completed his quest, and returned home to celebration with the divine artifact. As a commemoration of the ram that carried the boy to safety and the Golden Fleece itself, the constellation Aries was created in the sky. From the myths of Jason and Phryxis, is associated with determination, leadership, and adventure.",
    imageLink: "../../assets/constellations/Aries-explanation.png",
    mythLink: "../../assets/myths/Aries-myth.jpeg",
  },
  {
    name: "Canis Major",
    description:
      "Canis Major is associated with the Greek tale of the hunter Orion, and his loyal hunting dog, Sirius. The pair were a peerless team, having tracked and defeated a menagerie of wondrous beasts.",
    imageLink: "../../assets/constellations/CanisMajor-explanation.png",
    mythLink: "../../assets/myths/CanisMajor-myth.jpeg",
  },
  {
    name: "Crux",
    description:
      "The constellation Crux, although not tied to single tale, is represented by the guidance and spirituality found in many cultures. One such fable is from the Maori poeple of New Zealand.",
    imageLink: "../../assets/constellations/Crux-explanation.png",
    mythLink: "../../assets/myths/Crux-myth.jpeg",
  },
  {
    name: "Orion",
    description:
      "In Greek mythology, the constellation Orion represents the legendary hunter of the same name, famed for his strength, skill, and daring exploits. The son of the sea god Poseidon and the renowned huntress Euryale, Orion grew to be an exceptional hunter, tracking and slaying a whole host of formidable creatures from every forest and plain, to even the Underworld.",
    imageLink: "../../assets/constellations/Orion-explanation.png",
    mythLink: "../../assets/myths/Orion-myth.jpeg",
  },
  {
    name: "Armadillo Dragon",
    description:
      "The Armadillo Dragon constellation represents a mythical creature blending the qualities of an armadillo and a dragon. Legend has it that this celestial guardian possessed an impenetrable armor-like shell, symbolizing protection and resilience, while embodying the power, wisdom, and mysticism of dragons.",
    imageLink: "../../assets/constellations/ArmadilloDragon-explanation.png",
    mythLink: "../../assets/myths/ArmadilloDragon-myth.jpeg",
  },
  {
    name: "Carina",
    description:
      "In Greek mythology, the constellation Carina represents the hull of the famous ship Argo Navis, the vessel that carried Jason and the Argonauts on their legendary quest to find the Golden Fleece in Colchis. According to the myth, the ship Argo was constructed by the skilled shipwright Argus, with the guidance of the sagacious goddess Athena.",
    imageLink: "../../assets/constellations/Carina-explanation.png",
    mythLink: "../../assets/myths/Carina-myth.jpeg",
  },
  {
    name: "Ophiuchus",
    description:
      "The constellation Ophiuchus represents Asclepius, the Greek god of healing and medicine. According to the myth, Asclepius was the son of Apollo and a mortal woman named Coronis. As he grew, Asclepius' skill with medicine became legendary, becoming renowned with his ability to cure the sick and even bring the dead back to life.",
    imageLink: "../../assets/constellations/Ophiuchus-explanation.png",
    mythLink: "../../assets/myths/Ophiuchus-myth.jpeg",
  },
  {
    name: "Ursa Major",
    description:
      "The constellation Ursa Major, the Great Bear, represents the tragic Greek tale of the goddess Callisto. Once a nymph, and an ardent follower of the hunter goddess Artemis, her life took a dark turn when she attracted the attention of Zeus. Disguising himself as Artemis, she decieved and seduced Callisto.",
    imageLink: "../../assets/constellations/UrsaMajor-explanation.png",
    mythLink: "../../assets/myths/UrsaMajor-myth.jpeg",
  },
];
let backgroundMusic;

let synth;
window.addEventListener("DOMContentLoaded", init);
/**
 * Retrieves info from previous page
 */
function init() {
  backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic);

  initializeConstellation();
  // get chosen voice from localstorage
  const chosenVoice = localStorage.getItem("voiceChoice");
  synth = window.speechSynthesis;
  let utterance = new SpeechSynthesisUtterance();
  let list;
  //Start speaking
  if (chosenVoice != -1) {
    synth.addEventListener("voiceschanged", () => {
      list = synth.getVoices();
      utterance.voice = list[chosenVoice];
      utterance.text = document.getElementById("description").textContent;
      synth.speak(utterance);
      synthExist = 1;
    });
  } else {
    synthExist = -1;
  }
}

/**
 * Initialize the info from the previuos page
 */
function initializeConstellation() {
  // get chosen constellation from localStorage
  const chosenConstellationName = localStorage.getItem("chosenConstellation");
  const chosenConstellation =
    constellationList[
      constellationList.findIndex(
        (item) => item.name === chosenConstellationName
      )
    ];
  console.log(chosenConstellation);

  // set title/description/images of constellation explanation to chosen constellation
  const constellationTitle = document.querySelector("h1");
  constellationTitle.textContent = chosenConstellation["name"];
  const constellationDesription = document.getElementById("description");
  constellationDesription.textContent = chosenConstellation["description"];
  const constellationImage = document.getElementById("constellation-image");
  constellationImage.src = chosenConstellation.imageLink;
  const mythImage = document.getElementById("myth-image");
  mythImage.src = chosenConstellation["mythLink"];
}

const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", function () {
  playClickSound(
    document.getElementById("clickSound"),
    localStorage.getItem("questionType"),
    backgroundMusic.currentTime,
    () => (window.location.href = "../response_page/response.html")
  );
  stopSpeechSynthesis();
});

stopTalkWhenReload();
/**
 * voiceover stops when page reloaded/goes to previuos page.
 */
function stopTalkWhenReload() {
  //These event listeners stop the voicing when user reload or navigate back to previous page.
  window.addEventListener("beforeunload", stopSpeechSynthesis);
  window.addEventListener("unload", stopSpeechSynthesis);
}

/**
 * stops speech
 */
function stopSpeechSynthesis() {
  if (synthExist == 1 && synth.speaking) {
    synth.cancel();
  }
}
