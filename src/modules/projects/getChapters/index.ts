import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectsRepository } from "../../../repositories/implements/projects-repository";
import { getChaptersController } from "./get-chapters-controller";
import { getChaptersUseCase } from "./get-chapters-usecase";

const projectsRepository = new ProjectsRepository();

const cacheRepository = new CacheRepository();

const GetChaptersUseCase = new getChaptersUseCase(
	projectsRepository,
	cacheRepository
);

const GetChaptersController = new getChaptersController(GetChaptersUseCase);

export { GetChaptersController, GetChaptersUseCase };
