import RepositoryFactory from "../../domain/factory/repository-factory";
import UserRepository from "../../domain/repository/user-repository"
import User from "../../domain/entities/user";
import EmailExistsError from "../../infra/http/errors/email-exists";
import UsernameExistsError from "../../infra/http/errors/username-exists";

type Input = {
  id?: string
  email: string
  username: string
  password: string
}

export default class SaveUser {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(data: Input): Promise<void> {
    const { email, username, password } = data
    const existsEmail = await this.userRepository.check({ email })
    if (existsEmail) throw new EmailExistsError()
    const existsUsername = await this.userRepository.check({ username })
    if (existsUsername) throw new UsernameExistsError()
    const user = User.create(email, username, password)
    await this.userRepository.save(user)
  }
} 
