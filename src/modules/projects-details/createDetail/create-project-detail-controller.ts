import { IHttpRequest, IHttpResponse, serverError } from "../../httpHelper";
import { createProjectDetailUseCase } from "./create-project-detail-usecase";

export class createProjectDetailController {
  constructor(private useCase: createProjectDetailUseCase) {}

  async handle({body}: IHttpRequest): Promise<IHttpResponse> {
    const { project_id, project_slug } = body || {};
    const response = await this.useCase.execute({
      project_id,
      project_slug,
    });
    return response;
  }
}
