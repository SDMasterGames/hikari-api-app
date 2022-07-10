import { AuthRepository } from "../../../repositories/implements";
import { UsersRepository } from "../../../repositories/implements/users-repository";
import { authUserController } from "./auth-user-controller";
import { authUserUseCase } from "./auth-user-usecase";

const usersRepository = new UsersRepository();
const authRepository = new AuthRepository();

const AuthUserUseCase = new authUserUseCase(usersRepository, authRepository);

const AuthUserController = new authUserController(AuthUserUseCase);

export { AuthUserController, AuthUserUseCase };
