import { ProjectsError } from "../../../repositories/errors";
import { ICacheRepository } from "../../../repositories/interface-cache-repository";
import { IProjectsRepository } from "../../../repositories/interface-projects-repository";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IGetChaptersRequestDTO } from "./get-chapters-dto";

export class getChaptersUseCase {
  constructor(
    private IProjectRepository: IProjectsRepository,
    private ICacheRepository: ICacheRepository
  ) {}

  async execute({ slug }: IGetChaptersRequestDTO): Promise<IHttpResponse> {
    try {
      if (!slug) {
        return badRequest(new Error("Slug is required"));
      }
      const cache = await this.ICacheRepository.get(`chapters-${slug}`);
     
      if (cache) {
        return ok(cache);
      }

      const chapters = await this.IProjectRepository.getChaptersByProjectSlug(
        slug
      );
      if (chapters instanceof ProjectsError) {
        return badRequest(new Error(chapters.message));
      }
      await this.ICacheRepository.set(`chapters-${slug}`, chapters);
      return ok(chapters);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
