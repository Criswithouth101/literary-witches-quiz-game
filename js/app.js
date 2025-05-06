/*-------------------------------- Constants --------------------------------*/
/*-------------------------------- Variables --------------------------------*/

let playerAvatar = null;
let correctAnswers = null;
let wrongAnswers = null;
let skipRemain = null;
let hintRemain = null;
let gameOver = null;


/*------------------------ Cached Element References ------------------------*/
const cards = document.querySelectorAll('.card');

/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log('calling the function that loads the page', cards);
    playerAvatar = 'very normal human';
    correctAnswers = 0;
    wrongAnswers = 0;
    skipRemain = 3;
    hintRemain = 3;
    gameOver = false;

};
function loadCardDeck(event) {

}

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener('DOMContentLoaded', init);