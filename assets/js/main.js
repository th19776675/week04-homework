console.log("Working!");

// Declare Variables

let timeLeft = 0;
let currentScore = 0;
const startBtn = document.querySelector(".start-btn");

const startSection = document.querySelector("#start");
const questionsSection = document.querySelector("#questions");
const scoringSection = document.querySelector("#scoring");
const endSection = document.querySelector("#end");

let currentQuestion = 0
let question = document.querySelector("#question")
let answerA = document.querySelector("[data-id='A']")
let answerB = document.querySelector("[data-id='B']")
let answerC = document.querySelector("[data-id='C']")
let answerD = document.querySelector("[data-id='D']")

// Change Screen Function

function changeSlide(hide, show) {
    hide.style.display = "none";
    show.style.display = "block";
}

// Start Quiz 

// Generate Question Order
const questionList = [
    {question: "Test0", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "B"},
    {question: "Test1", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "C"},
    {question: "Test2", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "A"},
    {question: "Test3", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "C"},
    {question: "Test4", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "B"},
    {question: "Test5", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "B"},
    {question: "Test6", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "A"},
    {question: "Test7", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "D"},
    {question: "Test8", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "D"},
    {question: "Test9", answerA:"Lorem", asnwerB: "Ipsum", answerC:"Yed", asnwerD: "Test2", correctAnswer: "B"},
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

function fillQuestions(){
    let questionNumber = questionOrder[currentQuestion];
}



function startQuiz() {
    

}

startBtn.addEventListener("click", function(){
    changeSlide(startSection, questionsSection);
    // startQuiz()
})
