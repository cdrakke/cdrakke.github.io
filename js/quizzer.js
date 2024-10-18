let questions = [];
let originalQuestions = [];

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
var originalBody = document.body.innerHTML;

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
    shuffledQuestions = JSON.parse(JSON.stringify(questions)); // Deep copy
    shuffle(shuffledQuestions);
    shuffledQuestions.forEach(question => {
        const entries = Object.entries(question.choices);
        shuffle(entries);
        question.shuffledChoices = entries;
    });
    displayQuestion();
}

function displayQuestion() {
    const questionNumberContainer = document.getElementById('question-number');
    const questionContainer = document.getElementById('question-container');
    const choicesContainer = document.getElementById('choices-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const nextButton = document.getElementById('next-button');

    questionNumberContainer.innerHTML = "Question #" + (currentQuestionIndex + 1);
    questionContainer.innerHTML = shuffledQuestions[currentQuestionIndex].question;
    choicesContainer.innerHTML = '';
    feedbackContainer.innerHTML = '';
    nextButton.style.display = 'none';

    shuffledQuestions[currentQuestionIndex].shuffledChoices.forEach(([key, value]) => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary choice-button';
        button.innerText = `${value}`;
        button.onclick = () => checkAnswer(value);
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

    const isCorrect = correctAnswer.includes(selectedChoice);

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

function restartQuiz() {
    document.querySelectorAll(".answer-review").forEach(el => el.remove());
    document.querySelectorAll('h2').forEach(e => e.remove());
    document.body.innerHTML = originalBody;

    questions = JSON.parse(JSON.stringify(originalQuestions)); 

    currentQuestionIndex = 0;
    score = 0;
    answers = [];

    startQuiz();
}

function showResults() {
    const body = document.body;
    body.innerHTML = `<h2>Your score: ${score} / ${shuffledQuestions.length}</h2>`;

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.className = 'btn btn-success';
    restartButton.id = 'restart-button';
    restartButton.onclick = restartQuiz;

    body.appendChild(restartButton);

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
    try {
        questions = JSON.parse(url);
        originalQuestions = JSON.parse(JSON.stringify(questions));
        startQuiz();
        inputModal.style.display = "none";
    }
    catch (err) {
        console.log(err);
        console.log("Not raw data.")
    }

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
                originalQuestions = JSON.parse(JSON.stringify(questions));
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