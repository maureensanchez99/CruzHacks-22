const beginButton = document.getElementById('begin-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('questions')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions, currentQuestionIndex //so variables can be redefined later on

beginButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz() {
    beginButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')    
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
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
}
  
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Everyone in Calfornia wants to be in the entertainment industry. ',
        answers: [
            { text: 'True', correct: false},
            { text: 'False', correct: true}
        ]
    },
    {
      question: 'Everyone who live in California has been to Hollywood and know a celebrity.',
      answers: [
        { text: 'True', correct: false},
        { text: 'False', correct: true}
      ]
    },
    {
      question: 'Northern and Southern California are like chalk and cheese in terms of local culture.',
      answers: [
        { text: 'True', correct: true},
        { text: 'False', correct: false}
      ]
    },
    {
      question: 'California has both the highest and lowest point in the continental United States',
      answers: [
        { text: 'True', correct: true },
        { text: 'False', correct: false }
      ]
    },
    {
        question: 'What city was the state capitol orginally in?',
        answers: [
            {text: 'Sacramento', correct: false},
            {text: 'San Jose', correct: true},
            {text: 'San Francisco', correct: false},
            {text: 'Santa Barbara', correct: false}
        ]
    }
]