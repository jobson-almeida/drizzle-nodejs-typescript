import RepositoryFactory from "../../domain/factory/repository-factory";
import DrizzleAdapter from "../database/drizzle-adapter";
import UserRepositoryDatabase from "../repository/database/user-repository-database";
import UserRepository from "../../domain/repository/user-repository";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

	constructor(private readonly drizzleAdapter: DrizzleAdapter) { }

	createUserRepository(): UserRepository {
		return new UserRepositoryDatabase(this.drizzleAdapter);
	}
}