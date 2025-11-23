export class Questions {

  constructor(data){
    this.data = data
  }

  /**
   * @returns {Promise<Array<{
   *   id: number,
   *   imgUrl: string,
   *   question: string,
   *   type: string,
   *   options: string[],
   *   answers: string[],
   *   explanation: string,
   *   difficulty: string
   * }>>}
   */
  async getQuestions() {
    return this.data.questions
  }
}
