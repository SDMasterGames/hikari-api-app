import { StatsView } from "./StatsView";

export interface StatsProps {
	views: StatsView[];
	likes: string[];
}

export interface IStatsCreateProps {
	views: any[];
	likes: string[];
}

export class Stats {
	private readonly views: StatsView[];
	private readonly likes: string[];

	constructor(props: StatsProps) {
		this.views = props.views;
		this.likes = props.likes;
		Object.freeze(this);
	}

	getLikes(): string[] {
		return this.likes;
	}

	getViews(): StatsView[] {
		return this.views;
	}

	getLastView(): StatsView {
		return this.views[this.views.length - 1];
	}

	get() {
		return {
			views: this.views,
			likes: this.likes,
		};
	}

	static create({ likes, views }: IStatsCreateProps): Stats {
		if (!Array.isArray(likes) || !Array.isArray(views)) {
			throw new Error("likes or views is not array");
		}

		return new Stats({
			likes,
			views: views.map(view => StatsView.create(view)),
		});
	}
}
