window.addEventListener("DOMContentLoaded", init);

const selectionButtons = document.querySelectorAll('button');
const icon = document.querySelector('img');
const startButton = document.querySelector('a');

let selectedButton = null;

function init() {
  localStorage.clear();
  selectionButtons.forEach(function (element) {
    element.addEventListener("click", handleSelection);
  });
}

function handleSelection(element) {
    let clickedButton = element.target;

    let questionType = clickedButton.innerHTML;
    if (questionType === 'RELATIONSHIP') {
        icon.src = '../../assets/Icons/Relationship.png';
    } else if (questionType === 'HEALTH') {
        icon.src = '../../assets/Icons/Health.png';
    } else if (questionType === 'CAREER') {
        icon.src = '../../assets/Icons/Career.png';
    } else if (questionType === 'HOROSCOPE') {
        icon.src = '../../assets/Icons/DailyHoroscope.png';
    }

    if (selectedButton === null) {
        // if no button is previously selected, select the clicked button
        clickedButton.style.backgroundColor = 'var(--button-hover-background)';

        localStorage.setItem('questionType', questionType);
        selectedButton = clickedButton;

        startButton.style.display = 'block';
        icon.style.display = 'block';
    } else if (clickedButton != selectedButton) {
        // unselect the previously selected button, select the clicked button
        selectedButton.style.backgroundColor = 'var(--button-background)';

        clickedButton.style.backgroundColor = 'var(--button-hover-background)';
        
        localStorage.setItem('questionType', questionType);
        selectedButton = clickedButton;
    }
}
