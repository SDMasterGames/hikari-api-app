import { ProjectDetail } from "../entities/project-details";

export interface ICreateData {
  project_id: string;
  project_slug: string;
}

export interface IProjectsDetailsRepository {
  create(data:ICreateData ): Promise<ProjectDetail>;

  findById(id: string): Promise<ProjectDetail | null>;
  findBySlug(slug: string): Promise<ProjectDetail | null>;
}
