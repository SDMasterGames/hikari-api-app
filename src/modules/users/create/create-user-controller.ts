import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { createUserUseCase } from "./create-user-usecase";

export class createUserController {
	constructor(private useCase: createUserUseCase) {}
	async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
		const { avatar_url, email, username, uuid } = body;
		const result = await this.useCase.execute({
			avatar_url,
			email,
			username,
			uuid,
		});
		return result;
	}
}
