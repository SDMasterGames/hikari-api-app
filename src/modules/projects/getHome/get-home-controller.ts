import { IHttpResponse, IHttpRequest } from "../../httpHelper";
import { getHomeUseCase } from "./get-home-usecase";

export class getHomeController {
	constructor(private useCase: getHomeUseCase) {}

	async handle(data: IHttpRequest): Promise<IHttpResponse> {
		const { page } = data.query;
		const response = await this.useCase.execute({ page });
		return response;
	}
}
