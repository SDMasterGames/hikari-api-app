import { UsersRepository } from "../../../repositories/implements";
import { updateUserController } from "./update-user-controller";
import { updateUserUseCase } from "./update-user-usecase";

const usersRepository = new UsersRepository();

const UpdateUserUseCase = new updateUserUseCase(usersRepository);

const UpdateUserController = new updateUserController(UpdateUserUseCase);

export { UpdateUserController, UpdateUserUseCase };
