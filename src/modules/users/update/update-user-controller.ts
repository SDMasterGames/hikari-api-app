import { IHttpResponse, IHttpRequest } from "../../httpHelper";
import { updateUserUseCase } from "./update-user-usecase";

export class updateUserController {
	constructor(private useCase: updateUserUseCase) {}
	async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
		const result = await this.useCase.execute(body);
		return result;
	}
}
