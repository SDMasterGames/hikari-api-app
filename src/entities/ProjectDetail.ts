import { ValidateUtils } from "../utils/";
import { randomInt, randomUUID } from "crypto";
import { IStatsCreateProps, Stats } from "./Stats";

interface IProjectsDetailsProps {
	project_id: string;
	project_slug: string;
	stats: Stats;
	comments: string[];
}

interface IProjectDetailCreateProps {
	project_id: string;
	project_slug: string;
	stats: IStatsCreateProps;
	comments: string[];
}

export class ProjectDetail {
	private readonly project_slug: string;
	private readonly project_id: string;
	private readonly stats: Stats;
	private readonly comments: string[];
	constructor(props: IProjectsDetailsProps) {
		this.project_slug = props.project_slug;
		this.project_id = props.project_id;
		this.stats = props.stats;
		this.comments = props.comments;
		Object.freeze(this);
	}

	getProjectId(): string {
		return this.project_id;
	}

	getProjectSlug(): string {
		return this.project_slug;
	}

	getMetrics(): Stats {
		return this.stats;
	}

	getComments(): string[] {
		return this.comments;
	}

	get() {
		return {
			project_slug: this.project_slug,
			project_id: this.project_id,
			Stats: this.stats,
			comments: this.comments,
		};
	}

	static create({
		stats,
		project_id,
		project_slug,
		comments,
	}: IProjectDetailCreateProps): ProjectDetail {
		if (!Array.isArray(comments)) {
			throw new Error("comments is not array");
		}
		if (!project_id || !project_slug) {
			throw new Error("project_id or project_slug is invalid");
		}

		if (!stats) {
			throw new Error("stats is invalid");
		}

		return new ProjectDetail({
			stats: Stats.create(stats),
			project_id,
			project_slug,
			comments,
		});
	}
}
