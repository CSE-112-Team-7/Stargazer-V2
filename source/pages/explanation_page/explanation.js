import playBgMusic from "/utils/playmusic/script";

/**
 * @property {Function} init retrieves info from previous page
 * @property {Function} initializeConstellation initalize constellations
 */

// array of constellations - name, description, constellation image link, myth image link
const constellationList = [
  {
    name: "Aries",
    description:
      "In Greek mythology, the constellation Aries is associated with the story of the Golden Fleece and the heroic adventures of Jason and the Argonauts. To save the children of the king of Boeotia from murder, a divine golden ram was sent by the gods to whisk the siblings away. Although one child was lost, the other, Phrixus, rode the ram to land of Colchis, upon which he sacrificed the ram's fleece to its king, hanging it on a sacred oak tree and tasking a dragon who never slept to guard it. Later, Jason and his crew known as the Argonauts set sail to find the magical fleece, in hopes of using its royal pedigree to claim his throne in Thessaly. Through cunning, guile, and charisma, Jason completed his quest, and returned home to celebration with the divine artifact. As a commemoration of the ram that carried the boy to safety and the Golden Fleece itself, the constellation Aries was created in the sky. From the myths of Jason and Phryxis, is associated with determination, leadership, and adventure.",
    imageLink: "/assets/constellation/aries/exp/img",
    mythLink: "/assets/constellation/aries/myth/img",
  },
  {
    name: "Canis Major",
    description:
      "Canis Major is associated with the Greek tale of the hunter Orion, and his loyal hunting dog, Sirius. The pair were a peerless team, having tracked and defeated a menagerie of wondrous beasts.",
    imageLink: "/assets/constellation/canis/exp/img",
    mythLink: "/assets/constellation/canis/myth/img",
  },
  {
    name: "Crux",
    description:
      "The constellation Crux, although not tied to single tale, is represented by the guidance and spirituality found in many cultures. One such fable is from the Maori poeple of New Zealand.",
    imageLink: "/assets/constellation/crux/exp/img",
    mythLink: "/assets/constellation/crux/myth/img",
  },
  {
    name: "Orion",
    description:
      "In Greek mythology, the constellation Orion represents the legendary hunter of the same name, famed for his strength, skill, and daring exploits. The son of the sea god Poseidon and the renowned huntress Euryale, Orion grew to be an exceptional hunter, tracking and slaying a whole host of formidable creatures from every forest and plain, to even the Underworld.",
    imageLink: "/assets/constellation/orion/exp/img",
    mythLink: "/assets/constellation/orion/myth/img",
  },
  {
    name: "Armadillo Dragon",
    description:
      "The Armadillo Dragon constellation represents a mythical creature blending the qualities of an armadillo and a dragon. Legend has it that this celestial guardian possessed an impenetrable armor-like shell, symbolizing protection and resilience, while embodying the power, wisdom, and mysticism of dragons.",
    imageLink: "/assets/constellation/armadillo/exp/img",
    mythLink: "/assets/constellation/armadillo/myth/img",
  },
  {
    name: "Carina",
    description:
      "In Greek mythology, the constellation Carina represents the hull of the famous ship Argo Navis, the vessel that carried Jason and the Argonauts on their legendary quest to find the Golden Fleece in Colchis. According to the myth, the ship Argo was constructed by the skilled shipwright Argus, with the guidance of the sagacious goddess Athena.",
    imageLink: "/assets/constellation/carina/exp/img",
    mythLink: "/assets/constellation/carina/myth/img",
  },
  {
    name: "Ophiuchus",
    description:
      "The constellation Ophiuchus represents Asclepius, the Greek god of healing and medicine. According to the myth, Asclepius was the son of Apollo and a mortal woman named Coronis. As he grew, Asclepius' skill with medicine became legendary, becoming renowned with his ability to cure the sick and even bring the dead back to life.",
    imageLink: "/assets/constellation/ophi/exp/img",
    mythLink: "/assets/constellation/ophi/myth/img",
  },
  {
    name: "Ursa Major",
    description:
      "The constellation Ursa Major, the Great Bear, represents the tragic Greek tale of the goddess Callisto. Once a nymph, and an ardent follower of the hunter goddess Artemis, her life took a dark turn when she attracted the attention of Zeus. Disguising himself as Artemis, she decieved and seduced Callisto.",
    imageLink: "/assets/constellation/ursa/exp/img",
    mythLink: "/assets/constellation/ursa/myth/img",
  },
];

window.addEventListener("DOMContentLoaded", init);
/**
 * Retrieves info from previous page
 */
function init() {
  const backgroundMusic = document.getElementById("background-music");
  playBgMusic(backgroundMusic, true);

  initializeConstellation();

  const continueButton = document.getElementById("continue-button");
  continueButton.addEventListener("click", () => {
    localStorage.setItem("musicPlayTime", backgroundMusic.currentTime);
  });
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
