import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { getFavoritesUseCase } from "./get-favorites-usecase";

export class getFavoritesController {
	constructor(private useCase: getFavoritesUseCase) {}

	async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
		const { id } = query;
		return await this.useCase.execute({ id });
	}
}
