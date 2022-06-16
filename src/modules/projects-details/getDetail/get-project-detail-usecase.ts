import { ICacheRepository } from "../../../repositories/interface-cache-repository";
import { IProjectsDetailsRepository } from "../../../repositories/interface-projects-details-repository";
import { MissingParams } from "../../errors";
import { badRequest, ok, serverError } from "../../httpHelper";
import { IGetProjectDetailRequestDTO } from "./get-project-detail-dto";

export class getProjectDetailUseCase {
  constructor(
    private IProjectDetailRepository: IProjectsDetailsRepository,
    private ICacheRepository: ICacheRepository
  ) {}

  async execute({ project_id, project_slug }: IGetProjectDetailRequestDTO) {
    try {
      if (!project_id || !project_slug) {
        return badRequest(new MissingParams("project_id or project_slug"));
      }
      const detail = await this.IProjectDetailRepository.findByProjectIdAndSlug(
        project_id,
        project_slug
      );

      if (detail) {
        return ok(detail);
      }

      const createNewDetail = await this.IProjectDetailRepository.create({
        project_id,
        project_slug,
      });

      return ok(createNewDetail);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
