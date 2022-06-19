import { ProjectDetail } from "../../../entities/project-details";
import { IProjectsDetailsRepository } from "../../../repositories/interface-projects-details-repository";
import { InvalidParams, MissingParams, NotFoundError } from "../../errors";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IUpdateProjectDetailRequestDTO } from "./update-project-detail-dto";

type AcceptableTypes = "likes" | "clicks" | "views" | "addComment";

export class updateProjectDetailUseCase {
  constructor(private projectDetailRepository: IProjectsDetailsRepository) {}
  async execute({
    data,
    id,
  }: IUpdateProjectDetailRequestDTO<AcceptableTypes>): Promise<IHttpResponse> {
    try {
      if (!data || !id) {
        return badRequest(new MissingParams("data, updateType ou id"));
      }

      const isExist = await this.projectDetailRepository.findById(id);

      if (!isExist) {
        return badRequest(new NotFoundError("Não foi encontrado esse projeto"));
      }
      const projectDetail = new ProjectDetail({ ...isExist });
      const filters = Object.entries(data).filter(([key, value]) => {
        if (!projectDetail[key as AcceptableTypes] || !value) {
          return { key: value };
        } else {
          const execute = projectDetail[key as AcceptableTypes];
          execute(value);
        }
      });

      if (filters.length > 0) {
        return badRequest(
          new InvalidParams(
            filters.map(([key, value]) => `${key} ${value}`).join(", ")
          )
        );
      }
      const updatedProjectDetail = await this.projectDetailRepository.update(
        id,
        projectDetail
      );

      return ok(updatedProjectDetail);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
