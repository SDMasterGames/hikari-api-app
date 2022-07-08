import { ProjectDetail } from "../entities";
import { ProjectDetailData } from "./ports/";

export interface ICreateData {
	project_id: string;
	project_slug: string;
}

export interface ICreateMetricData {
	project_detail_id: string;
}

export interface IProjectsDetailsRepository {
	create(data: ICreateData): Promise<ProjectDetailData>;
	//createMetric(data: ICreateMetricData): Promise<Metric>;

	findById(id: string): Promise<ProjectDetailData | null>;
	findByProjectIdAndSlug(
		id: string,
		slug: string
	): Promise<ProjectDetailData | null>;

	updateLikes(id: string, data: ProjectDetail): Promise<void>;

	///apenas para ser usado nos testes
	cleandb(): Promise<void>;
}
