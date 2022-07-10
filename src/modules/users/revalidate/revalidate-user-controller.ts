import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { revalidateUserUseCase } from "./revalidate-user-usecase";

export class revalidateUserController {
	constructor(private useCase: revalidateUserUseCase) {}
	async handle({ body, params, query }: IHttpRequest): Promise<IHttpResponse> {
		const { token } = params;
		const result = await this.useCase.execute({ token });
		return result;
	}
}
