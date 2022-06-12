import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectsRepository } from "../../../repositories/implements/projects-repository";
import { getHomeController } from "./get-home-controller";
import { getHomeUseCase } from "./get-home-usecase";

const projectsRepository = new ProjectsRepository();
const cacheRepository = new CacheRepository();

const GetHomeUseCase = new getHomeUseCase(projectsRepository, cacheRepository);

const GetHomeController = new getHomeController(GetHomeUseCase);

export { GetHomeController, GetHomeUseCase };
