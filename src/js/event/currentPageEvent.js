export function currentPageEvent(){
  const currentPageEl = document.querySelector("[data-js='current-page']")
  const lastPageEl = document.querySelector("[data-js='last-page']")

  function getQuestBoxes() {
    return document.querySelectorAll("[data-js='quest-box']")
  }

  function findCurrentIndex(){
    const list = getQuestBoxes()
    const arr = Array.from(list)
    const idx = arr.findIndex(it => it.classList.contains("questions-container--show-quest-box"))
    
    return idx === -1 ? 0 : idx
  }

  function refresh(){
    const list = getQuestBoxes()
    const totalPages = list.length || 1
    const currentIndex = findCurrentIndex()
    
    if (lastPageEl) lastPageEl.textContent = totalPages
    if (currentPageEl) currentPageEl.textContent = currentIndex + 1
  }

  return {
    refresh,
    findCurrentIndex
  }
}