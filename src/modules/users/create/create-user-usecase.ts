import { IUsersRepository } from "../../../repositories/interface-users-repository";
import { IAuthRepository } from "../../../repositories/interface-auth-repository";
import { MissingParams, AlreadyExistsError } from "../../errors";
import { badRequest, created, serverError } from "../../httpHelper";
import { ICreateUserRequestDTO } from "./create-user-dto";
import { User } from "../../../entities";

export class createUserUseCase {
	constructor(
		private IUsersRepository: IUsersRepository,
		private IAuthRepository: IAuthRepository
	) {}
	async execute({ avatar_url, email, username, uuid }: ICreateUserRequestDTO) {
		try {
			if (!email || !username || !uuid) {
				return badRequest(new MissingParams("email, username ou uuid"));
			}

			if (
				await this.IUsersRepository.findByEmailAndUuid({
					email,
					uuid,
				})
			) {
				return badRequest(new AlreadyExistsError("User already exists"));
			}

			const user = User.create({
				avatar_url: avatar_url || "",
				favorites: [],
				chapters_read: [],
				email,
				username,
				uuid,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			});
			const createdUser = await this.IUsersRepository.create({
				...user.getProfile(),
				uuid,
			});

			const token = await this.IAuthRepository.authenticate(uuid);

			return created({
				user: { ...User.create(createdUser).get(), id: createdUser.id },
				token: token,
			});
		} catch (error: any) {
			return serverError(error.message);
		}
	}
}
