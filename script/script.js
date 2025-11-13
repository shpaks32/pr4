document.addEventListener('DOMContentLoaded', function () {
  const btnOpenModal = document.querySelector('#btnOpenModal')
  const modalBlock = document.querySelector('#modalBlock')
  const closeModal = document.querySelector('#closeModal')
  const questionTitle = document.querySelector('#question')
  const formAnswers = document.querySelector('#formAnswers')

  const prevButton = document.querySelector('#prev')
  const nextButton = document.querySelector('#next')
  const sendButton = document.querySelector('#send')

  const questions = [
    {
      question: 'Якого кольору бургер?',
      answers: [
        { title: 'Стандарт', url: './image/burger.png' },
        { title: 'Чорний', url: './image/burgerBlack.png' }
      ],
      type: 'radio'
    },
    {
      question: "З якого м'яса котлета?",
      answers: [
        { title: 'Курка', url: './image/chickenMeat.png' },
        { title: 'Яловичина', url: './image/beefMeat.png' },
        { title: 'Свинина', url: './image/porkMeat.png' }
      ],
      type: 'radio'
    },
    {
      question: 'Додаткові інгредієнти ?',
      answers: [
        { title: 'Помідор', url: './image/tomato.png' },
        { title: 'Огірок', url: './image/cucumber.png' },
        { title: 'Салат', url: './image/salad.png' },
        { title: 'Цибуля', url: './image/onion.png' }
      ],
      type: 'checkbox'
    },
    {
      question: 'Додати соус?',
      answers: [
        { title: 'Часниковий', url: './image/sauce1.png' },
        { title: 'Томатний', url: './image/sauce2.png' },
        { title: 'Гірчичний', url: './image/sauce3.png' }
      ],
      type: 'radio'
    }
  ]

  let numberQuestion = 0

  const checkButtons = () => {
    if (numberQuestion === 0) {
      prevButton.classList.add('d-none')
    } else {
      prevButton.classList.remove('d-none')
    }

    if (numberQuestion === questions.length - 1) {
      nextButton.classList.add('d-none')
      sendButton.classList.remove('d-none')
    } else {
      nextButton.classList.remove('d-none')
      sendButton.classList.add('d-none')
    }
  }

  const renderQuestions = index => {
    const currentQuestion = questions[index]
    questionTitle.textContent = currentQuestion.question

    let answersHtml = ''

    currentQuestion.answers.forEach((answer, i) => {
      answersHtml += `
        <div class="answers-item d-flex flex-column">
            <input 
              type="${currentQuestion.type}" 
              id="answerItem${i}" 
              name="answer" 
              class="d-none" 
              value="${answer.title}"
            >
            <label for="answerItem${i}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                <span>${answer.title}</span>
            </label>
        </div>
      `
    })

    formAnswers.innerHTML = answersHtml
  }

  nextButton.addEventListener('click', () => {
    if (numberQuestion < questions.length - 1) {
      numberQuestion++
      playTest()
    }
  })

  prevButton.addEventListener('click', () => {
    if (numberQuestion > 0) {
      numberQuestion--
      playTest()
    }
  })

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    numberQuestion = 0
    playTest()
  })

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block')
  })

  const playTest = () => {
    renderQuestions(numberQuestion)
    checkButtons()
  }
})
