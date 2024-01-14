import InvalidEmailError from "./errors/invalid-email"
import InvalidObjectError from "./errors/invalid-object"
import Util from "./util"

export default class User {
  email: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(
    readonly id: string,
    email: string,
    username: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.email = email
    this.username = username
    this.password = password
    this.createdAt = createdAt!
    this.updatedAt = updatedAt!

    if (!Util.validateEmail(this.email)) throw new InvalidEmailError()
    if (!Util.validateString(this.username)) throw new InvalidObjectError("Invalid user name field content: set a user name")
  }

  static create(email: string, username: string, password: string) {
    const userId = Util.generateID()
    return new User(userId, email, username, password);
  }

  public build(email?: string, username?: string, password?: string) {
    this.email = email!
    this.username = username!
    this.password = password!
  }
}
