import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { getUserUseCase } from "./get-user-usecase";

export class getUserController {
	constructor(private useCase: getUserUseCase) {}

	async handle({ params }: IHttpRequest): Promise<IHttpResponse> {
		const { id } = params;
		const result = await this.useCase.execute({ id });
		return result;
	}
}
