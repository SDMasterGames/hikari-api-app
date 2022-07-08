import { IAuthRepository } from "../../../repositories/interface-auth-repository";
import { MissingParams } from "../../errors";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IRevalidateUserRequestDTO } from "./revalidate-user-dto";

export class revalidateUserUseCase {
	constructor(private IAuthRepository: IAuthRepository) {}

	async execute({ token }: IRevalidateUserRequestDTO): Promise<IHttpResponse> {
		try {
			if (!token) {
				return badRequest(new MissingParams("token esta faltando"));
			}

			const { data, error } = await this.IAuthRepository.verify(token);
			if (error) {
				return badRequest(new Error(error.message));
			}
			return ok(data);
		} catch (error: any) {
			return serverError(error.message);
		}
	}
}
