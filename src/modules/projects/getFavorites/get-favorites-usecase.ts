import { ICacheRepository } from "../../../repositories/interface-cache-repository";
import { IProjectsRepository } from "../../../repositories/interface-projects-repository";
import { badRequest, IHttpResponse, ok } from "../../httpHelper";
import { IGetFavoritesRequestDTO } from "./get-favorites-dto";

export class getFavoritesUseCase {
  constructor(
    private IProjectsRepository: IProjectsRepository,
    private ICacheRepository: ICacheRepository
  ) {}

  async execute({ id }: IGetFavoritesRequestDTO): Promise<IHttpResponse> {
    const ids = id.split(",");
    if (!Array.isArray(ids)) {
      return badRequest(new Error(`id must be an array ${ids}`));
    }

    const cacheKey = `favorites-${ids.join("-")}`;

    const cache = await this.ICacheRepository.get(cacheKey);
    if (cache) {
      return ok(cache);
    }
    const projects = await this.IProjectsRepository.getProjectsByIds(ids);

    await this.ICacheRepository.set(cacheKey, projects);
    return ok(projects);
  }
}
