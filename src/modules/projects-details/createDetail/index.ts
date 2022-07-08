import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectDetailsRepository } from "../../../repositories/implements/projects-details-repository";
import { createProjectDetailController } from "./create-project-detail-controller";
import { createProjectDetailUseCase } from "./create-project-detail-usecase";

const projectDetailRepository = new ProjectDetailsRepository();
const cacheRepository = new CacheRepository();

const CreateProjectDetailUseCase = new createProjectDetailUseCase(
	projectDetailRepository
);

const CreateProjectDetailController = new createProjectDetailController(
	CreateProjectDetailUseCase
);

export { CreateProjectDetailController, CreateProjectDetailUseCase };
