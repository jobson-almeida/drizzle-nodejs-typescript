import RepositoryFactory from "../../domain/factory/repository-factory"
import UserRepository from "../../domain/repository/user-repository"

type WhereUniqueInput = {
  id?: string
  email?: string
  username?: string
}

export default class CheckUser {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(where: WhereUniqueInput): Promise<boolean> {
    const userFound = await this.userRepository.check(where)
    return userFound ? true : false
  }
}
