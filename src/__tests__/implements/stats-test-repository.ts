import { randomInt } from "crypto";
import { StatsView } from "../../entities";
import { IStatsRepository } from "../../repositories/interface-stats-repository";
import { StatsData, StatsViewData } from "../../repositories/ports";
import { ProjectsDetails } from "./projects-details-test-repository";

export class StatsTestRepository implements IStatsRepository {
  addView(statsId: number): Promise<StatsData> {
    let projectid: string = "";
    ProjectsDetails.forEach((elem) => {
      if (elem.stats.id != statsId) return;
      projectid = elem.id;
    });
    const project = ProjectsDetails.get(projectid);
    if (!project) throw new Error("error");
    project.stats.views.push({
      count: 0,
      date: StatsView.DateNow(),
      id: randomInt(300),
    });
    return Promise.resolve(project.stats);
  }
  incrementCountView(statsId: number, viewId: number): Promise<StatsData> {
    let projectid: string = "";
    ProjectsDetails.forEach((elem) => {
      if (elem.stats.id != statsId) return;
      projectid = elem.id;
    });
    const project = ProjectsDetails.get(projectid);
    if (!project) return Promise.reject("not found");
    project.stats.views = project.stats.views.map((view) => {
      if (view.id == viewId) {
        view.count++;
        return view;
      }
      return view;
    });
    return Promise.resolve(project.stats);
  }
}
