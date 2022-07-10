import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { authUserUseCase } from "./auth-user-usecase";

export class authUserController {
	constructor(private useCase: authUserUseCase) {}
	async handle({ body, params, query }: IHttpRequest): Promise<IHttpResponse> {
		const { email, uuid } = body;
		const result = await this.useCase.execute({ email, uuid });
		return result;
	}
}
