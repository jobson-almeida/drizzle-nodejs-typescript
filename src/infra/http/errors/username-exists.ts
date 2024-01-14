export default class UsernameExistsError extends Error {
  constructor() {
    super("Username already exists")
    this.name = "UsernameExistsError"
  }
}
