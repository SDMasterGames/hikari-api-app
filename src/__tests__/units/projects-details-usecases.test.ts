import { randomUUID } from "crypto";
import { createProjectDetailUseCase } from "../../modules/projects-details/createDetail/create-project-detail-usecase";
import { getProjectDetailUseCase } from "../../modules/projects-details/getDetail/get-project-detail-usecase";
import { updateProjectDetailUseCase } from "../../modules/projects-details/updateDetail/update-project-detail-usecase";
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

const updateProjectDetail = new updateProjectDetailUseCase(
  projectDetailsTestRepository
);

describe("Module - Projects Details", () => {
  const project_id = randomUUID();
  const project_slug = "teste";
  var id: any;
  describe("Create Project Detail", () => {
    it("deveria criar o detalhes de um projeto com sucesso", async () => {
      const { status, data, error } = await createProjectDetail.execute({
        project_id,
        project_slug,
      });
      id = data.id;
      expect(status).toBe(200);
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("project_id");
    });

    it("deveria falhar na ausência do project_slug", async () => {
      const { status, data, error } = await createProjectDetail.execute({
        project_id,
        project_slug: "",
      });
      expect(status).toBe(400);
      expect(error.name).toBe("MissingParams");
    });

    it("deveria falhar na ausência do project_id", async () => {
      const { status, data, error } = await createProjectDetail.execute({
        project_id: "",
        project_slug,
      });
      expect(status).toBe(400);
      expect(error.name).toBe("MissingParams");
    });
  });

  describe("Get Project Detail", () => {
    it("deveria obter o detalhes de um projeto com sucesso", async () => {
      const { status, data, error } = await getProjectDetail.execute({
        project_id,
        project_slug,
      });

      expect(status).toBe(200);
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("project_id");
    });
  });

  describe("Update Project Detail", () => {
    describe("Prop Likes", () => {
      it("deveria atualizar a quantidade de likes adicionando um valor com sucesso", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          data: {
            likes: "test_id",
          },
          id,
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("metrics.likes[0]", "test_id");
      });
      it("deveria atualizar a quantidade de likes removendo um valor com sucesso", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          data: {
            likes: "test_id",
          },
          id,
        });
        expect(status).toBe(200);
        expect(data).not.toHaveProperty("metrics.likes[0]", "test_id");
      });

      it("deveria falhar se informa um valor invalido", async () => {
        const test1 = await updateProjectDetail.execute({
          data: {
            likes: null,
          },
          id,
        });
        expect(test1.status).toBe(400);
        expect(test1.error.name).toBe("InvalidParams");

        const test2 = await updateProjectDetail.execute({
          data: {
            likes: undefined,
          },
          id,
        });
        expect(test2.status).toBe(400);
        expect(test2.error.name).toBe("InvalidParams");

        const test3 = await updateProjectDetail.execute({
          data: {
            likes: "",
          },
          id,
        });
        expect(test3.status).toBe(400);
        expect(test3.error.name).toBe("InvalidParams");
      });
    });

    describe("Prop Clicks", () => {
      it("deveria atualizar a quantidade do contador dos clicks", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          data: {
            clicks: 1,
          },
          id,
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("metrics.clicks[0].count", 1);
        expect(data).toHaveProperty(
          "metrics.clicks[0].date",
          new Date().toISOString().split("T")[0]
        );
      });

      it("deveria falhar ao informa um valor invalido", async () => {
        const test1 = await updateProjectDetail.execute({
          data: {
            clicks: null,
          },
          id,
        });
        expect(test1.status).toBe(400);
        expect(test1.error.name).toBe("InvalidParams");

        const test2 = await updateProjectDetail.execute({
          data: {
            clicks: undefined,
          },
          id,
        });
        expect(test2.status).toBe(400);
        expect(test2.error.name).toBe("InvalidParams");

        const test3 = await updateProjectDetail.execute({
          data: {
            clicks: "",
          },
          id,
        });
        expect(test3.status).toBe(400);
        expect(test3.error.name).toBe("InvalidParams");

        const test4 = await updateProjectDetail.execute({
          data: {
            clicks: "sd",
          },
          id,
        });
        expect(test4.status).toBe(500);
        expect(test4.error.name).toBe("ServerError");
      });
    });
  });
});
