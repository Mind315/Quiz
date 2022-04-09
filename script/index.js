const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "2 + '2'",
        choice1: "'22'",
        choice2: "undefined",
        choice3: "error",
        choice4: "4",
        answer: 1,
    },
    {
        question: ":hover - is it?",
        choice1: "css propetries",
        choice2: "pseudo-class ",
        choice3: "Land Hover",
        choice4: "variable",
        answer: 2,
    },
    {
        question: "selector 'div > *' -  will select",
        choice1: "all nested elements",
        choice2: "all child asterik",
        choice3: "all divs that are greater than *",
        choice4: "nothing",
        answer: 1,
    },
    {
        question: "which pseudo-class does not exist?",
        choice1: ":first-child",
        choice2: ":lang()",
        choice3: ":root",
        choice4: ":nth-first-of-type()",
        answer: 4,
    },
    {
        question: "which pseudo-element does not exist?",
        choice1: "::before",
        choice2: "::last-letter",
        choice3: "::first-letter",
        choice4: "::cue",
        answer: 2,
    },
    {
        question: "which selector does not exist?",
        choice1: "*",
        choice2: "~",
        choice3: "[attr]",
        choice4: "||",
        answer: 4,
    },
    {
        question: "how to include stylesheet?",
        choice1: '<link src="style/style.css">',
        choice2: '<link rel="stylesheet" href="style/style.css">',
        choice3: '<style rel="stylesheet" href="style/style.css">',
        choice4: "style { link: style/style.css }",
        answer: 2,
    },
    {
        question: "what is the default value of the position property?",
        choice1: "fixed",
        choice2: "absolute",
        choice3: "static",
        choice4: "toxic",
        answer: 3,
    },
    {
        question: "which rule is correct?",
        choice1: "h3 { line-height: 16px;}",
        choice2: "h3 { line height: 16px;}",
        choice3: "h3 { line-height: 16px:}",
        choice4: "h3 [ line-height: 16px;]",
        answer: 1,
    },
    {
        question: "CSS - what is it?",
        choice1: "Classes Style Sheets",
        choice2: "Come on Style Sheets ",
        choice3: "CanIUse Style Sheets",
        choice4: "Cascading Style Sheets",
        answer: 4,
    },
];

//количетсво баллов за верный ответ
const pointsForAnswer = 100;
//максисмальное количетсво вопросов
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionsIndex = Math.floor(
        Math.random() * availableQuestions.length
    );
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) {
            return;
        }

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(pointsForAnswer);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
