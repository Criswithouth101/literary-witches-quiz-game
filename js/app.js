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
        question: "The Intellectual Witch: Dedicated educator, poet and engaged and committed intellectual who defended the rights of children, women, and the poor; the freedoms of democracy; and the need for peace in times of social, political, and ideological conflicts, not only in Latin America but in the whole world.",
        answers: ["Gabriela Mistral", "Cristina Peri Rossi", "Alejandra Pizarnik", "Ida Vitale"],
        correct: "Gabriela Mistral",
        hint: "She's the first Latin American author to receive a Novel Prize in Literature."
      },
      {
        question: "The Transition Witch: Select the novel written by Mary Shelly: ",
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
      {
        question: "The Storyteller Witch: This Chilean contemporary author said “Writing is a process, a journey into memory and the soul.”. Who was she?",
        answers: ["Alejandra Pizarnik", "Clarice Lispector", "Maria Luisa Bombal", "Isabel Allende"],
        correct: "Isabel Allende",
        hint: "She wrote 'The House of Spirits'."
      },
      {
        question: " The Transformation Witch: Yumiko Kurahashi's work was influenced by Kafka and experimental fiction, questioning prevailing societal norms on sexual relations, violence and social order. Which of the following was her first English-translated antinovels? ",
        answers: ["The Woman with the Flying Head", "Sweet Bean Paste", "Tokyo Blues", "Heaven"],
        correct: "The Woman with the Flying Head",
        hint: "Think bizarre. Freaking out Kafka-style."
      },

];

const witchAvatars = [
    { img: 'pics/witch1.jpeg', label: 'Initiate Witch' },
    { img: 'pics/witch2.jpeg', label: 'Forest Witch' },
    { img: 'pics/witch3.jpeg', label: 'Storm Witch' },
    { img: 'pics/witch4.jpeg', label: 'Oracle Witch' },
    { img: 'pics/hecate.jpeg', label: 'Supreme Witch: Hecate' }
  ];
  
  const humanAvatars = [
    { img: 'pics/human1.jpeg', label: 'Confused Human' },
    { img: 'pics/human2.svg', label: 'Normal Human' },
    { img: 'pics/human3.jpeg', label: 'A Pilgrim' }
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
const playAgainButton = document.getElementById('play-again');



/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log('calling the function that loads the page', cards);
    playerAvatar = 'Initiate Witch';
    correctAnswers = 0;
    wrongAnswers = 0;
    skipRemain = 3;
    hintRemain = 3;
    gameOver = false;
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    dealtQuestions = shuffledQuestions.slice(0, 5); 
    remainingQuestions = shuffledQuestions.slice(5); 

};
function selectingCard(event) {
    console.log('calling the function that assigns the click to a card')
    const cardEl = event.target;
    const cardIndex = cardEl.dataset.card;
    currentQuestion = dealtQuestions[cardIndex];
    console.log("Active question is now:", currentQuestion);

    document.getElementById('card-deck').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    document.getElementById('question-text').textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer;
        answerButtons[index].dataset.correct = (answer === currentQuestion.correct);
        }); // check the text in the buttons 
        cardEl.disabled = true;
        cardEl.classList.add('used-card');
        hintText.classList.add('hidden');
        hintText.textContent = '';
        enableAnswerButtons();

     }
function answerSelected(event) {
      const isCorrect = event.target.dataset.correct === "true";
      if (isCorrect) {
        correctAnswers++;
        disableAnswerButtons();
      } else {
        wrongAnswers++;
        disableAnswerButtons();
        alert("You’ve lost your magic! Wrong answer. Select another card or skip.");
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
    if (skipRemain <= 0 || remainingQuestions.length === 0) return;
  
    skipRemain--;
    skipButton.textContent = `Skip (${skipRemain} left)`;
    if (skipRemain === 0) skipButton.disabled = true;
  
    
    currentQuestion = remainingQuestions.shift();
    console.log("Skipped to new question:", currentQuestion);
  
    
    document.getElementById('card-deck').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
  
    document.getElementById('question-text').textContent = currentQuestion.question;
    hintText.textContent = '';
    hintText.classList.add('hidden');
  
    
    answerButtons.forEach((button, index) => {
      button.textContent = currentQuestion.answers[index];
      button.dataset.correct = (currentQuestion.answers[index] === currentQuestion.correct);
      button.disabled = false;
      button.classList.remove('disabled');
    });
  
    enableAnswerButtons(); 
  }
  
  
  function updateAvatar() {
    scoreDisplay.textContent = `Correct: ${correctAnswers} | Wrong: ${wrongAnswers}`;
  
    const maxWrongs = humanAvatars.length;
  

    if (wrongAnswers >= maxWrongs && correctAnswers === 0) {
      const human = humanAvatars[humanAvatars.length - 1];
      avatarImage.innerHTML = `<img src="${human.img}" alt="Human Avatar">`;
      avatarName.textContent = human.label;
      levelDisplay.textContent = 'You’ve been cast out of the coven!';
      gameOver = true;
      disableAnswerButtons();
      gameOverHandler();
      return;
    }
  
    //  Correct answers take visual priority — show witch if any progress
    if (correctAnswers > 0) {
      const witchIndex = Math.min(correctAnswers, witchAvatars.length - 1);
      const witch = witchAvatars[witchIndex];
      avatarImage.innerHTML = `<img src="${witch.img}" alt="Witch Avatar">`;
      avatarName.textContent = witch.label;
      levelDisplay.textContent = (correctAnswers >= witchAvatars.length - 1)
        ? 'You’ve reached the Supreme Coven Level: Hecate!'
        : witch.label;
      return;
    }
  
    // Otherwise, show current human state (only if no correct progress)
    if (wrongAnswers > 0) {
      const humanIndex = Math.min(wrongAnswers - 1, humanAvatars.length - 1);
      const human = humanAvatars[humanIndex];
      avatarImage.innerHTML = `<img src="${human.img}" alt="Human Avatar">`;
      avatarName.textContent = human.label;
      levelDisplay.textContent = 'Your magic flickers... stay sharp!';
      return;
    }
  
  }
  
  function disableAnswerButtons() {
    answerButtons.forEach(button => {
      button.disabled = true;
      button.classList.add('disabled');
    });
  }
  function enableAnswerButtons() {
    answerButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('disabled');
    });
  }
  
  function gameOverHandler() {
    
    skipButton.disabled = true;
    hintButton.disabled = true;
  
    answerButtons.forEach(button => {
      button.disabled = true;
    });
  
    cards.forEach(card => {
      card.disabled = true;
      card.classList.add('used-card');
    });
    levelDisplay.textContent = "Game over. You've lost your magic!";
    playAgainButton.classList.remove('hidden');
  }

  function resetGame() {
    init(); 
    avatarImage.innerHTML = '';
    avatarName.textContent = 'Find yourself.';
    levelDisplay.textContent = 'Your journey begins...';
    scoreDisplay.textContent = 'Correct: 0 | Wrong: 0';

    hintText.textContent = '';
    hintText.classList.add('hidden');
    document.getElementById('question-box').classList.add('hidden');
    document.getElementById('card-deck').classList.remove('hidden');
  
    cards.forEach(card => {
      card.disabled = false;
      card.classList.remove('used-card');
    });
  
    answerButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('disabled');
    });
  
    skipButton.disabled = false;
    skipButton.textContent = `Skip (${skipRemain} left)`;
    hintButton.disabled = false;
    hintButton.textContent = `Hints (${hintRemain} left)`;

    playAgainButton.classList.add('hidden');
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
playAgainButton.addEventListener('click', resetGame);



  