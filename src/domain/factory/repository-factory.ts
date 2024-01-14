import UserRepository from "../repository/user-repository";

export default interface RepositoryFactory {
  createUserRepository(): UserRepository;
}