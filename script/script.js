import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js'
import {
  getDatabase,
  ref,
  push
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBWbvlEJ1BSgYhC74y3DBL92Cd_bAnglcI',
  authDomain: 'burger-quiz-54003.firebaseapp.com',
  databaseURL:
    'https://burger-quiz-54003-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'burger-quiz-54003',
  storageBucket: 'burger-quiz-54003.firebasestorage.app',
  messagingSenderId: '44040331208',
  appId: '1:44040331208:web:2ca09ce189273d88782afd',
  measurementId: 'G-H8JZPSLF8X'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

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
      question: 'Додаткові інгредієнти?',
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
    },
    {
      question: 'Enter your number',
      answers: [],
      type: 'number'
    }
  ]

  let numberQuestion = 0
  const finalAnswers = []

  const checkButtons = () => {
    switch (numberQuestion) {
      case 0:
        prevButton.classList.add('d-none')
        nextButton.classList.remove('d-none')
        sendButton.classList.add('d-none')
        break

      case questions.length - 1:
        prevButton.classList.remove('d-none')
        nextButton.classList.add('d-none')
        sendButton.classList.remove('d-none')
        break

      default:
        prevButton.classList.remove('d-none')
        nextButton.classList.remove('d-none')
        sendButton.classList.add('d-none')
        break
    }
  }

  const renderQuestions = index => {
    formAnswers.innerHTML = ''
    const currentQuestion = questions[index]
    questionTitle.textContent = currentQuestion.question

    switch (currentQuestion.type) {
      case 'number':
        const item = `
            <div class="answers-item d-flex flex-column w-100">
              <input type="tel" class="form-control" id="numberPhone" placeholder="Введіть ваш номер...">
            </div>
          `
        formAnswers.innerHTML = item
        break

      default:
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
        break
    }
  }

  const collectData = () => {
    const currentQuestion = questions[numberQuestion]
    let answerValue = null

    if (currentQuestion.type === 'checkbox') {
      const checkedItems = formAnswers.querySelectorAll(
        'input[type="checkbox"]:checked'
      )
      if (checkedItems.length > 0) {
        answerValue = Array.from(checkedItems).map(item => item.value)
      }
    } else if (currentQuestion.type === 'radio') {
      const checkedItem = formAnswers.querySelector(
        'input[type="radio"]:checked'
      )
      if (checkedItem) {
        answerValue = checkedItem.value
      }
    } else if (currentQuestion.type === 'number') {
      const inputItem = formAnswers.querySelector('#numberPhone')
      if (inputItem) {
        answerValue = inputItem.value
      }
    }

    if (answerValue) {
      const existingIndex = finalAnswers.findIndex(
        item => item.question === currentQuestion.question
      )
      if (existingIndex !== -1) {
        finalAnswers[existingIndex] = {
          question: currentQuestion.question,
          answer: answerValue
        }
      } else {
        finalAnswers.push({
          question: currentQuestion.question,
          answer: answerValue
        })
      }
    }
  }

  nextButton.addEventListener('click', () => {
    collectData()
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

  sendButton.addEventListener('click', () => {
    collectData()

    const orderData = {
      date: new Date().toLocaleString(),
      details: finalAnswers,
      phone:
        finalAnswers.find(item => item.question === 'Enter your number')
          ?.answer || 'Не вказано'
    }

    const ordersRef = ref(db, 'orders')

    push(ordersRef, orderData)
      .then(() => {
        console.log('Дані успішно відправлені!', orderData)
        modalBlock.classList.remove('d-block')
        alert('Дякуємо! Ваше замовлення прийнято.')

        numberQuestion = 0
        finalAnswers.length = 0
      })
      .catch(error => {
        console.error('Помилка при відправці:', error)
        alert("Сталася помилка. Перевірте з'єднання з інтернетом.")
      })
  })

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    numberQuestion = 0
    finalAnswers.length = 0
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
