import { ProjectDetail } from "../../entities/project-details";
import { prisma } from "../../lib/database";
import {
  ICreateData,
  IProjectsDetailsRepository,
} from "../interface-projects-details-repository";

export class ProjectDetailsRepository implements IProjectsDetailsRepository {
  async create({
    project_id,
    project_slug,
  }: ICreateData): Promise<ProjectDetail> {
    const result = await prisma.projectDetails.create({
      data: {
        project_id,
        project_slug,
      },
    });
    return new ProjectDetail(result);
  }
  async findById(id: string): Promise<ProjectDetail | null> {
    const result = await prisma.projectDetails.findUnique({
      where: {
        id,
      },
    });

    return result ? new ProjectDetail(result) : null;
  }
  async findByProjectIdAndSlug(
    project_id: string,
    project_slug: string
  ): Promise<ProjectDetail | null> {
    const result = await prisma.projectDetails.findFirst({
      where: {
        project_id,
        project_slug,
      },
    });

    return result ? new ProjectDetail(result) : null;
  }

  async update(id: string, data: ProjectDetail): Promise<ProjectDetail> {
    const result = await prisma.projectDetails.update({
      where: {
        id,
      },
      data,
    });
    return new ProjectDetail(result);
  }

  /// para ser usado apenas nos testes
  async cleandb(): Promise<void> {
    await prisma.projectDetails.deleteMany({});
  }
}
