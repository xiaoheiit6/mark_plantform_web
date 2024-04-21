import axios from 'axios'

export class Http {
  /**
   * @param {string} baseURL
   */
  constructor(baseURL) {
    this.instance = axios.create({ baseURL })
  }

  getInstance() {
    return this.instance
  }
}

export const http = new Http('/api').getInstance()
