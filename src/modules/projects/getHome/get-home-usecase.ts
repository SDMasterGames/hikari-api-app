import { ProjectsError } from "../../../repositories/errors";
import { ICacheRepository } from "../../../repositories/interface-cache-repository";
import { IProjectsRepository } from "../../../repositories/interface-projects-repository";
import { IHttpResponse, ok, serverError } from "../../httpHelper";
import { IGetHomeRequestDTO } from "./get-home-dto";

export class getHomeUseCase {
  constructor(
    private IProjectsRepository: IProjectsRepository,
    private ICacheRepository: ICacheRepository
  ) {}

  async execute({ page }: IGetHomeRequestDTO): Promise<IHttpResponse> {
    try {
      const cacheKey = `home:${page}`;

      const cache = await this.ICacheRepository.get(cacheKey);
      if (cache) return ok(cache);

      const response = await this.IProjectsRepository.getProjectsReleases(page);

      if (response instanceof ProjectsError)
        return serverError(response.message);

      const slides = response.filter((project) => project.media.banner.active);

      const result = {
        slides,
        releases: response,
      };

      await this.ICacheRepository.set(cacheKey, result, 60 * 1);
      return ok(result);
    } catch (error: any) {
      console.log(error);
      return serverError(error.message);
    }
  }
}
