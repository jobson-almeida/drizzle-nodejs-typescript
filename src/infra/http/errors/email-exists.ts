export default class EmailExistsError extends Error {
  constructor() {
    super("Email already exists")
    this.name = "EmailExistsError"
  }
}
