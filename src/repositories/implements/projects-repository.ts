import { IProjectTags, Project } from "../../entities/project";
import { HikariWebApi } from "../../services/hikari-web-api";
import { ProjectsError } from "../errors";
import { IProjectsRepository } from "../interface-projects-repository";

export class ProjectsRepository implements IProjectsRepository {
  async getProjectsReleases(
    page: number = 1
  ): Promise<Project[] | ProjectsError> {
    const { data, status } = await HikariWebApi.get("/manga", {
      params: {
        page,
      },
    });

    if (!data || status !== 200) {
      return new ProjectsError("No data <getProjectsReleases>");
    }

    const projects = await Promise.all(
      data.map(async (project: any) => {
        return new Project({
          id: project.id,
          slug: project.slug,
          type: project.ero_type,
          last_chapter: project.ero_latest[0]?.chapter || "",
          status:
            project.ero_status == "Ongoing" ? "Em Lançamento" : "Concluido",
          rating: project.rank_math_seo_score || 0,
          tags: await this.getTagsByIds(project.genres),
          adult: project.genres?.includes(26),
          update_at: project.modified_gmt,
          attributes: {
            title: project.title.rendered,
            alt_title: project.ero_japanese,
            description: project.content.rendered,
            link: project.link,
          },
          media: {
            banner: {
              id: project.ero_cover,
              active: project.ero_slider == 1,
              url: await this.getMediaById(project.ero_cover), //é apenas o id, ainda não é a url
            },
            cover: {
              id: project.featured_media,
              url: await this.getMediaById(project.featured_media), //é apenas o id, ainda não é a url
            },
          },
          relationships: {
            author: project.ero_author,
            artist: project.ero_artist,
            publisher: project.ero_serialization,
          },
        });
      })
    );
    return projects;
  }

  async getTagsByIds(id: string[]): Promise<IProjectTags[]> {
    const { data, status } = await HikariWebApi.get(`/genres/`, {
      params: {
        includes: id.join(", "),
      },
    });

    if (!data || status !== 200) {
      return [];
    }
    const tags = data.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    }));
    return tags;
  }

  async getMediaById(id: string): Promise<string> {
    const { data, status } = await HikariWebApi.get(`/media/${id}`);

    if (!data || status !== 200) {
      return "";
    }

    return data.source_url || "";
  }
}
