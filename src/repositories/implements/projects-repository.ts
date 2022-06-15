import cheerio from "cheerio";

import { Chapter } from "../../entities/chapter";
import { IProjectTags, Project } from "../../entities/project";
import { HikariWebApi } from "../../services/hikari-web-api";
import { ProjectsError } from "../errors";
import { IProjectsRepository } from "../interface-projects-repository";

export class ProjectsRepository implements IProjectsRepository {
  async MainProjectLoad(project: any): Promise<Project> {
    return new Project({
      id: project.id,
      slug: project.slug,
      type: project.ero_type,
      last_chapter: project.ero_latest[0]?.chapter || "",
      status: project.ero_status == "Ongoing" ? "Em Lançamento" : "Concluido",
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
  }

  async getProjectsReleases(
    page: number = 1
  ): Promise<Project[] | ProjectsError> {
    const { data, status } = await HikariWebApi.get("/manga", {
      params: {
        page,
        orderby: "modified",
      },
    });

    if (!data || status !== 200) {
      return new ProjectsError("No data <getProjectsReleases>");
    }

    const projects = await Promise.all(
      data.map(async (project: any) => await this.MainProjectLoad(project))
    );
    return projects;
  }

  async getTagsByIds(id: number[]): Promise<IProjectTags[]> {
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

  async getMediaById(id: number): Promise<string> {
    try {
      const { data, status } = await HikariWebApi.get(`/media/${id}`);

      if (!data || status !== 200) {
        return "";
      }

      return data.source_url || "";
    } catch (error) {
      return "";
    }
  }

  async getChaptersByProjectSlug(
    slug: string
  ): Promise<Chapter[] | ProjectsError> {
    try {
      const CategoryId = await this.getCategoryIdByProjectSlug(slug);
      if (CategoryId instanceof ProjectsError) {
        return CategoryId;
      }
      const { data } = await HikariWebApi.get("/posts", {
        params: {
          categories: CategoryId,
        },
      });

      if (!data || data.length === 0) {
        return new ProjectsError("No data <getChaptersByProject>");
      }

      const chapters = data.map((chapter: any): Chapter => {
        const $ = cheerio.load(chapter.content.rendered);
        const pags = $("img")
          .map((i, el) => $(el).attr("src"))
          .toArray();
        return new Chapter({
          id: chapter.id,
          number: chapter.slug.replace(`${slug}-`, ""),
          slug: chapter.slug,
          title: chapter.title.rendered,
          url: chapter.link,
          pags: pags || [],
        });
      });

      return chapters;
    } catch (error: any) {
      return new ProjectsError(`${error.message} <getChaptersByProject>`);
    }
  }
  async getCategoryIdByProjectSlug(
    slug: string
  ): Promise<number | ProjectsError> {
    try {
      const { data } = await HikariWebApi.get("/categories", {
        params: {
          slug,
        },
      });
      if (!data || data.length === 0) {
        return new ProjectsError(
          "Não foi encontrado nenhum resultado para esse slug"
        );
      }

      return data[0].id;
    } catch (error) {
      return new ProjectsError("No data <getCategoryIdByProjectSlug>");
    }
  }

  async getProjectsByIds(
    id: string,
    per_page: number
  ): Promise<ProjectsError | Project[]> {
    try {
      const { data } = await HikariWebApi.get("/manga", {
        params: {
          include: id,
          per_page,
        },
      });
      if (!data || data.length === 0) {
        return new ProjectsError(
          "Encontrei nenhum projeto com os ids informados <getProjectsByIds>"
        );
      }

      const projectsFavorites = await Promise.all(
        data.map(async (project: any) => await this.MainProjectLoad(project))
      );

      return projectsFavorites;
    } catch (error: any) {
      return new ProjectsError(`${error.message} <getProjectsByIds>`);
    }
  }
}
