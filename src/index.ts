import 'dotenv/config';
import DeleteUser from './application/user/delete-user';
import GetUser from './application/user/get-user';
import GetUsers from './application/user/get-users';
import SaveUser from './application/user/save-user';
import UpdateUser from './application/user/update-user';
import UserController from './infra/controller/user-controller';
import DrizzleAdapter from './infra/database/drizzle-adapter';
import DatabaseRepositoryFactory from './infra/factory/database-repository-factory';
import ExpressAdapter from './infra/http/ExpressAdapter';

const http = new ExpressAdapter();
const drizzleAdapter = new DrizzleAdapter()
const repositoryFactory = new DatabaseRepositoryFactory(drizzleAdapter)

const saveUser = new SaveUser(repositoryFactory);
const getUser = new GetUser(repositoryFactory);
const getUsers = new GetUsers(repositoryFactory);
const updateUser = new UpdateUser(repositoryFactory);
const deleteUser = new DeleteUser(repositoryFactory);

new UserController(http, saveUser, getUser, getUsers, updateUser, deleteUser);

http.listen(3000);