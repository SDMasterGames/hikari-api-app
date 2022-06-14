import { Chapter } from "../../entities/chapter";
import { IProjectTags, Project } from "../../entities/project";
import { ProjectsError } from "../../repositories/errors";
import { IProjectsRepository } from "../../repositories/interface-projects-repository";

const projects = [
  Project.Fake(),
  Project.Fake(),
  Project.Fake(),
  Project.Fake(10),
];

const ChapterFake = Chapter.Fake("test-chapter");

export class ProjectsTestRepository implements IProjectsRepository {
  getProjectsReleases(page: number = 1): Promise<Project[] | ProjectsError> {
    if (page === 1) {
      return Promise.resolve(projects);
    }
    if (page === 2) {
      return Promise.resolve(projects.slice(0, 1));
    }
    return Promise.resolve(new ProjectsError("No Data"));
  }
  getMediaById(id: number): Promise<string> {
    return Promise.resolve("");
  }
  getCategoryIdByProjectSlug(slug: string): Promise<number | ProjectsError> {
    return Promise.resolve(1);
  }
  getProjectsByIds(id: string): Promise<Project[] | ProjectsError> {
    const ids = id.split(",");
    const projectsid = projects.filter((project) =>
      ids.find((i) => i == String(project.id))
    );
    if (projectsid.length == 0) {
      return Promise.resolve(new ProjectsError("No Data"));
    }
    return Promise.resolve(projectsid);
  }
  getTagsByIds(id: number[]): Promise<IProjectTags[]> {
    return Promise.resolve([]);
  }
  getChaptersByProjectSlug(slug: string): Promise<ProjectsError | Chapter[]> {
    if (slug === ChapterFake.slug) {
      return Promise.resolve([ChapterFake]);
    }
    return Promise.resolve(new ProjectsError("No Data"));
  }
}
