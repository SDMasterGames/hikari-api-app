import { ProjectDetail } from "../../entities/project-details";
import {
  ICreateData,
  IProjectsDetailsRepository,
} from "../../repositories/interface-projects-details-repository";

const ProjectsDetails = new Map<string, ProjectDetail>();
export class ProjectDetailsTestRepository
  implements IProjectsDetailsRepository
{
  async create(data: ICreateData): Promise<ProjectDetail> {
    const projectDetail = new ProjectDetail({
      project_id: data.project_id,
      project_slug: data.project_slug,
    });
    return Promise.resolve(projectDetail);
  }

  async findById(id: string): Promise<ProjectDetail | null> {
    return Promise.resolve(ProjectsDetails.get(id) || null);
  }

  async findByProjectIdAndSlug(slug: string): Promise<ProjectDetail | null> {
    let result = null;
    ProjectsDetails.forEach((projectDetail) => {
      if (projectDetail.project_slug === slug) result = projectDetail;
    });
    return Promise.resolve(result);
  }
}
