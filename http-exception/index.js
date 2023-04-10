class HttpException extends Error {
  constructor({ code, data, msg }) {
    super()

    this.code = code || 500
    this.data = data || {}
    this.message = msg || 'error'
  }
}

module.exports = HttpException
