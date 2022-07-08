import { StatsData } from "./ports";

export interface IStatsRepository {
	addView(StatsId: number): Promise<StatsData>;
	incrementCountView(StatsId: number, viewId: number): Promise<StatsData>;
}
