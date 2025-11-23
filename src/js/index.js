import { Database } from "./repository/Database.js"

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

  options.map((it, idx) => {
    html += `
            <div class="questions-container__options-box">
              <!-- Pergunta ${idx + 1}-->
              <label class="questions-container__option" for="${idx}">
                <input type="${isCheckBox ? "checkbox" : "radio"}" id="${idx}" data-js="checkbox-input" name="${questionNumber}" value="${it}">
                ${it}
                <span class="questions-container__checkbox" data-js="checkbox">
                </span>
              </label>
            </div>`
  })

  return html
}


function callEventClick(answers){
  const checksInputs = document.querySelectorAll("[data-js='checkbox-input']")
  checksInputs.forEach( it => {
    it.addEventListener("input", (it) => {
      const { value, checked } = it.currentTarget
  
      

      console.log(value, checked)
    })
    
  })


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
  questionContainer.innerHTML += renderOptions(questions[0].options, questions[0].id, isCheckBox)


  callEventClick(questions[0].answers)
})()
