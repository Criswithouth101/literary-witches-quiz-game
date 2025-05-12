/*-------------------------------- Constants --------------------------------*/
console.log('Script loaded!');

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
const tarotCards = [
  { img: 'pics/tarot-cards/tarot-chariot.jpeg', label: 'The Chariot'},
  { img: 'pics/tarot-cards/tarot-death.jpeg', label: 'The Death'},
  { img: 'pics/tarot-cards/tarot-lovers.jpeg', label: 'The Lovers'},
  { img: 'pics/tarot-cards/tarot-rings.jpeg', label: 'The Ring Holder'},
  { img: 'pics/tarot-cards/tarot-strength.jpeg', label: 'The Strenght'}
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
let timerInterval;
let timeLeft = 15;
let tickSound = new Audio("sounds/Timer.m4a");
let backgroundSound = new Audio("sounds/winner.m4a");
let winSound = new Audio("sounds/hecate-win.m4a");



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
const answerMessage = document.getElementById('answer-message');
const questionText = document.getElementById('question-text');

/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log('calling the function that loads the page', cards);
    playerAvatar = 'Initiate Witch';
    correctAnswers = 0;
    wrongAnswers = 0;
    skipRemain = 3;
    hintRemain = 3;
    gameOver = false;
    disableAnswerButtons();

    avatarImage.innerHTML = `<img src="${witchAvatars[0].img}" alt="Witch Avatar">`;
    avatarName.textContent = 'Find yourself.';
    levelDisplay.textContent = 'Your journey begins...';
    scoreDisplay.textContent = 'Correct: 0 | Wrong: 0';

    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    dealtQuestions = shuffledQuestions.slice(0, 5); 
    remainingQuestions = shuffledQuestions.slice(5); 

    tarotCards.forEach((card, index) => {
      if (cards[index]) {
        cards[index].style.backgroundImage = `url('${card.img}')`;
        cards[index].style.backgroundSize = 'cover';
        cards[index].style.backgroundPosition = 'center';
        cards[index].textContent = '';
      }
      
    });
};
function selectingCard(event) {
    console.log('calling the function that assigns the click to a card')
    const cardEl = event.target;
    const cardIndex = cardEl.dataset.card;
    currentQuestion = dealtQuestions[cardIndex];
    console.log("Active question now:", currentQuestion);

    document.getElementById('card-deck').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    document.getElementById('question-text').textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer;
        answerButtons[index].dataset.correct = (answer === currentQuestion.correct);
        }); //checking the text in the buttons 
        cardEl.disabled = true;
        cardEl.classList.add('used-card');
        hintText.classList.add('hidden');
        hintText.textContent = '';
        enableAnswerButtons();
        startTimer();
        gameSound();
     }
function answerSelected(event) {
        stopTimer();
      const isCorrect = event.target.dataset.correct === "true";
      if (isCorrect) {
        correctAnswers++;
        disableAnswerButtons();
        answerMessage.textContent = "There's magic in you! Correct";
        answerMessage.classList.remove('hidden')
        answerMessage.classList.remove('fade-in');
        void answerMessage.offsetWidth;
        answerMessage.classList.add('fade-in');
      } else {
        wrongAnswers++;
        disableAnswerButtons();
        answerMessage.textContent = "You’ve lost your magic! Wrong answer. Select another card or skip.";
        answerMessage.classList.remove('hidden')
        answerMessage.classList.remove('fade-in');
        void answerMessage.offsetWidth; 
        answerMessage.classList.add('fade-in');
      }   
      console.log("is Answer correct?:", isCorrect);
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
    startTimer(); 
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
  
    if (correctAnswers > 0) {
      const witchIndex = Math.min(correctAnswers, witchAvatars.length - 1);
      const witch = witchAvatars[witchIndex];
      avatarImage.innerHTML = `<img src="${witch.img}" alt="Witch Avatar">`;
      avatarName.textContent = witch.label;

      if (correctAnswers === 4) {
        levelDisplay.textContent = 'You’ve reached the Supreme Coven Level: Hecate!';
        backgroundSound.pause();
        winSound.play();
        triggerSparkleEffect();
      } else {
        levelDisplay.textContent = witch.label;
      }
    }
  
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
    console.log('gameover works');
    skipButton.disabled = true;
    hintButton.disabled = true;
  
    answerButtons.forEach(button => {
      button.disabled = true;
    });
  
    cards.forEach(card => {
      card.disabled = true;
      card.classList.add('used-card');
    });
    answerMessage.textContent = "Game over. You've lost your magic!";
    answerMessage.classList.remove('hidden')
    answerMessage.classList.remove('fade-in');
    void answerMessage.offsetWidth;
    playAgainButton.classList.remove('hidden');
  }

  function resetGame() {
    init(); 
    playAgainButton.classList.add('hidden');
    console.log('reset works');

    hintText.textContent = '';
    hintText.classList.add('hidden');
    questionText.textContent = 'Question';
    document.getElementById('card-deck').classList.remove('hidden');
    document.getElementById('question-box').classList.add('hidden');

    cards.forEach(card => {
      card.disabled = false;
      card.classList.remove('used-card');
    });
    
 answerButtons.forEach(button => {
    button.disabled = true;
    button.textContent = '?'; 
    button.classList.add('disabled');
  });

    skipButton.disabled = false;
    skipButton.textContent = `Skip (${skipRemain} left)`;
    hintButton.disabled = false;
    hintButton.textContent = `Hints (${hintRemain} left)`;
    answerMessage.classList.add('hidden');
    console.log('reset work too');
  }
  
  function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
  
    tickSound.currentTime = 0; 
    tickSound.loop = true;
    tickSound.play();
  
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        tickSound.pause();
        tickSound.currentTime = 0;
        disableAnswerButtons();
        answerMessage.textContent = "Time’s up! You didn’t answer in time.";
        answerMessage.classList.remove('hidden')
        answerMessage.classList.remove('fade-in');
        void answerMessage.offsetWidth; 
        answerMessage.classList.add('fade-in');
      }
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerInterval);
    tickSound.pause();
    tickSound.currentTime = 0;
  }
  
  function gameSound() {
    backgroundSound.play()
    backgroundSound.loop = true;
  }

    function triggerSparkleEffect() {
      const container = document.getElementById('sparkle-container');
      for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        container.appendChild(sparkle);
    
        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }
      console.log('sparks in');
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
playAgainButton.addEventListener('click', () => {
  console.log('play again click works');
  resetGame();
});
//event listener to start the game 
document.getElementById('start-button').addEventListener('click', function() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('card-deck').style.display = 'block';
  document.getElementById('question-box').style.display = 'block';
  document.getElementById('help-buttons').style.display = 'block';
  document.getElementById('timer-box').style.display = 'block';
  document.getElementById('avatar-box').style.display = 'block';
  init();  
  });



  