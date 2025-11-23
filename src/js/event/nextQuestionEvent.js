import { currentPageEvent } from "./currentPageEvent.js"

/**
 * Verifica se todas as questões foram respondidas
 * @param {NodeList} questBoxList - Lista de todas as questões
 * @returns {boolean} - true se todas foram respondidas, false caso contrário
 */
function checkAllQuestionsAnswered(questBoxList) {
  let allAnswered = true

  questBoxList.forEach((quest) => {
    const inputs = quest.querySelectorAll("[data-js='checkbox-input']")
    const hasAnswer = Array.from(inputs).some((input) => input.disabled)

    if (!hasAnswer) {
      allAnswered = false
    }
  })

  return allAnswered
}

/**
 * Navega para a tela de resultados
 * TODO: Implementar a lógica de navegação
 */
function navigateToResultsScreen() {
  // TODO: Adicione aqui o código para mudar para a tela de resultados
  console.log("🎉 Redirecionando para tela de resultados...")

  // Exemplo de possíveis implementações:
  // window.location.href = '/results.html'
  // ou
  // showResultsScreen()
  // ou
  // document.querySelector('.quiz-container').style.display = 'none'
  // document.querySelector('.results-container').style.display = 'block'
}

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

    // Verifica se a questão atual foi respondida
    const currentQuest = questBoxList[index]
    const currentInputs = currentQuest.querySelectorAll(
      "[data-js='checkbox-input']"
    )
    const hasAnswer = Array.from(currentInputs).some((input) => input.disabled)

    if (!hasAnswer) {
      console.log("Responda a questão antes de avançar!")
      // TODO: Mostrar mensagem de aviso para o usuário
      return
    }

    // Se já está na última questão, verifica se todas foram respondidas
    if (index >= questBoxList.length - 1) {
      console.log("Já está na última questão!")

      // Verifica se todas as questões foram respondidas
      const allQuestionsAnswered = checkAllQuestionsAnswered(questBoxList)

      if (allQuestionsAnswered) {
        console.log("Todas as questões foram respondidas! Redirecionando...")
        // TODO: Implementar navegação para tela de resultados
        navigateToResultsScreen()
        return
      }

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
