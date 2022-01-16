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
      question: 'Who is the best YouTuber?',
      answers: [
        { text: 'Web Dev Simplified', correct: true },
        { text: 'Traversy Media', correct: true },
        { text: 'Dev Ed', correct: true },
        { text: 'Fun Fun Function', correct: true }
      ]
    },
    {
      question: 'Is web development fun?',
      answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    }
]