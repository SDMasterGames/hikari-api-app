import { UsersRepository } from "../../repositories/implements/users-repository";

import { app } from "../../server";
import request from "supertest";
import { randomUUID } from "crypto";

const usersRepository = new UsersRepository();

describe("Endpoint - Users", () => {
	const email = "test@test.com";
	const uuid = randomUUID();
	const username = "test";
	var token = "";
	var id = "";

	afterAll(async () => await usersRepository.cleandb());

	describe("Create User", () => {
		it("deveria criar um usuário com sucesso!", async () => {
			const { body, statusCode, error } = await request(app.app)
				.post("/v1/users")
				.send({
					email,
					uuid,
					username,
				});
			expect(statusCode).toBe(201);
			expect(body).toHaveProperty("user.id");
			expect(body).toHaveProperty("token");
			id = body.user.id;
			token = body.token;
		});
		it("deveria falhar ao tentar cadastrar um email que já existe!", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users")
				.send({
					email,
					uuid,
					username,
				});
			expect(status).toBe(400);
			expect(body.error.name).toBe("AlreadyExistsError");
		});
		it("deveria falhar na ausência de um email!", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users")
				.send({
					uuid,
					username,
				});

			expect(status).toBe(400);
			expect(body.error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência de um username!", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users")
				.send({
					uuid,
					email,
				});

			expect(status).toBe(400);
			expect(body.error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência de um uuid!", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users")
				.send({
					email,
					username,
				});

			expect(status).toBe(400);
			expect(body.error.name).toBe("MissingParams");
		});
	});

	describe("Auth User", () => {
		it("deveria retornar o usuário autenticado com o token", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users/auth")
				.send({
					email,
					uuid,
				});
			token = body.token;
			expect(status).toBe(200);
			expect(body).toHaveProperty("token");
			expect(body).toHaveProperty("user");
			expect(body.user).not.toHaveProperty("uuid");
			expect(body.user).toHaveProperty("id");
		});

		it("deveria falhar na ausência do email", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users/auth")
				.send({
					email: "",
					uuid,
				});

			expect(status).toBe(400);
			expect(body.error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência do uuid", async () => {
			const { status, body, error } = await request(app.app)
				.post("/v1/users/auth")
				.send({
					email,
					uuid: "",
				});

			expect(status).toBe(400);
			expect(body.error.name).toBe("MissingParams");
		});
	});

	describe("Revalidate User", () => {
		it("deveria revalidar o usuário com sucesso", async () => {
			const { status, body, error } = await request(app.app).get(
				"/v1/users/revalidate/" + token
			);
			expect(status).toBe(200);
		});

		it("deveria falha por jwt malformatado", async () => {
			const { status, body, error } = await request(app.app).get(
				"/v1/users/revalidate/" + "sdsdd"
			);

			expect(status).toBe(500);
			expect(body.error.message).toBe("jwt malformed");
		});
		it("deveria falha por token expirado", async () => {
			await new Promise(r => setTimeout(r, 1000)); //1 segundo
			const { status, body, error } = await request(app.app).get(
				"/v1/users/revalidate/" + token
			);
			expect(status).toBe(500);
			expect(body.error.message).toBe("jwt expired");
		});
	});
});
