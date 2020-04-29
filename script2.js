
// WHEN the game is over
// THEN I can save my initials and score

//global constants
//start button
const startButton = document.getElementById('start-btn')
//next button
const nextButton = document.getElementById('next-btn')
//score button
const scoreButton = document.getElementById('score-btn')
//variable to define if the quiz is over
let isOver = false
score = 0
//initial time in count down
let count = 60
//time in seconds 
const timer = document.getElementById('timer')
//variable for question container
const questionContainerElement = document.getElementById
 ('question-container')
//variable for each question
 const questionElement = document.getElementById('question')
//variable for answer buttons
 const answerButtonsElement = document.getElementById('answer-buttons')
//variable for score board
const scoreElement = document.getElementById('scoreBoard')
//variable for saving name/score
const saveScoreBtn = document.getElementById('saveScoreBtn')


//random order for questions
let shuffledQuestions, currentQuestionIndex
//show timer on page
document.getElementById('timer').innerHTML = `Time Remaining: ${Math.floor(count / 60)} minutes ${count % 60} seconds`
// THEN a timer starts and I am presented with a question //functions for timer
function timerUpdater () {
    count--
    //display timer on page
    document.getElementById('timer').innerHTML = `Time Remaining: ${Math.floor(count / 60)} minutes ${count % 60} seconds`
    //when timer reaches 0 // THEN the game is over
    if (count <= 0) {
        //clear timer
        window.clearInterval(myTimer)
        console.log("time up")
        //hide question container
        questionContainerElement.classList.add('hide')
        //show score board
        scoreElement.classList.remove('hide')
        //hide start button
        startButton.classList.add('hide');
        //hide next button
        nextButton.classList.add('hide');
}}
//GIVEN I am taking a code quiz // WHEN I click the start button
//when clicked, present first question
startButton.addEventListener('click', () =>{
    console.log("start game")
    startGame()
    myTimer = window.setInterval(timerUpdater, 1000)
})
//when next clicked
nextButton.addEventListener('click', () => {
    //goes to next question and run function
    currentQuestionIndex++
    setNextQuestion()
})
//start game
function startGame () {
    //quiz is not over
    isOver = false
    //hide start button
    startButton.classList.add('hide')
    // shuffles questions randomly
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    console.log(shuffledQuestions)
    //start questions at beginning
    currentQuestionIndex = 0
    //unhide the questioncontainer
    questionContainerElement.classList.remove('hide')
    //show next question
    setNextQuestion()  
}
// WHEN I answer a question// THEN I am presented with another question
//set next question
function setNextQuestion () {
    //quiz is not over
    isOver = false
    //reset everything back to default
    resetState()
    //shuffle next question
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
//show question
function showQuestion (question) {
    //quiz is not over
    isOver = false
    //write question each time
    questionElement.innerText = question.question
    //write answers for each question
    question.answers.forEach(answer => {
        //creating buttons for each answer
        const button = document.createElement('button')
        //display text from answers
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            answerButtonsElement.appendChild(button)
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
//reset to default state for each new question
function resetState(){
    clearStatusClass(document.body)
    //hide next button button until selected answer is clicked
    nextButton.classList.add('hide')
    //loop through children
    while (answerButtonsElement.firstChild) {
        //if child, remove it
        answerButtonsElement.removeChild
        //remove first child
        (answerButtonsElement.firstChild)
    }
}
//WHEN I answer a question incorrectly// THEN time is subtracted from the clock
//check for correct
function getScore (correct) {
    localStorage.setItem('mostRecentScore', score);
    //which is a string, must call the string
    if (correct === "true") {
        //add one to the score
        score++
        //log score in console
        console.log(score)
        //most recent score variable to store score
    const mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore'));
    //turn score back into number
    parseInt('mostRecentScore')
    //write most recent score at final score at end of game
    document.getElementById('finalScore').innerHTML = mostRecentScore;
    //write most recent score in space for final score at end of game, changing string into number
    finalScore.innerText = mostRecentScore;
        //if not correct
    } else {
        //lose time on quiz
        count--
    const mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore'));
    //turn score back into number
    //write most recent score at final score at end of game, changing string into number
    document.getElementById('finalScore').innerHTML = parseInt(mostRecentScore);
    }
}
//define the username for score board
const username = document.getElementById('username')
//event listener for key up when entering username for scoreboard
username.addEventListener('keyup', () => {
    //log the input typed by user in console
    console.log(username.value);
    //enable the save button to submit name
});
//save high score to local storage
saveHighScore = (e) => {
    //confirm when button is clicked, reaches the console log
    console.log("clicked the save button!")
    //prevents browser from refreshing when form is submitted
    e.preventDefault();
};
//set answer from event
function selectAnswer (e) {
    //set const for everytime a button is selected
    const selectedButton = e.target
    //set const for everytime a correct button is selected from answers provided
    const correct = selectedButton.dataset.correct
    getScore(correct)
    //need to pass correct to score
    setStatusClass(document.body, correct)
    //create array to use for each loop
    Array.from(answerButtonsElement.children).forEach(button => {
        //take button and check if correct
        setStatusClass(button, button.dataset.correct)
    //validating answers
        })
    //if still more questions to go through
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        //game is not over
        isOver = false
        //show next button
        nextButton.classList.remove('hide')
    } else {
        //quiz is over
        isOver = true
        //hide question container
        questionContainerElement.classList.add('hide')
        //show score board
        scoreElement.classList.remove('hide')
        //hide start button
        startButton.classList.add('hide')
        //hide next button
        nextButton.classList.add('hide')
    }   
}
//set status of each button if correct or wrong by color
function setStatusClass(element, correct) {
    //clear all class status
    clearStatusClass(element)
    if(correct) {
        //color green
        element.classList.add('correct')
    } else {
        //color red
        element.classList.add('wrong')
    }
}
//reset to default setting for next question
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
//array literal of Questions to make an object literal for each question and their answers
const questions = [
    {
        question: 'Where is the information of your answers being stored for this quiz?',
        answers: [
            { text: 'GitHub', correct: false},
            { text: 'Session Storage', correct: false},
            { text: 'Local Storage', correct: true},
            { text: 'Cookies', correct: false}
        ]
    },
    {
        question: 'Which of the following is a data type of JavaScript?',
        answers: [
            { text: 'Boolean', correct: true},
            { text: 'Strong', correct: false},
            { text: 'Nall', correct: false},
            { text: 'Div', correct: false}
        ]
    },
    {
        question: 'Which is the correct way to write a function?',
        answers: [
            { text: 'function hotdog () {}', correct: false},
            { text: 'const hotdog = function () {}', correct: false},
            { text: 'const hotdog = () => {}', correct: false},
            { text: 'All the above', correct: true}
        ]
    },
    {
        question: 'Which will allow you to convert a string to a number in JavaScript?',
        answers: [
            { text: 'parseInt()', correct: true},
            { text: '===', correct: false},
            { text: 'intParse()', correct: false},
            { text: 'JSON.stringify()', correct: false}
        ]
    },
    {
        question: "What would be the the result of 4 + 8 + '2'?",
        answers: [
            { text: '14', correct: false},
            { text: '122', correct: true},
            { text: '410', correct: false},
            { text: '6', correct: false}
        ]
    }
];

