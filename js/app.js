/*-------------------------------- Constants --------------------------------*/
const quizQuestions = [
    {
        question: "The Trickery Witch: Who wrote nearly 70 detective novels, making her the most popular novelist in all history?",
        answers: ["Agatha Christie", "Toni Morrison", "Mary Shelley", "Shirley Jackson"],
        correct: "Agatha Christie",
        hint: "British aristocratic world."
      },
      {
        question: "The Power Witch: Who is the author of the novel 'Beloved'? ",
        answers: ["Joanna Russ", "Toni Morrison", "Virginia Wolf", "Nadine gordimer"],
        correct: "Toni Morrison",
        hint: "She also wrote 'Jazz'."
      },
      {
        question: "The Interiority Witch: Famous Latin American poet who's poetry focused on silence, absence, madnes and death. She died at the age of 36 years old.",
        answers: ["Gabriela Mistral", "Cristina Peri Rossi", "Alejandra Pizarnik", "Ida Vitale"],
        correct: "Alejandra Pizarnik",
        hint: "She wrote 'The Last Innocence' and 'The Lost Adventures'."
      },
      {
        question: "The Transformation Witch: Select the novel written by Mary Shelly: ",
        answers: ["Jane Eyre", "Little Women", "Pride & Prejudice", "Frankenstein"],
        correct: "Frankenstein",
        hint: "The cycle of life."
      },
      {
        question: "The Visionary Witch: Which feminist icon said 'As long as she thinks of a man, nobody objects to a woman thinking.' ",
        answers: ["Chimamanda Ngozi Adichie", "Virginia Wolf", "Jane Austen", "Silvia Plath"],
        correct: "Virginia Wolf",
        hint: "One of the most influential 20th-century modernist authors."
      },
      {
        question: "The Rebel Witch: Iranian poet Forugh Farrokhzad is known for resisting societal forms. She was the first Persian poet to write about sexuality. But also, she directed an award-winning documentary about life and suffering in a leper colony. What's the documentary's name?",
        answers: ["Dark Sky", "Isolation", "The House Is Black", "Hospice Colony"],
        correct: "The House Is Black",
        hint: "Filmend in 1963, the film is in colours Black and white."
      },

];

const witchAvatars = [
    { img: 'witch1.jpeg', label: 'Initiate Witch' },
    { img: 'witch2.jpeg', label: 'Forest Witch' },
    { img: 'witch3.jpeg', label: 'Storm Witch' },
    { img: 'witch4.jpeg', label: 'Oracle Witch' },
    { img: 'hecate.jpeg', label: 'Supreme Witch: Hecate' }
  ];
  
  const humanAvatars = [
    { img: 'human1.png', label: 'Confused Human' },
    { img: 'human2.png', label: 'Boring Human' },
    { img: 'human3.png', label: 'Utterly Normal Human' }
  ];
  
/*-------------------------------- Variables --------------------------------*/

let playerAvatar = null;
let correctAnswers = null;
let wrongAnswers = null;
let skipRemain = null;
let hintRemain = null;
let gameOver = null;
let currentQuestion = null;
let activeQuestion = currentQuestion;



/*------------------------ Cached Element References ------------------------*/
const cards = document.querySelectorAll('.card');
const answerButtons = document.querySelectorAll('.answer-button');
const hintButton = document.querySelector('#hint-button');
const hintText = document.getElementById('hint-text');
const skipButton = document.getElementById('skip-button');
const avatarImage = document.getElementById('avatar-image');
const avatarName = document.getElementById('avatar-name');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');




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
function selectingCard(event) {
    console.log('calling the function that assigns the click to a card')
    const cardEl = event.target;
    const cardIndex = cardEl.dataset.card;
    currentQuestion = quizQuestions[cardIndex];
    console.log("Active question is now:", currentQuestion);

    document.getElementById('card-deck').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    document.getElementById('question-text').textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer;
        answerButtons[index].dataset.correct = (answer === currentQuestion.correct);
}); // check the text in the buttons 
hintText.classList.add('hidden');
hintText.textContent = '';
enableAnswerButtons();

}
function answerSelected(event) {
      const isCorrect = event.target.dataset.correct === "true";
      if (isCorrect) {
        correctAnswers++;
      } else {
        wrongAnswers++;
        disableAnswerButtons();
      }   
      console.log("Answer is correct:", isCorrect);
      console.log("Correct answers:", correctAnswers);
      console.log("Wrong answers:", wrongAnswers);

      updateAvatar(); 
         
}

function showHint(event) {
    console.log('calling the function that gives a hint')
        if (hintRemain <= 0 || !currentQuestion) return;
      
        hintRemain--;
        hintText.textContent = currentQuestion.hint;
        hintText.classList.remove('hidden');
        hintButton.textContent = `Hints (${hintRemain} left)`;
        hintButton.disabled = hintRemain === 0;
    
}
function skipQuestion() {
    if (skipRemain <= 0) return;
  
    skipRemain--;
    skipButton.textContent = `Skip (${skipRemain} left)`;
    if (skipRemain === 0) skipButton.disabled = true;
  
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quizQuestions.length);
    } while (quizQuestions[newIndex] === currentQuestion);
  
    currentQuestion = quizQuestions[newIndex];
    console.log("other Q from skip:", currentQuestion);
  
    document.getElementById('card-deck').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
  
    document.getElementById('question-text').textContent = currentQuestion.question;
  
    hintText.textContent = '';
    hintText.classList.add('hidden');
  
    const answerButtons = document.querySelectorAll('.answer-button');
    currentQuestion.answers.forEach((answer, index) => {
      answerButtons[index].textContent = answer;
      answerButtons[index].dataset.correct = (answer === currentQuestion.correct);
      answerButtons[index].disabled = false; 
    });
    enableAnswerButtons();
  }
  
  function updateAvatar() {
    // Update score display
    scoreDisplay.textContent = `Correct: ${correctAnswers} | Wrong: ${wrongAnswers}`;
  
    if (wrongAnswers >= 3) {
      const human = humanAvatars[Math.min(wrongAnswers - 1, humanAvatars.length - 1)];
      avatarImage.innerHTML = `<img src="${human.img}" alt="Human Avatar">`;
      avatarName.textContent = human.label;
      levelDisplay.textContent = 'You’ve been cast out of the coven!';
      gameOver = true;
        updateAvatar();
        disableAnswerButtons();
      return;
    }
  
    const witch = witchAvatars[Math.min(correctAnswers, witchAvatars.length - 1)];
    avatarImage.innerHTML = `<img src="${witch.img}" alt="Witch Avatar">`;
    avatarName.textContent = witch.label;
  
    levelDisplay.textContent = correctAnswers === 5
      ? 'You’ve reached the Supreme Coven Level: Hecate!'
      : witch.label;
  }

  function disableAnswerButtons() {
    answerButtons.forEach(button => {
      button.disabled = true;
      button.classList.add('disabled');
    });
    alert("You’ve lost your magic! Wrong answer. Select another card.")
  }
  function enableAnswerButtons() {
    answerButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('disabled');
    });
  }
  

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener('DOMContentLoaded', init);
cards.forEach(card => {
    card.addEventListener('click', selectingCard);
  }); // detect player click + loop thru deck 

answerButtons.forEach(button => {
    button.addEventListener('click', answerSelected);
  });

hintButton.addEventListener('click', showHint);
skipButton.addEventListener('click', skipQuestion);


  