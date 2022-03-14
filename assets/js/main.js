console.log("Working!");

// Declare Variables

let timeLeft = 0;
let currentScore = 0;
const startBtn = document.querySelector(".start-btn");

const highBtn = document.querySelector(".high-btn")
const closeBtn = document.querySelector(".close-btn")

const main = document.querySelector("main");
const startSection = document.querySelector("#start");
const questionsSection = document.querySelector("#questions");
const scoringSection = document.querySelector("#scoring");
const endSection = document.querySelector("#end");
const timer = document.querySelector("#timer")
const highScores = document.querySelector("#high-scores")

let currentQuestion = 0
let question = document.querySelector("#question")
let answerA = document.querySelector("[data-id='A']")
let answerB = document.querySelector("[data-id='B']")
let answerC = document.querySelector("[data-id='C']")
let answerD = document.querySelector("[data-id='D']")
let answerBtn = document.querySelectorAll(".answer-btn")

const scoringMsg = document.querySelector("#scoring-msg")
const scoringCaption = document.querySelector("#scoring-caption")
const userInput = document.querySelector("#user-input")
const userForm = document.querySelector("form")

const scoreList = document.querySelector("#end-list")
const highList = document.querySelector("#high-list")


const replayBtn = document.querySelector(".replay-btn");
const resetBtn = document.querySelector(".reset-btn");

// Change Screen Function

function changeSlide(hide, show) {
    hide.style.display = "none";
    show.style.display = "block";
}

// Start Quiz 

// Generate Question Order
const questionList = [
    {question: "Inside which HTML element do we put the JavaScript?", answerA:"<js>", answerB: "<sript>", answerC:"<scripting>", answerD: "<javacript>", correctAnswer: "B"},
    {question: "Determine the result - String(“Hello”) === “Hello”;", answerA:"True", answerB: "False", answerC:"SyntaxError", answerD: "Reference Error", correctAnswer: "A"},
    {question: "What is the correct JavaScript syntax to print “DataFlair” in the console?", answerA:" print(“DataFlair”);", answerB: "console.print(“DataFlair”);", answerC:"log.console(“DataFlair”);", answerD: "console.log(“DataFlair”);", correctAnswer: "D"},
    {question: "Which of the following print content on the browser window?", answerA:"document.write(“print content”);", answerB: "response.write(“print content”);", answerC:"document.write(print content);", answerD: "write(“print content”);", correctAnswer: "C"},
    {question: "Which method will you use to round the number 24.76 to the nearest integer?", answerA:"round(24.76);", answerB: "rnd(24.76);", answerC:"Math.round(24.76);", answerD: "Math.rnd(24.76);", correctAnswer: "C"},
    {question: "Which of the following statements will show a message as well as ask for user input in a popup?", answerA:"alert()", answerB: "prompt()", answerC:"confirm()", answerD: "message()", correctAnswer: "B"},
    {question: "Which of the following is an event listener in JavaScript?", answerA:"onclick", answerB: "blur", answerC:"click", answerD: "click()", correctAnswer: "C"},
    {question: "What are the advantages that JavaScript provides for forms?", answerA:"Bandwidth conservation", answerB: "Form validation", answerC:"Increased user satisfaction", answerD: "All of the above", correctAnswer: "D"},
    {question: "What is the syntax of a “for” statement in JavaScript?", answerA:"for(increment; condition; initialization)", answerB: "for(initialization, condition, increment)", answerC:"for(condition; initialization; increment)", answerD: "for(initialization; condition; increment)", correctAnswer: "D"},
    {question: "Which of the given options is an incorrect variable name?", answerA:"javascript", answerB: " _javascript", answerC:"$javascript", answerD: "-javascript", correctAnswer: "D"},
    {question: "How do you find the minimum of x and y using JavaScript?", answerA:"min(x,y);", answerB: "Math.min(x,y)", answerC:"Math.min(xy)", answerD: "min(xy);", correctAnswer: "B"},
]

function generateNewQuestionOrder() {
    function generateArrayOfNumbers (numbers) {
        return [...Array(numbers).keys()]
    }
    function shuffleArray(arr) {
        arr.sort(() => Math.random() - 0.5);
    }
    const questionListOrdered = generateArrayOfNumbers(questionList.length);
    shuffleArray(questionListOrdered);
    return questionListOrdered;
}

let questionOrder = generateNewQuestionOrder()

// Timer

let questionsTimer = null;

function startTimer() {
    timeLeft = 60
    timer.textContent = "Time Left : " + timeLeft
    console.log(timeLeft)
    questionsTimer = setInterval(function(){
        timer.textContent = "Time Left : " + timeLeft.toFixed(1)
        if (timeLeft < 0) {
            clearInterval(questionsTimer)
            timer.textContent = ""
            changeSlide(questionsSection, scoringSection)
            scoringMsg.textContent = "Oh No!"
            scoringCaption.textContent = "Sorry you ran out of time."
        } else {
            timeLeft = timeLeft - 0.1
        }
    } ,100);
}

console.log(currentQuestion)

function fillQuestions(){
    console.log(questionList[questionOrder[currentQuestion]])
    if (questionList[questionOrder[currentQuestion]] != undefined) {
        let questionNumber = questionOrder[currentQuestion];
        question.textContent = questionList[questionNumber].question;
        answerA.textContent = questionList[questionNumber].answerA;
        answerB.textContent = questionList[questionNumber].answerB;
        answerC.textContent = questionList[questionNumber].answerC;
        answerD.textContent = questionList[questionNumber].answerD;
    }   
}

const answerBox = document.querySelector(".answer")

function printAnswer(answer) {
    answerBox.textContent = answer
}

function checkAnswer(event) {
    if (questionList[questionOrder[currentQuestion]] != undefined) {
        if (event.target.dataset.id === questionList[questionOrder[currentQuestion-1]].correctAnswer) {
            console.log("Correct!")
            currentScore++
            timeLeft = timeLeft + 5
            printAnswer("Correct!")
        } else {
            timeLeft = timeLeft - 10
            printAnswer("Incorrect!")
        }
    }
}


function startQuiz() {
    startTimer()
    fillQuestions()
    for (var i = 0; i < 4; i++){
        answerBtn[i].addEventListener("click", function(){
            if (currentQuestion === questionList.length-1){
                changeSlide(questionsSection, scoringSection)
                scoringMsg.textContent = "Congratulations!"
                scoringCaption.textContent = "You finished all the questions."
                timer.textContent = ""
                clearInterval(questionsTimer)
            }
            currentQuestion++;
            checkAnswer(event);
            fillQuestions();
        }) 
    }

}

startBtn.addEventListener("click", function(){
    changeSlide(startSection, questionsSection);
    startQuiz()
})


// Scoring 

let savedScores = []

function renderScores(list) {
    for (let i = 0; i < savedScores.length; i++){
        let savedScore = savedScores[i];
        console.log("Test")
        const score = document.createElement("li");
        score.textContent = `Name: ${savedScore.userName} | Score: ${savedScore.userScore}/${savedScore.questionLength} | Time Left: ${savedScore.userTime} Seconds`
    
        list.appendChild(score);
    }
}

function checkNeg(number) {
    if (number <= 0) {
        return 0;
    } else {
        return number;
    }
}

userForm.addEventListener("submit", function(event){
    event.preventDefault();
    if (userInput.value == "") {
        return
    }
    scoringSection.style.display = "none";
    if (JSON.parse(localStorage.getItem("localSavedScores")) !== null) {
        savedScores = JSON.parse(localStorage.getItem("localSavedScores"))
    }
    let userData = {
        userName: userInput.value.trim(),
        userScore: currentScore,
        questionLength: questionList.length,
        userTime: checkNeg(timeLeft.toFixed(1))
    }
    savedScores.push(userData)
    console.log(savedScores)
    localStorage.setItem("localSavedScores", JSON.stringify(savedScores))
    
    changeSlide(scoringSection, endSection)
    renderScores(scoreList)
})

resetBtn.addEventListener("click", function(){
    localStorage.clear();
    savedScores = JSON.parse(localStorage.getItem("localSavedScores"))
    while (scoreList.hasChildNodes()) {
        scoreList.removeChild(scoreList.firstChild);
      }
})

replayBtn.addEventListener("click", function(){
    location.reload()
})

highBtn.addEventListener("click", function(){
    console.log("Click")
    if (JSON.parse(localStorage.getItem("localSavedScores")) !== null) {
        savedScores = JSON.parse(localStorage.getItem("localSavedScores"))
        renderScores(highList)
    } 

    closeBtn.style.display = "block"
    highBtn.style.display = "none"
    highScores.style.display = "flex"
    main.style.filter = "blur(5px)"
})

closeBtn.addEventListener("click", function(){
    while (highList.hasChildNodes()) {
        highList.removeChild(highList.firstChild);
      }
    highBtn.style.display = "block"
    closeBtn.style.display = "none"
    highScores.style.display = "none"
    main.style.filter = "blur(0px)"
})
