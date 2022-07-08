import cheerio from "cheerio";

import { Chapter } from "../../entities/Chapter";
import { IProjectTags, Project } from "../../entities/Project";
import { HikariWebApi } from "../../services/hikari-web-api";
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

	async getProjectsReleases(page: number = 1): Promise<Project[]> {
		const { data, status } = await HikariWebApi.get("/manga", {
			params: {
				page,
				orderby: "modified",
			},
		});

		if (!data || status !== 200) {
			throw new Error("No data <getProjectsReleases>");
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

	async getChaptersByProjectSlug(slug: string): Promise<Chapter[]> {
		try {
			const CategoryId = await this.getCategoryIdByProjectSlug(slug);
			const { data } = await HikariWebApi.get("/posts", {
				params: {
					categories: CategoryId,
				},
			});

			if (!data || data.length === 0) {
				throw new Error("No data <getChaptersByProject>");
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
			throw new Error(error.message);
		}
	}
	async getCategoryIdByProjectSlug(slug: string): Promise<number> {
		const { data } = await HikariWebApi.get("/categories", {
			params: {
				slug,
			},
		});
		if (!data || data.length === 0) {
			throw new Error("Não foi encontrado nenhum resultado para esse slug");
		}

		return data[0].id;
	}

	async getProjectsByIds(id: string, per_page: number): Promise<Project[]> {
		const { data } = await HikariWebApi.get("/manga", {
			params: {
				include: id,
				per_page,
			},
		});
		if (!data || data.length === 0) {
			throw new Error(
				"Encontrei nenhum projeto com os ids informados <getProjectsByIds>"
			);
		}

		const projectsFavorites = await Promise.all(
			data.map(async (project: any) => await this.MainProjectLoad(project))
		);

		return projectsFavorites;
	}
}
