import { StatsData } from "./StatsData";

export interface ProjectDetailData {
  id: string;
  project_slug: string;
  project_id: string;
  stats: StatsData;
  comments: string[];
}
