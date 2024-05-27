window.addEventListener("DOMContentLoaded", init);

const selectionButtons = document.querySelectorAll('button');
const startButton = document.querySelector('a');

let selectedButton = null;

function init() {
    localStorage.clear();
    selectionButtons.forEach(function(element) {
        element.addEventListener("click", handleSelection);
    });
}

function handleSelection(element) {
    let clickedButton = element.target;
    if (selectedButton === null) {
        // if no button is previously selected, select the clicked button
        clickedButton.style.backgroundColor = 'var(--button-hover-background)';

        localStorage.setItem('questionType', clickedButton.innerHTML);
        selectedButton = clickedButton;

        startButton.style.display = 'block';
    } else if (clickedButton != selectedButton) {
        // unselect the previously selected button, select the clicked button
        selectedButton.style.backgroundColor = 'var(--button-background)';

        clickedButton.style.backgroundColor = 'var(--button-hover-background)';
        
        localStorage.setItem('questionType', clickedButton.innerHTML);
        selectedButton = clickedButton;
    }
}