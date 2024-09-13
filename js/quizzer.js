let questions = [];

let currentQuestionIndex = 0;
let shuffledQuestions = [];
let shuffledChoices = [];
let score = 0;
let answers = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    shuffledQuestions.forEach(question => {
        question.choices = Object.entries(question.choices).sort(() => Math.random() - 0.5);
    });
    displayQuestion();
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const choicesContainer = document.getElementById('choices-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const nextButton = document.getElementById('next-button');

    questionContainer.innerHTML = shuffledQuestions[currentQuestionIndex].question;
    choicesContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    nextButton.style.display = 'none';

    shuffledQuestions[currentQuestionIndex].choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary choice-button';
        button.innerText = choice[1];
        button.onclick = () => checkAnswer(choice[1]);
        choicesContainer.appendChild(button);
    });
}

function disableChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-button');
    choiceButtons.forEach(button => {
        button.disabled = true;
    });
}

function checkAnswer(selectedChoice) {
    disableChoiceButtons();

    const feedbackContainer = document.getElementById('feedback-container');
    const nextButton = document.getElementById('next-button');
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

    if (selectedChoice === correctAnswer) {
        feedbackContainer.innerHTML = '<p style="color: green;">Correct!</p>';
        score++;
    } else {
        feedbackContainer.innerHTML = `<p style="color: red;">Incorrect. The correct answer is: ${correctAnswer}</p>`;
    }

    answers.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        selectedChoice: selectedChoice,
        correctAnswer: correctAnswer,
        isCorrect: selectedChoice === correctAnswer
    });

    nextButton.style.display = '';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
	const body = document.body;
    body.innerHTML = `<h2>Your score: ${score} / ${shuffledQuestions.length}</h2>`;

	answers.forEach(answer => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-review';
        answerElement.innerHTML = `
            <p>Question: ${answer.question}</p>
            <p>Your answer: ${answer.selectedChoice}</p>
            <p>Correct answer: ${answer.correctAnswer}</p>
            <p>${answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
            <hr>
        `;
        body.appendChild(answerElement);
    });
}

let cors_anywhere = "https://cors-anywhere.herokuapp.com/"
let url = prompt("Enter your question source");

fetch(cors_anywhere + url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
  })
  .then(jsonData => {
    questions = jsonData;
	startQuiz();
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  }
 );
