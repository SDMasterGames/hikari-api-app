import { IUsersRepository } from "../../../repositories/interface-users-repository";
import { MissingParams, NotFoundError } from "../../errors";
import { badRequest, IHttpResponse, ok } from "../../httpHelper";
import { IGetUserRequestDTO } from "./get-user-dto";

export class getUserUseCase {
	constructor(private IUserRepository: IUsersRepository) {}
	async execute({ uuid }: IGetUserRequestDTO): Promise<IHttpResponse> {
		if (!uuid) {
			return badRequest(new MissingParams("uuid is required"));
		}
		const user = await this.IUserRepository.findByUuid(uuid);
		if (!user) {
			return badRequest(new NotFoundError("User not found"));
		}

		return ok(user);
	}
}
