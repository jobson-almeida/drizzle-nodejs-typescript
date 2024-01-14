import NotFoundError from "../../infra/http/errors/not-found-error";
import RepositoryFactory from "../../domain/factory/repository-factory";
import UserRepository from "../../domain/repository/user-repository"
import EmailExistsError from "../../infra/http/errors/email-exists";
import UsernameExistsError from "../../infra/http/errors/username-exists";

type WhereUniqueInput = {
  id: string
}

export type UpdateInput = {
  id?: string
  email: string
  username: string
  password: string
}

export default class UpdateUser {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(params: { where: WhereUniqueInput, data: UpdateInput }): Promise<void> {
    const { id } = params.where
    const { email, username, password } = params.data
    const userFoundFromId = await this.userRepository.get({ id })
    if (!userFoundFromId) throw new NotFoundError("User not found")
    const userFoundFromEmail = await this.userRepository.get({ email })
    const userFoundFromUsername = await this.userRepository.get({ username })
    if (userFoundFromEmail?.email === email && userFoundFromEmail?.id !== id) throw new EmailExistsError()
    if (userFoundFromUsername?.username === username && userFoundFromUsername?.id !== id) throw new UsernameExistsError()

    userFoundFromId &&
      userFoundFromId.build(email, username, password)

    const user = {
      email: userFoundFromId?.email,
      username: userFoundFromId?.username,
      password: userFoundFromId?.password
    }
    await this.userRepository.update({ where: params.where, data: user })
  }
}