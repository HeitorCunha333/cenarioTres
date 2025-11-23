import { currentPageEvent } from "./currentPageEvent.js"

export function nextQuestionEvent(onChange) {
  const btnNext = document.querySelector("[data-js='btn-next-page']")
  const btnPrev = document.querySelector("[data-js='btn-prev-page']")
  const questBoxList = document.querySelectorAll("[data-js='quest-box']")

  btnNext.addEventListener("click", () => {
    let index = 0

    // Encontra o índice da questão atual
    questBoxList.forEach((it, idx) => {
      if (it.classList.contains("questions-container--show-quest-box")) {
        index = idx
      }
    })

    // Se já está na última questão, não faz nada
    if (index >= questBoxList.length - 1) {
      console.log("Já está na última questão!")
      return
    }

    // Remove a classe da questão atual
    questBoxList[index].classList.remove("questions-container--show-quest-box")

    // Adiciona a classe na próxima questão
    questBoxList[index + 1].classList.add("questions-container--show-quest-box")
    console.log("Clicou próximo! Index:", index + 1)
    onChange?.()
    currentPageEvent().refresh()
  })

  btnPrev.addEventListener("click", () => {
    let index = 0

    // Encontra o índice da questão atual
    questBoxList.forEach((it, idx) => {
      if (it.classList.contains("questions-container--show-quest-box")) {
        index = idx
      }
    })

    // Se já está na primeira questão, não faz nada
    if (index <= 0) {
      console.log("Já está na primeira questão!")
      return
    }

    // Remove a classe da questão atual
    questBoxList[index].classList.remove("questions-container--show-quest-box")

    // Adiciona a classe na questão anterior
    questBoxList[index - 1].classList.add("questions-container--show-quest-box")
    console.log("Clicou anterior! Index:", index - 1)
    onChange?.()
    currentPageEvent().refresh()
  })
}
