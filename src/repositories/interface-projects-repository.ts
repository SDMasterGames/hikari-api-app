import { Chapter } from "../entities/Chapter";
import { IProjectTags, Project } from "../entities/Project";
export interface IProjectsRepository {
  getTagsByIds(id: number[]): Promise<IProjectTags[]>;
  getMediaById(id: number): Promise<string>;

  getProjectsReleases(page?: number): Promise<Project[]>;
  getProjectsByIds(id: string, per_page: number): Promise<Project[]>;

  getChaptersByProjectSlug(slug: string): Promise<Chapter[]>;
  getCategoryIdByProjectSlug(slug: string): Promise<number>;
}
