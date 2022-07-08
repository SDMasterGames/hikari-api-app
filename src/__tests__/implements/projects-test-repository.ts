import { Chapter } from "../../entities/Chapter";
import { IProjectTags, Project } from "../../entities/Project";
import { IProjectsRepository } from "../../repositories/interface-projects-repository";

const projects = [
	Project.Fake(),
	Project.Fake(),
	Project.Fake(),
	Project.Fake(10),
];

const ChapterFake = Chapter.Fake("test-chapter");

export class ProjectsTestRepository implements IProjectsRepository {
	getProjectsReleases(page: number = 1): Promise<Project[]> {
		if (page === 1) {
			return Promise.resolve(projects);
		}
		if (page === 2) {
			return Promise.resolve(projects.slice(0, 1));
		}
		return Promise.reject(new Error("No Data"));
	}
	getMediaById(id: number): Promise<string> {
		return Promise.resolve("");
	}
	getCategoryIdByProjectSlug(slug: string): Promise<number> {
		return Promise.resolve(1);
	}
	getProjectsByIds(id: string): Promise<Project[]> {
		const ids = id.split(",");
		const projectsid = projects.filter(project =>
			ids.find(i => i == String(project.id))
		);
		if (projectsid.length == 0) {
			return Promise.reject(new Error("No Data"));
		}
		return Promise.resolve(projectsid);
	}
	getTagsByIds(id: number[]): Promise<IProjectTags[]> {
		return Promise.resolve([]);
	}
	getChaptersByProjectSlug(slug: string): Promise<Chapter[]> {
		if (slug === ChapterFake.slug) {
			return Promise.resolve([ChapterFake]);
		}
		return Promise.reject(new Error("No Data"));
	}
}
