import { StatsData } from "./StatsData";

export interface StatsViewData {
  count: number;
  date: string;
  id: number;
  metricsId?: number;
  Metrics?: StatsData;
}
