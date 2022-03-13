console.log("Working!");

// Declare Variables

let timeLeft = 0;
let currentScore = 0;
const startBtn = document.querySelector(".start-btn");

const startSection = document.querySelector("#start");
const questionsSection = document.querySelector("#questions");
const scoringSection = document.querySelector("#scoring");
const endSection = document.querySelector("#end");
const timer = document.querySelector("#timer")

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

const scoreList = document.querySelector("ul")

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
    {question: "Test0", answerA:"Loremg", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "B"},
    {question: "Test1", answerA:"Lorem4", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "C"},
    {question: "Test2", answerA:"Lorem436", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "A"},
    {question: "Test3", answerA:"Lorem4", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "C"},
    {question: "Test4", answerA:"Loremy", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "B"},
    {question: "Test5", answerA:"Loremuu", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "B"},
    {question: "Test6", answerA:"Loremh", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "A"},
    {question: "Test7", answerA:"Loremg", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "D"},
    {question: "Test8", answerA:"Loremd", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "D"},
    {question: "Test9", answerA:"Loremk", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "B"},
    {question: "Test10", answerA:"dfg", answerB: "Ipsum", answerC:"Yed", answerD: "Test2", correctAnswer: "C"},
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
    timer.innerHTML = "Time Left : " + timeLeft
    console.log(timeLeft)
    questionsTimer = setInterval(function(){
        timer.innerHTML = "Time Left : " + timeLeft.toFixed(1)
        if (timeLeft < 0) {
            clearInterval()
            timer.innerHTML = ""
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
        question.innerHTML = questionList[questionNumber].question;
        answerA.innerHTML = "A - " + questionList[questionNumber].answerA;
        answerB.innerHTML = "B - " + questionList[questionNumber].answerB;
        answerC.innerHTML = "C - " + questionList[questionNumber].answerC;
        answerD.innerHTML = "D - " + questionList[questionNumber].answerD;
    }   
}

function checkAnswer(event) {
    if (questionList[questionOrder[currentQuestion]] != undefined) {
        if (event.target.dataset.id === questionList[questionOrder[currentQuestion-1]].correctAnswer) {
            console.log("Correct!")
            currentScore++
            timeLeft = timeLeft + 5
        } else {
            timeLeft = timeLeft - 5
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
                timer.innerHTML = ""
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

function renderScores() {
    for (let i = 0; i < savedScores.length; i++){
        let savedScore = savedScores[i];
    
        const score = document.createElement("li");
        score.textContent = `Name: ${savedScore.userName} | Score: ${savedScore.userScore}/${savedScore.questionLength} | Time Left: ${savedScore.userTime} Seconds`
    
        scoreList.appendChild(score);
    }
}
    
userForm.addEventListener("submit", function(event){
    event.preventDefault();
    if (JSON.parse(localStorage.getItem("localSavedScores")) !== null) {
        savedScores = JSON.parse(localStorage.getItem("localSavedScores"))
    }
    let userData = {
        userName: userInput.value.trim(),
        userScore: currentScore,
        questionLength: questionList.length,
        userTime: timeLeft.toFixed(1)
    }
    savedScores.push(userData)
    console.log(savedScores)
    localStorage.setItem("localSavedScores", JSON.stringify(savedScores))
    changeSlide(scoringSection, endSection)
    renderScores()
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
