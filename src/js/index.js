import { Database } from "./repository/Database.js"
import { getValidPosition } from "./utils/randomOptions.js"
import { showAnswerEvent } from "./event/showAnswerEvent.js"

function renderImg(questions) {
  return `
      ${
        questions.imgUrl.length > 0
          ? `
      <div class="questions-container__image ">
        <img src="${questions.imgUrl}" alt="Imagem da pergunta atual">
      </div>`
          : ""
      }
    `
}

function renderTitle(questions) {
  return `<div class="questions-container__title" data-js="title-question">${questions.question}</div>`
}

function renderOptions(options, questionNumber, isCheckBox) {
  let html = ""
  const length = options.length
  const positionsList = getValidPosition(length)

  options.map((_, idx, arr) => {
    const position = positionsList[idx]
    const item = arr[position]

    html += `
    <div class="questions-container__options-box">
    <!-- Pergunta ${idx + 1}-->
    <label class="questions-container__option" for="${position}">
                <input type="${
                  isCheckBox ? "checkbox" : "radio"
                }" id="${position}" data-js="checkbox-input" name="${questionNumber}" value="${item}">
                ${item}
                <span class="questions-container__checkbox" >
                <i class="fa-solid fa-check hidden"></i>
                <i class="fa-solid fa-x hidden"></i>
                </span>
                </label>
                </div>`
  })

  return html
}

;(async () => {
  const questionContainer = document.querySelector(
    "[data-js='question-container']"
  )

  if (!questionContainer) {
    return
  }

  const databaseRep = new Database("/data/database.json")
  const data = await databaseRep.fetchData()
  const questions = await data.getQuestions()

  const isCheckBox = questions[0].answers.length > 1
  questionContainer.innerHTML += renderImg(questions[0])
  questionContainer.innerHTML += renderTitle(questions[0])
  questionContainer.innerHTML += renderOptions(
    questions[0].options,
    questions[0].id,
    isCheckBox
  )

  showAnswerEvent(questions[0].answers)
})()
