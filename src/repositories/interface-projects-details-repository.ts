import { ProjectDetail } from "../entities/project-details";

export interface ICreateData {
  project_id: string;
  project_slug: string;
}

export interface IProjectsDetailsRepository {
  create(data: ICreateData): Promise<ProjectDetail>;

  findById(id: string): Promise<ProjectDetail | null>;
  findByProjectIdAndSlug(
    id: string,
    slug: string
  ): Promise<ProjectDetail | null>;

  update(id: string, data: ProjectDetail): Promise<ProjectDetail>;
}
