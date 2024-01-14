export default class InvalidUUIDError extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = message
  }
}
