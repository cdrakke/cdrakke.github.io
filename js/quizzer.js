let questions = [];

let currentQuestionIndex = 0;
let shuffledQuestions = [];
let shuffledChoices = [];
let score = 0;
let answers = [];

let cors_anywhere = "https://cors-anywhere.herokuapp.com/"

var modal = document.getElementById("myModal");
var invalidmodal = document.getElementById("secondmodal");
var span = document.getElementsByClassName("close")[0];
var inputModal = document.getElementById("inputModal");

span.onclick = function() {
  modal.style.display = "none";
  invalidmodal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
            <p class="${answer.isCorrect ? 'correct' : 'incorrect'}">${answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
            <hr>
        `;
        body.appendChild(answerElement);
    });
}


function parseSource() {
    var sourceInput = document.getElementById("source_link");
    const link = sourceInput.value
    let cors_url = cors_anywhere + link;
    fetch_data(cors_url, link);
}

function fetch_data(cors_url, url) {
    fetch(cors_url).then(
        response => {
            if (!response.ok) {
                modal.style.display = "block";
                console.error('Network response was not ok ' + response.statusText);

                fetch(url).then(
                    response => {
                        if (!response.ok) {
                            console.error('Invalid Question Source' + response.statusText);
                        }
                            return response.json(); 
                    }).then(
                        jsonData => {
                            questions = jsonData;
                            startQuiz();
                            inputModal.style.display = "none";

                    })
            }
                return response.json(); 
        }).then(
            jsonData => {
                questions = jsonData;
                startQuiz();
                inputModal.style.display = "none";
        }
    )
}

inputModal.style.display = "block";