import { randomUUID } from "crypto";
import { createProjectDetailUseCase } from "../../modules/projects-details/createDetail/create-project-detail-usecase";
import { getProjectDetailUseCase } from "../../modules/projects-details/getDetail/get-project-detail-usecase";
import { CacheTestRepository } from "../implements/cache-test-repository";
import { ProjectDetailsTestRepository } from "../implements/projects-details-test-repository";

const projectDetailsTestRepository = new ProjectDetailsTestRepository();
const cacheTestRepository = new CacheTestRepository();

const createProjectDetail = new createProjectDetailUseCase(
  projectDetailsTestRepository
);

const getProjectDetail = new getProjectDetailUseCase(
  projectDetailsTestRepository,
  cacheTestRepository
);

describe("Module - Projects Details", () => {
  const project_id = randomUUID();
  const project_slug = "teste";
  describe("Create Project Detail", () => {
    it("deveria criar o detalhes de um projeto com sucesso", async () => {
      const { status, data, error } = await createProjectDetail.execute({
        project_id,
        project_slug,
      });

      expect(status).toBe(200);
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("project_id");
    });

    it("deveria falhar na ausência do project_slug",async ()=>{
      const { status, data, error } = await createProjectDetail.execute({
        project_id,
        project_slug:"",
      });
      expect(status).toBe(400);
      expect(error.name).toBe("MissingParams");
      
    })

    it("deveria falhar na ausência do project_id",async ()=>{
      const { status, data, error } = await createProjectDetail.execute({
        project_id:"",
        project_slug,
      });
      expect(status).toBe(400);
      expect(error.name).toBe("MissingParams");
      
    })
  });

  describe("Get Project Detail",()=>{
    it("deveria obter o detalhes de um projeto com sucesso", async () => {
      const { status, data, error } = await getProjectDetail.execute({
        project_id,
        project_slug,
      });

      expect(status).toBe(200);
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("project_id");
    })
  })
});
