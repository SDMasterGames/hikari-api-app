import { ProjectsError } from "../../../repositories/errors";
import { IProjectsRepository } from "../../../repositories/interface-projects-repository";
import { IHttpResponse, ok, serverError } from "../../httpHelper";
import { IGetHomeRequestDTO } from "./get-home-dto";

export class getHomeUseCase {
  constructor(private IProjectsRepository: IProjectsRepository) {}

  async execute({ page }: IGetHomeRequestDTO): Promise<IHttpResponse> {
    try {
      const response = await this.IProjectsRepository.getProjectsReleases(page);

      if (response instanceof ProjectsError)
        return serverError(response.message);

      return ok(response);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
