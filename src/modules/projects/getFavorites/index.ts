import { CacheRepository } from "../../../repositories/implements/cache-repository";
import { ProjectsRepository } from "../../../repositories/implements/projects-repository";
import { getFavoritesController } from "./get-favorites-controller";
import { getFavoritesUseCase } from "./get-favorites-usecase";

const cacheRepository = new CacheRepository();

const projectRepository = new ProjectsRepository();

const GetFavoritesUseCase = new getFavoritesUseCase(
  projectRepository,
  cacheRepository
);

const GetFavoritesController = new getFavoritesController(GetFavoritesUseCase);

export { GetFavoritesController, GetFavoritesUseCase };
