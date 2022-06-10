import { IProjectTags, Project } from "../entities/project";
import { ProjectsError } from "./errors";

export interface IProjectsRepository {
  getProjectsReleases(page?: number): Promise<Project[] | ProjectsError>;
  getTagsByIds(id: string[]): Promise<IProjectTags[]>;

  getMediaById(id: string): Promise<string>;
}
