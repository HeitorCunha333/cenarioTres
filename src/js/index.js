import { Database } from "./repository/Database.js"
import { getValidPosition } from "./utils/randomOptions.js"
import { showAnswerEvent } from "./event/showAnswerEvent.js"
import { nextQuestionEvent } from "./event/nextQuestionEvent.js"
import { currentPageEvent } from "./event/currentPageEvent.js"

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
    const uniqueId = `question-${questionNumber}-option-${position}`

    html += `
    <div class="questions-container__options-box">
    <!-- Pergunta ${idx + 1}-->
    <label class="questions-container__option" for="${uniqueId}">
                <input type="${
                  isCheckBox ? "checkbox" : "radio"
                }" id="${uniqueId}" data-js="checkbox-input" name="${questionNumber}" value="${item}">
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

  questions.forEach((it) => {
    const questBox = document.createElement("div")
    questBox.classList.add("questions-container__quest-box")
    questBox.setAttribute("data-js", "quest-box")

    const isCheckBox = it.answers.length > 1
    questBox.innerHTML += renderImg(it)
    questBox.innerHTML += renderTitle(it)
    questBox.innerHTML += renderOptions(it.options, it.id, isCheckBox)

    questionContainer.appendChild(questBox)

    showAnswerEvent(questBox,it.answers)
  })

  questionContainer.children[0].classList.add("questions-container--show-quest-box")
  nextQuestionEvent()
  currentPageEvent().findCurrentIndex()
  currentPageEvent().refresh()
})()

