import { getChaptersUseCase } from "../../modules/projects/getChapters/get-chapters-usecase";
import { getFavoritesUseCase } from "../../modules/projects/getFavorites/get-favorites-usecase";
import { getHomeUseCase } from "../../modules/projects/getHome/get-home-usecase";
import { CacheTestRepository } from "../implements/cache-test-repository";
import { ProjectsTestRepository } from "../implements/projects-test-repository";

const projectsTestRepository = new ProjectsTestRepository();
const cacheTestRepository = new CacheTestRepository();

const getTestHome = new getHomeUseCase(
  projectsTestRepository,
  cacheTestRepository
);

const getTestChapters = new getChaptersUseCase(
  projectsTestRepository,
  cacheTestRepository
);

const getTestFavorites = new getFavoritesUseCase(
  projectsTestRepository,
  cacheTestRepository
);

describe("Modulo - Projects", () => {
  describe("getHome", () => {
    it("Obter todos os Projetos da Home", async () => {
      const { status, data, error } = await getTestHome.execute({});
      expect(status).toBe(200);
      expect(data).toHaveProperty("releases");
      expect(data.releases).toHaveLength(4);
      expect(data).toHaveProperty("slides");
    });
    it("Obter todos os Projetos da Home - Pagina 2", async () => {
      const { status, data, error } = await getTestHome.execute({ page: "2" });
      expect(status).toBe(200);
      expect(data).toHaveProperty("releases");
      expect(data.releases).toHaveLength(1);
      expect(data).toHaveProperty("slides");
    });
    it("Deve retornar erro ao obter todos os Projetos da Home - Pagina 3", async () => {
      const { status, data, error } = await getTestHome.execute({ page: "3" });
      expect(status).toBe(500);
      expect(data).toBeUndefined();
      expect(error).toHaveProperty("message");
    });

    it("Deve retorna um erro ao enviar uma pagina invalida", async () => {
      const { status, data, error } = await getTestHome.execute({
        page: "test",
      });
      expect(status).toBe(400);
      expect(data).toBeUndefined();
      expect(error.name).toBe("InvalidParams");
    });
  });

  describe("getChapters", () => {
    it("Obter todos os Capitulos de um Projeto", async () => {
      const { status, data, error } = await getTestChapters.execute({
        slug: "test-chapter",
      });
      expect(status).toBe(200);
      expect(data).toHaveLength(1);
    });
    it("Deve retorna um erro ao não encontra os capitulos", async () => {
      const { status, data, error } = await getTestChapters.execute({
        slug: "test",
      });
      expect(status).toBe(500);
      expect(data).toBeUndefined();
      expect(error.message).toBe("No Data");
    });

    it("Deve retorna um erro ao não informa um slug de projeto", async () => {
      const { status, data, error } = await getTestChapters.execute({
        slug: "",
      });
      expect(status).toBe(400);
      expect(data).toBeUndefined();
      expect(error.name).toBe("MissingParams");
    });
  });

  describe("getFavorites", () => {
    it("Obter todos os projetos favoritos", async () => {
      const { status, data, error } = await getTestFavorites.execute({
        id: "10",
      });
      expect(status).toBe(200);
      expect(data).toHaveLength(1);
    });

    it("Falhar ao ausencia do parametro id", async () => {
      const { status, data, error } = await getTestFavorites.execute({
        id: "",
      });
      expect(status).toBe(400);
      expect(error.name).toBe("MissingParams");
    });

    it("Falhar ao não encontrar nenhum projeto", async () => {
        const { status, data, error } = await getTestFavorites.execute({
          id: "1",
        });
        expect(status).toBe(500);
        expect(error.message).toBe("No Data");
      });
  });
});
