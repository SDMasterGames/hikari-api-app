import { StatsViewData } from "./StatsViewData";
import { ProjectDetailData } from "./ProjectDetailData";

export interface StatsData {
  id: number;
  project_detail_id: string;
  project_detail?: ProjectDetailData;
  views: StatsViewData[];
  likes: string[];
}
