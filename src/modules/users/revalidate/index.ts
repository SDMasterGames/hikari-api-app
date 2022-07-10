import { AuthRepository } from "../../../repositories/implements";
import { revalidateUserController } from "./revalidate-user-controller";
import { revalidateUserUseCase } from "./revalidate-user-usecase";

const authRepository = new AuthRepository();

const RevalidateUserUseCase = new revalidateUserUseCase(authRepository);

const RevalidateUserController = new revalidateUserController(
	RevalidateUserUseCase
);

export { RevalidateUserController, RevalidateUserUseCase };
