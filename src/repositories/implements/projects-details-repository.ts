import { ProjectDetailData } from "../ports/";
import { prisma } from "../../lib/database";
import {
	ICreateData,
	IProjectsDetailsRepository,
} from "../interface-projects-details-repository";
import { ProjectDetail } from "../../entities/ProjectDetail";

const ProjectDetailDB = prisma.projectDetails;

export class ProjectDetailsRepository implements IProjectsDetailsRepository {
	async create({
		project_id,
		project_slug,
	}: ICreateData): Promise<ProjectDetailData> {
		const result = await ProjectDetailDB.create({
			data: {
				project_id,
				project_slug,
				stats: {
					create: {},
				},
			},
			include: {
				stats: true,
			},
		});

		return result as ProjectDetailData;
	}
	async findById(id: string): Promise<ProjectDetailData | null> {
		const result = await prisma.projectDetails.findUnique({
			where: {
				id,
			},
			include: {
				stats: {
					include: {
						views: true,
					},
				},
			},
		});
		if (!result) {
			return null;
		}
		return result as ProjectDetailData;
	}
	async findByProjectIdAndSlug(
		project_id: string,
		project_slug: string
	): Promise<ProjectDetailData | null> {
		const result = await prisma.projectDetails.findFirst({
			where: {
				project_id,
				project_slug,
			},
			include: {
				stats: true,
			},
		});
		if (!result) {
			return null;
		}
		return result as ProjectDetailData;
	}

	async updateLikes(id: string, data: ProjectDetail): Promise<void> {
		await prisma.projectDetails.update({
			where: { id },
			data: {
				stats: {
					update: {
						likes: {
							set: data.getMetrics().getLikes(),
						},
					},
				},
			},
		});
	}
	/* async update(id: string, data: ProjectDetail): Promise<ProjectDetailData> {
    const result = await prisma.projectDetails.update({
      where: {
        id,
      },
      data,
    });
    return result;
  } */

	/// para ser usado apenas nos testes
	async cleandb(): Promise<void> {
		const deleteProjectDetails = prisma.projectDetails.deleteMany();
		const deleteStats = prisma.stats.deleteMany();
		const deleteStatsViews = prisma.statsView.deleteMany();
		// The transaction runs synchronously so deleteStatsViews must run last.
		await prisma.$transaction([
			deleteStatsViews,
			deleteStats,
			deleteProjectDetails,
		]);
	}
}
