import { UsersRepository } from "../../../repositories/implements/users-repository";
import { getUserController } from "./get-user-controller";
import { getUserUseCase } from "./get-user-usecase";

const usersRepository = new UsersRepository();

const GetUserUseCase = new getUserUseCase(usersRepository);

const GetUserController = new getUserController(GetUserUseCase);

export { GetUserController, GetUserUseCase };
