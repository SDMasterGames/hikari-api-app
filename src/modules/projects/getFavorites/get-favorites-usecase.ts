import { ProjectsError } from "../../../repositories/errors";
import { ICacheRepository } from "../../../repositories/interface-cache-repository";
import { IProjectsRepository } from "../../../repositories/interface-projects-repository";
import { InvalidParams, MissingParams } from "../../errors/";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IGetFavoritesRequestDTO } from "./get-favorites-dto";

export class getFavoritesUseCase {
  constructor(
    private IProjectsRepository: IProjectsRepository,
    private ICacheRepository: ICacheRepository
  ) {}

  async execute({ id }: IGetFavoritesRequestDTO): Promise<IHttpResponse> {
    try {
      if (!id) {
        return badRequest(new MissingParams("id"));
      }
      const ids = id.split(",");
      if (!Array.isArray(ids) || ids.length === 0) {
        return badRequest(new InvalidParams(`id must be an array ${ids}`));
      }
      const cacheKey = `favorites-${ids.join("-")}`;

      const cache = await this.ICacheRepository.get(cacheKey);
      if (cache) {
        return ok(cache);
      }
      const projects = await this.IProjectsRepository.getProjectsByIds(
        ids.join(", "),
        ids.length
      );

      if (projects instanceof ProjectsError) {
        return badRequest(new Error(projects.message));
      }

      await this.ICacheRepository.set(cacheKey, projects);
      return ok(projects);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
