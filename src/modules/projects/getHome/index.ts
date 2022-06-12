import { ProjectsRepository } from "../../../repositories/implements/projects-repository";
import { getHomeController } from "./get-home-controller";
import { getHomeUseCase } from "./get-home-usecase";

const projectsRepository = new ProjectsRepository();

const GetHomeUseCase = new getHomeUseCase(projectsRepository);

const GetHomeController = new getHomeController(GetHomeUseCase);

export { GetHomeController, GetHomeUseCase };
