const questions = [
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: 2
    },
    {
        question: "What keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        answer: 2
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Float",
            "Undefined"
        ],
        answer: 2
    },
    {
        question: "What does async/await help with?",
        options: [
            "Styling HTML",
            "Handling asynchronous operations",
            "Creating databases",
            "Declaring variables"
        ],
        answer: 1
    }
];

const qContent = document.querySelector('.qContent');
const question = document.querySelector('.question');


const formSelector = document.querySelector('.formSelector');
// const clickedButtonContainer = document.querySelector('.buttonOperator');
const scoreSpace = document.querySelector('.scoreSpace');
// buttons
const questionOptions = document.querySelector('.questionOptions');
const buttonStorage = document.querySelector(".buttonStorage");
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const submit = document.getElementById('submit');


let questionCount = 0;

function renderUi(questionCount) {
    // let questionCount = 0;
    questionOptions.replaceChildren();

    previous.remove();
    next.remove();
    submit.remove();

    console.log(questionCount, questions.length);
    if (questionCount == 0) {
        buttonStorage.appendChild(next);
    }
    else if (questionCount == questions.length - 1) {
        buttonStorage.appendChild(previous);
        buttonStorage.appendChild(submit);
    }
    else {
        buttonStorage.appendChild(previous);
        buttonStorage.appendChild(next);
    }


    question.textContent = `${questions[questionCount].question}`;
    for (let i = 0; i < questions[questionCount].options.length; i++) {
        const inputOK = document.createElement('input');
        inputOK.type = "radio";
        inputOK.name = `questionOption`;
        const label = document.createElement('label');
        label.textContent = `${questions[questionCount].options[i]}`;
        inputOK.value = `${questions[questionCount].options[i]}`;
        label.prepend(inputOK);
        questionOptions.appendChild(label);
    }
}

formSelector.addEventListener('click', clickHandler);

const answerList = [];

function buttonHandler(event, inputValueYES = null) {
    // console.log("DOM clicked element:", inputValue);
    if (event.target.dataset.id == "previous") {
        questionCount = questionCount - 1;
        renderUi(questionCount);
        return; // new learning unlocked, stops program such that next null checking won't trigger
        // inputValue = null;
    }

    if (inputValueYES === null) {
        window.alert('Please pick an option first!');
        return;
    }
    console.log(inputValue);

    if (event.target.dataset.id == "next") {
        questionCount = questionCount + 1;
        renderUi(questionCount);
        inputValue = null;
    }

    else if (event.target.dataset.id == "submit") {
        let correctAnswers = 0;
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            let answerIndex = questions[i].answer;
            if (answerList[i] === questions[i].options[answerIndex]) {
                score = score + 1;
            }
        }
        scoreSpace.textContent = `Your score: ${score} out of ${questions.length}`;
    }
    // inputValue = null;
}

function inputHandler(event) {
    if (event.target.matches('input[type="radio"]')) {
        inputValue = event.target.value;
        answerList[questionCount] = inputValue;
        return inputValue;
    }
}

let inputValue = null;

function clickHandler(event) {
    if (event.target.tagName === "BUTTON") {
        buttonHandler(event, inputValue);
        // inputValue = null;
    }
    if (event.target.tagName === "LABEL") {
        // inputHandler(event);
        return;
    }
    else if (event.target.tagName === "INPUT") {
        inputValue = inputHandler(event);
        // inputValuePasser(inputValue);
    }
}



renderUi(questionCount);