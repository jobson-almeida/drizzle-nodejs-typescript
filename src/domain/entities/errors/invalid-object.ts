export default class InvalidObjectError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = "InvalidObjectError"
  }
}
