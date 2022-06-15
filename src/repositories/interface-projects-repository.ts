import { Chapter } from "../entities/chapter";
import { IProjectTags, Project } from "../entities/project";
import { ProjectsError } from "./errors";

export interface IProjectsRepository {
  getTagsByIds(id: number[]): Promise<IProjectTags[]>;
  getMediaById(id: number): Promise<string>;

  getProjectsReleases(page?: number): Promise<Project[] | ProjectsError>;
  getProjectsByIds(
    id: string,
    per_page: number
  ): Promise<Project[] | ProjectsError>;

  getChaptersByProjectSlug(slug: string): Promise<Chapter[] | ProjectsError>;
  getCategoryIdByProjectSlug(slug: string): Promise<number | ProjectsError>;
}
