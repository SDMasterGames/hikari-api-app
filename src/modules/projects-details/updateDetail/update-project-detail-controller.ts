import { IProjectsDetailsRepository } from "../../../repositories/interface-projects-details-repository";
import { IHttpRequest, IHttpResponse, serverError } from "../../httpHelper";
import { updateProjectDetailUseCase } from "./update-project-detail-usecase";

export class updateProjectDetailController {
	constructor(private useCase: updateProjectDetailUseCase) {}

	async handle({ body, params }: IHttpRequest): Promise<IHttpResponse> {
		const data = body;
		const { id } = params;
		const result = await this.useCase.execute({
			data,
			id,
		});

		return result;
	}
}
