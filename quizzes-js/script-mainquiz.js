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
        question: 'If I vote, it does not make a difference',
        answers: [
            { text: 'True', correct: false},
            { text: 'False', correct: true}
        ]
      },
      {
        question: 'What helps slow down the spread of COVID',
        answers: [
          { text: 'Wearing masks when around others', correct: true },
          { text: 'Practice social distancing from those not in your household', correct: true },
          { text: 'Making sure to wash your hands after touching things that other people might have', correct: true },
          { text: 'Getting the COVID vaccine', correct: true }
        ]
      },
    {
      question: 'If you are a cop and ever commit a crime on the job, your charges will be dropped.',
      answers: [
        { text: 'True', correct: false},
        { text: 'False', correct: true}
      ]
    }
]