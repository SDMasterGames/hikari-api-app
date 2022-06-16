import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { getProjectDetailUseCase } from "./get-project-detail-usecase";

export class getProjectDetailController {
  constructor(private useCase: getProjectDetailUseCase) {}

  async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
    const { project_id, project_slug } = query;
    const result = await this.useCase.execute({ project_id, project_slug });
    return result;
  }
}
