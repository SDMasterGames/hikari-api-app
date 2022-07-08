import { app } from "../../server";
import request from "supertest";

jest.setTimeout(10000);

describe("Controller - Project", () => {
	describe("getProjects", () => {
		it("Deve obter todos os projetos", async () => {
			const response = await request(app.app).get("/v1/projects/");
			expect(response.status).toBe(200);
			expect(response.body.releases).toHaveLength(10);
		});

		it("Deve obter todos os projetos da pagina - 2", async () => {
			const response = await request(app.app)
				.get("/v1/projects/")
				.query({ page: 2 });
			expect(response.status).toBe(200);
			expect(response.body.releases).toHaveLength(10);
		});

		it("Deve falhar por informa um valor de pagina inválido", async () => {
			const response = await request(app.app)
				.get("/v1/projects/")
				.query({ page: "A" });
			expect(response.status).toBe(400);
			expect(response.body.error.name).toBe("InvalidParams");
		});
	});

	describe("getChapters", () => {
		it("Deve obter todos os capitulos", async () => {
			const response = await request(app.app)
				.get("/v1/projects/chapters")
				.query({
					slug: "kimi-ga-shinu-made-ato-100nichi",
				});

			expect(response.status).toBe(200);
			expect(response.body).toHaveLength(10);
		});

		it("Deve falhar na ausência do slug", async () => {
			const response = await request(app.app)
				.get("/v1/projects/chapters")
				.query({
					slug: "",
				});

			expect(response.status).toBe(400);
			expect(response.body.error.name).toBe("MissingParams");
		});

		it("Deve falhar ao não encontrar capitulos com o slug informado.", async () => {
			const response = await request(app.app)
				.get("/v1/projects/chapters")
				.query({
					slug: "pao-de-arroz",
				});

			expect(response.status).toBe(500);
			expect(response.body.error.name).toBe("ServerError");
		});
	});

	describe("getFavorites", () => {
		it("Deve obter todos os capitulos favoritos", async () => {
			const response = await request(app.app)
				.get("/v1/projects/favorites")
				.query({
					id: "10054",
				});
			expect(response.status).toBe(200);
			expect(response.body).toHaveLength(1);
		});

		it("Deve falhar na ausência de um id inválido", async () => {
			const response = await request(app.app)
				.get("/v1/projects/favorites")
				.query({
					id: "",
				});
			expect(response.status).toBe(400);
			expect(response.body.error.name).toBe("MissingParams");
		});
	});
});
