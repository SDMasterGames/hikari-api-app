import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectDetailsRepository } from "../../../repositories/implements/projects-details-repository";
import { updateProjectDetailController } from "./update-project-detail-controller";
import { updateProjectDetailUseCase } from "./update-project-detail-usecase";

const projectDetailRepository = new ProjectDetailsRepository();
const cacheRepository = new CacheRepository();

const UpdateProjectDetailUseCase = new updateProjectDetailUseCase(
  projectDetailRepository
);

const UpdateProjectDetailController = new updateProjectDetailController(
  UpdateProjectDetailUseCase
);

export { UpdateProjectDetailController, UpdateProjectDetailUseCase };
