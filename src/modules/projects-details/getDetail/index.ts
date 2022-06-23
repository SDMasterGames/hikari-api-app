import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectDetailsRepository } from "../../../repositories/implements/projects-details-repository";
import { getProjectDetailController } from "./get-project-detail-controller";
import { getProjectDetailUseCase } from "./get-project-detail-usecase";

const projectDetailRepository = new ProjectDetailsRepository();
const cacheRepository = new CacheRepository();

const GetProjectDetailUseCase = new getProjectDetailUseCase(
  projectDetailRepository,
  cacheRepository
);

const GetProjectDetailController = new getProjectDetailController(
  GetProjectDetailUseCase
);

export { GetProjectDetailController, GetProjectDetailUseCase };
