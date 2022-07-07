import "dotenv/config";
import { randomUUID } from "crypto";
import { createProjectDetailUseCase } from "../../modules/projects-details/createDetail/create-project-detail-usecase";
import { getProjectDetailUseCase } from "../../modules/projects-details/getDetail/get-project-detail-usecase";
import { updateProjectDetailUseCase } from "../../modules/projects-details/updateDetail/update-project-detail-usecase";
import { CacheTestRepository } from "../implements/cache-test-repository";

import {
  ProjectDetailsRepository,
  StatsRepository,
} from "../../repositories/implements/";
import { StatsView } from "../../entities";

const projectDetailsTestRepository = new ProjectDetailsRepository();
const cacheTestRepository = new CacheTestRepository();
const statsTestRepository = new StatsRepository();

const createProjectDetail = new createProjectDetailUseCase(
  projectDetailsTestRepository
);

const getProjectDetail = new getProjectDetailUseCase(
  projectDetailsTestRepository,
  cacheTestRepository
);

const updateProjectDetail = new updateProjectDetailUseCase(
  projectDetailsTestRepository,
  statsTestRepository
);

describe("Module - Projects Details", () => {
  afterAll(async () => await projectDetailsTestRepository.cleandb());

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
      expect(data).toHaveProperty("stats.id");
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
          likes: "test_id",
          id,
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("stats.likes[0]", "test_id");
      });
      it("deveria atualizar a quantidade de likes removendo um valor com sucesso", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          likes: "test_id",
          id,
        });
        expect(status).toBe(200);
        expect(data).not.toHaveProperty("stats.likes[0]", "test_id");
      });

      it("deveria falhar se informa um valor invalido", async () => {
        const test1 = await updateProjectDetail.execute({
          //@ts-ignore
          likes: null,
          id,
        });
        expect(test1.status).toBe(400);
        expect(test1.error.name).toBe("InvalidParams");

        const test2 = await updateProjectDetail.execute({
          likes: undefined,
          id,
        });
        expect(test2.status).toBe(400);
        expect(test2.error.name).toBe("InvalidParams");

        const test3 = await updateProjectDetail.execute({
          likes: "",
          id,
        });
        expect(test3.status).toBe(400);
        expect(test3.error.name).toBe("InvalidParams");
      });
    });

    describe("Prop Views", () => {
      it("deveria adicionar um novo contador de views", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          views: "1",
          id,
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("stats.views[0].count", 0);
        expect(data).toHaveProperty("stats.views[0].date", StatsView.DateNow());
      });

      it("deveria atualizar a quantidade do contador dos views", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          views: "1",
          id,
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("stats.views[0].count", 1);
        expect(data).toHaveProperty("stats.views[0].date", StatsView.DateNow());
      });

      it("deveria falhar ao informa um valor invalido", async () => {
        const test1 = await updateProjectDetail.execute({
          //@ts-ignore
          views: null,
          id,
        });
        expect(test1.status).toBe(400);
        expect(test1.error.name).toBe("InvalidParams");

        const test2 = await updateProjectDetail.execute({
          views: undefined,
          id,
        });
        expect(test2.status).toBe(400);
        expect(test2.error.name).toBe("InvalidParams");

        const test3 = await updateProjectDetail.execute({
          views: "",
          id,
        });
        expect(test3.status).toBe(400);
        expect(test3.error.name).toBe("InvalidParams");
      });
    });

    /* describe("Prop Comments", () => {
      it("deveria adicionar um comentario com sucesso", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          id,
          data: {
            addComment: "test_id",
          },
        });
        expect(status).toBe(200);
        expect(data).toHaveProperty("comments[0]", "test_id");
      });

      it("deveria falha caso seja informado um id invalid", async () => {
        const { status, data, error } = await updateProjectDetail.execute({
          id,
          data: {
            addComment: "",
          },
        });
        expect(status).toBe(400);
        expect(error.name).toBe("InvalidParams");
      });
    }); */
  });
});
