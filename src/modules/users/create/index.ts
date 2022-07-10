import { AuthRepository } from "../../../repositories/implements";
import { UsersRepository } from "../../../repositories/implements/users-repository";
import { createUserController } from "./create-user-controller";
import { createUserUseCase } from "./create-user-usecase";

const usersRepository = new UsersRepository();
const authRepository = new AuthRepository();

const CreateUserUseCase = new createUserUseCase(
	usersRepository,
	authRepository
);

const CreateUserController = new createUserController(CreateUserUseCase);

export { CreateUserController, CreateUserUseCase };
