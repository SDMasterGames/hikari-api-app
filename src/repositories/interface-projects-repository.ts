import { Chapter } from "../entities/chapter";
import { IProjectTags, Project } from "../entities/project";
import { ProjectsError } from "./errors";

export interface IProjectsRepository {
  getTagsByIds(id: string[]): Promise<IProjectTags[]>;
  getMediaById(id: string): Promise<string>;

  getProjectsReleases(page?: number): Promise<Project[] | ProjectsError>;

  getChaptersByProjectSlug(slug: string): Promise<Chapter[] | ProjectsError>;
  getCategoryIdByProjectSlug(slug: string): Promise<number | ProjectsError>;
}
