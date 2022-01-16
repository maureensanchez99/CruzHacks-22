const beginButton = document.getElementById('begin-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('questions')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions, currentQuestionIndex //so variables can be redefined later on

beginButton.addEventListener('click', startQuiz)

function startQuiz() {
    console.log('Started')
    beginButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
   showQuestion(shuffleQuestions[currentQuestionIndex])
}   
    
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {

}

const questions = [
    {
        question: 'Everyone in Calfornia wants to be in the entertainment industry. ',
        answers: [
            { text: 'True', correct: false},
            { text: 'False', correct: true}
        ]
    }
]