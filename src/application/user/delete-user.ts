import RepositoryFactory from "../../domain/factory/repository-factory";
import UserRepository from "../../domain/repository/user-repository";
import NotFoundError from "../../infra/http/errors/not-found-error";

type WhereUniqueInput = {
  id: string
}

export default class DeleteUser {
  userRepository: UserRepository

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
  }

  async execute(where: WhereUniqueInput): Promise<void> {
    const userFound = await this.userRepository.check(where)
    if (!userFound) throw new NotFoundError("User not found")
    await this.userRepository.delete(where)
  }
} 
