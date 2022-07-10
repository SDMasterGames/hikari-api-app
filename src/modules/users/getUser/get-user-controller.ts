import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { getUserUseCase } from "./get-user-usecase";

export class getUserController {
	constructor(private useCase: getUserUseCase) {}

	async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
		const { uuid } = params;
		const result = await this.useCase.execute({ uuid });
		return result;
	}
}
