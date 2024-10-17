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
var submitBtnSpinner = document.getElementById("submit-source-spinner");
var submitBtnText = document.getElementById("submit-source-text");
var submitBtn = document.getElementById("submit-source");
var messageInputModal = document.getElementById("message");
var sourceInput = document.getElementById("source_link");

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

    const isCorrect = correctAnswers.includes(selectedChoice);

    if (isCorrect) {
        feedbackContainer.innerHTML = '<p style="color: green;">Correct!</p>';
        score++;
    } else {
        feedbackContainer.innerHTML = `<p style="color: red;">Incorrect. The correct answer is: ${correctAnswer}</p>`;
    }

    answers.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        selectedChoice: selectedChoice,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
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
    
    submitBtnSpinner.style.display = "flex";
    submitBtnText.innerText = "Loading...";
    submitBtn.disabled = true;
    const link = sourceInput.value
    let cors_url = cors_anywhere + link;
    fetch_data(cors_url, link);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isValidUrl(string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|localhost|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(string);
}

function fetch_data(cors_url, url) {
    if (!isValidUrl(url)) {
        messageInputModal.innerText = "Invalid source link, please enter a proper link.";
        messageInputModal.style.display = "block";
        submitBtnSpinner.style.display = "none";
        submitBtnText.innerText = "Submit";
        submitBtn.disabled = false;
        sourceInput.value = "";
        return;
    }

    setTimeout(() => {
        fetch(cors_url)
            .then(response => {
                if (!response.ok) {
                    modal.style.display = "block";
                    return Promise.reject('CORS request failed: ' + response.statusText);
                }

                return response.json().catch(() => {
                    messageInputModal.innerText = "Invalid source link, make sure it follows the [{}, {}] structure requirement.";
                    messageInputModal.style.display = "block";
                    submitBtnSpinner.style.display = "none";
                    submitBtnText.innerText = "Submit";
                    submitBtn.disabled = false;
                    sourceInput.value = "";
                    return Promise.reject('Invalid JSON format');
                });
            })
            .then(jsonData => {
                questions = jsonData;
                startQuiz();
                inputModal.style.display = "none";
            })
            .catch(error => {
                if (error.message.includes('CORS request failed')) {
                    console.error(error);
                } else {
                    messageInputModal.innerText = "Invalid source link, please enter a proper link.";
                    messageInputModal.style.display = "block";
                }
            });
    }, 1000);
}

inputModal.style.display = "block";