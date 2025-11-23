function showHit(parentElement, checkboxIcon){
  parentElement.classList.add("questions-container--hit")
  checkboxIcon.classList.remove("hidden")
}

function showWrong(parentElement, checkboxIcon, answersInputs){
  parentElement.classList.add("questions-container--wrong")
  checkboxIcon.classList.remove("hidden")

  answersInputs.forEach( it => {
    it.nextElementSibling.children[0].classList.remove("hidden")
    it.parentElement.classList.add("questions-container--hit")
  })
}

function correctAnswersInputs(inputs, answers){
  const answersInputs = []
  inputs.forEach((it) => {
    if (answers.includes(it.value)) answersInputs.push(it)
  })

  return answersInputs
}

export function showAnswerEvent(answers) {
  const checksInputs = document.querySelectorAll("[data-js='checkbox-input']")
  const correctAnswers = correctAnswersInputs(checksInputs, answers)

  checksInputs.forEach((it) => {
    const { parentElement, nextElementSibling } = it
    const checkboxIconHit = nextElementSibling.children[0]
    const checkboxIconWrong = nextElementSibling.children[1]

    it.addEventListener("input", (event) => {

      const { value } = event.currentTarget
      const isCorrect = answers.includes(value)
  
      if (isCorrect) {
        showHit(parentElement, checkboxIconHit)
      } else {
        showWrong(parentElement, checkboxIconWrong, correctAnswers)
      }
    })
  })
}
