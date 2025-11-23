import { Questions } from "../model/Questions.js"

export class Database {
  constructor(src) {
    this.src = src
  }

  /**
   * @returns {Promise<Questions>}
   */
  async fetchData() {
    const response = await fetch(this.src)

    if (!response.ok) {
      throw new Error("Erro: não foi possivel ler database")
    }

    const data = await response.json()

    return new Questions(data)
  }
}
