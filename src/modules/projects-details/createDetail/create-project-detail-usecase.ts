import { IProjectsDetailsRepository } from "../../../repositories/interface-projects-details-repository";
import { MissingParams } from "../../errors";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { ICreateProjectDetailRequestDTO } from "./create-project-detail-dto";

export class createProjectDetailUseCase {
  constructor(private projectsDetailsRepository: IProjectsDetailsRepository) {}

  async execute({
    project_id,
    project_slug,
  }: ICreateProjectDetailRequestDTO): Promise<IHttpResponse> {
    try {
      if (!project_id || !project_slug) {
        return badRequest(
          new MissingParams("project_id or project_slug is missing")
        );
      }

      const ExistingProjectDetail =
        await this.projectsDetailsRepository.findBySlug(project_slug);

      if (ExistingProjectDetail) {
        return badRequest(new Error("project_slug already exists"));
      }

      const projectDetail = await this.projectsDetailsRepository.create({
        project_id,
        project_slug,
      });
      return ok(projectDetail);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
