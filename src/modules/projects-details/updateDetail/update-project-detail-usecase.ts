import { Stats, StatsView } from "../../../entities";
import { ProjectDetail } from "../../../entities/ProjectDetail";
import { IProjectsDetailsRepository } from "../../../repositories/interface-projects-details-repository";
import { IStatsRepository } from "../../../repositories/interface-stats-repository";
import { ProjectDetailData } from "../../../repositories/ports";
import { ValidateUtils } from "../../../utils";
import { InvalidParams, MissingParams, NotFoundError } from "../../errors";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IUpdateProjectDetailRequestDTO } from "./update-project-detail-dto";

//type AcceptableTypes = "likes" | "views" | "addComment";

export class updateProjectDetailUseCase {
  constructor(
    private projectDetailRepository: IProjectsDetailsRepository,
    private StatsRepository: IStatsRepository
  ) {}
  async execute(
    updateChangedDTO: IUpdateProjectDetailRequestDTO
  ): Promise<IHttpResponse> {
    try {
      if (!updateChangedDTO.id) {
        return badRequest(new MissingParams("data, updateType ou id"));
      }

      const original = await this.projectDetailRepository.findById(
        updateChangedDTO.id
      );
      const invalid = ValidateUtils.invalidParams(updateChangedDTO);
      if (invalid.length > 0) {
        return badRequest(new InvalidParams(`${invalid.join(", ")}`));
      }

      if (!original) {
        return badRequest(new NotFoundError("Não foi encontrado esse projeto"));
      }
      const changedProjectDetail = ProjectDetail.create({
        comments: original.comments,
        project_id: original.project_id,
        project_slug: original.project_slug,
        stats: {
          likes: changedLikes(updateChangedDTO, original),
          views: changedViewsCount(updateChangedDTO, original),
        },
      });
      if (shouldUpdateLikes(updateChangedDTO)) {
        await this.projectDetailRepository.updateLikes(
          original.id,
          changedProjectDetail
        );
      }

      if (shouldUpdateViewCount(updateChangedDTO)) {
        const view = await this.addStatsView(
          updateChangedDTO,
          changedProjectDetail
        );
        if (!view) {
          await this.StatsRepository.addView(original.stats.id);
        } else {
          await this.StatsRepository.incrementCountView(
            original.stats.id,
            view.id
          );
        }
      }

      const response = await this.projectDetailRepository.findById(original.id);
      return ok(response);
    } catch (error: any) {
      return serverError(error.message);
    }
  }
  
  private async addStatsView(
    updateChangedDTO: IUpdateProjectDetailRequestDTO,
    changedProjectDetail: ProjectDetail
  ) {
    const result = (await this.projectDetailRepository.findById(
      updateChangedDTO.id as string
    )) as ProjectDetailData;
    
    const lastView = changedProjectDetail.getMetrics().getLastView();
    if (!lastView) return undefined;
    const changed = result.stats.views.find(
      (view) => view.date == lastView.getDate()
    );
    
    return changed;
  }
}

function shouldUpdateLikes(
  updateChangedDTO: IUpdateProjectDetailRequestDTO
): boolean {
  return Object.keys(updateChangedDTO).indexOf("likes") !== -1;
}

function shouldUpdateViewCount(
  updateChangedDTO: IUpdateProjectDetailRequestDTO
): boolean {
  return Object.keys(updateChangedDTO).indexOf("views") !== -1;
}

function changedLikes(
  updateChangedDTO: IUpdateProjectDetailRequestDTO,
  original: ProjectDetailData
) {
  if (!shouldUpdateLikes(updateChangedDTO)) return original.stats.likes;
  const like = updateChangedDTO.likes as string;
  const stats = original.stats;
  if (stats.likes.includes(like)) {
    stats.likes.splice(original.stats.likes.indexOf(like), 1);
  } else {
    stats.likes.push(like);
  }
  return stats.likes;
}

function changedViewsCount(
  updateChangedDTO: IUpdateProjectDetailRequestDTO,
  original: ProjectDetailData
) {
  if (!shouldUpdateViewCount(updateChangedDTO)) return original.stats.views;
  const stats = Object.assign({}, original.stats);

  const view = stats.views
    .slice()
    .find((view) => view.date == StatsView.DateNow());
  if (!view) return original.stats.views;
  view.count++;
  return original.stats.views;
}
