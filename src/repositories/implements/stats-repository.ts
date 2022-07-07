import { StatsView } from "../../entities";
import { prisma } from "../../lib/database";
import { IStatsRepository } from "../interface-stats-repository";
import { StatsData } from "../ports";

const StatsBD = prisma.stats;

export class StatsRepository implements IStatsRepository {
  async addView(StatsId: number): Promise<StatsData> {
    const result = await StatsBD.update({
      where: {
        id: StatsId,
      },
      data: {
        views: {
          create: {
            count: 0,
            date: StatsView.DateNow(),
          },
        },
      },
      include: {
        views: true,
      },
    });
    return result as StatsData;
  }
  async incrementCountView(StatsId: number,viewId:number): Promise<StatsData> {
    const result = await StatsBD.update({
      where: {
        id: StatsId,
      },
      data: {
        views: {
          update:{
            where:{
                id:viewId
            },
            data:{
                count:{
                    increment:1
                }
            }
          }
        },
      },
      include: {
        views: true,
      },
    });
    return result as StatsData;
  }
}
