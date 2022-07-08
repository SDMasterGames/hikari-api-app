import { randomUUID, randomInt } from "crypto";
import { ProjectDetail } from "../../entities";
import {
	ICreateData,
	ICreateMetricData,
	IProjectsDetailsRepository,
} from "../../repositories/interface-projects-details-repository";
import { ProjectDetailData, StatsData } from "../../repositories/ports";

export const ProjectsDetails = new Map<string, ProjectDetailData>();
//export const StatsDetails: StatsData[] = [];

export class ProjectDetailsTestRepository
	implements IProjectsDetailsRepository
{
	async create(data: ICreateData): Promise<ProjectDetailData> {
		const projectid = randomUUID();
		const projectDetail = {
			comments: [],
			id: projectid,
			project_id: data.project_id,
			project_slug: data.project_slug,
			stats: {
				id: randomInt(300),
				likes: [],
				project_detail_id: projectid,
				views: [],
			},
		};
		ProjectsDetails.set(projectid, projectDetail);
		return Promise.resolve(projectDetail);
	}

	async findById(id: string): Promise<ProjectDetailData | null> {
		const result = ProjectsDetails.get(id);
		if (!result) {
			return Promise.resolve(null);
		}

		const project = JSON.parse(JSON.stringify(result));
		return Promise.resolve(project);
	}

	async findByProjectIdAndSlug(
		slug: string
	): Promise<ProjectDetailData | null> {
		let result: ProjectDetailData | null = null;
		ProjectsDetails.forEach(projectDetail => {
			if (projectDetail.project_slug === slug) result = projectDetail;
		});
		return Promise.resolve(result);
	}

	async updateLikes(id: string, data: ProjectDetail): Promise<void> {
		const result = await this.findById(id);
		if (!result) {
			return Promise.reject("not found");
		}

		result.stats.likes = data.getMetrics().getLikes();
		ProjectsDetails.set(id, result);
	}

	/* async update(id: string, data: ProjectDetail): Promise<ProjectDetailData> {
    ProjectsDetails.set(id, data);
    return Promise.resolve(data);
  } */
	async cleandb(): Promise<void> {}
}
