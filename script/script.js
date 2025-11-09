document.addEventListener('DOMContentLoaded', function () {
  const btnOpenModal = document.querySelector('#btnOpenModal')
  const modalBlock = document.querySelector('#modalBlock')
  const closeModal = document.querySelector('#closeModal')
  const questionTitle = document.querySelector('#question')
  const formAnswers = document.querySelector('#formAnswers')

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block')
    playTest()
  })

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block')
  })

  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.textContent = 'Якого кольору бургер ви бажаєте?'

      const burger1_name = 'Стандарт'
      const burger1_img = './image/burger.png'

      const burger2_name = 'Чорний'
      const burger2_img = './image/burgerBlack.png'

      formAnswers.innerHTML = `
              <div class="answers-item d-flex flex-column">
                   <input type="radio" id="answerItem1" name="answer" class="d-none">
                   <label for="answerItem1" class="d-flex flex-column justify-content-between">
                         <img class="answerImg" src="${burger1_img}" alt="burger">
                         <span>${burger1_name}</span>
                   </label>
              </div>
              <div class="answers-item d-flex justify-content-center">
                   <input type="radio" id="answerItem2" name="answer" class="d-none">
                   <label for="answerItem2" class="d-flex flex-column justify-content-between">
                         <img class="answerImg" src="${burger2_img}" alt="burger">
                         <span>${burger2_name}</span>
                   </label>
              </div>
            `
    }

    renderQuestions()
  }
})
