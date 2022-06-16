import { randomUUID } from "crypto";
import { createProjectDetailUseCase } from "../../modules/projects-details/createDetail/create-project-detail-usecase";
import { ProjectDetailsTestRepository } from "../implements/projects-details-test-repository";

const projectDetailsTestRepository = new ProjectDetailsTestRepository();

const createProject = new createProjectDetailUseCase(
  projectDetailsTestRepository
);

describe("Module - Projects Details", () => {
  const project_id = randomUUID();
  const project_slug = "teste";
  describe("Create Project Detail", () => {
    it("deveria criar o detalhes de um projeto com sucesso", async () => {
      const {status,data,error} = await createProject.execute({
        project_id,
        project_slug,
      });

        expect(status).toBe(200);
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("project_id");
    });
  });
});
