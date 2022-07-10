import { randomUUID } from "crypto";
import "dotenv/config";
import { CreateUserUseCase, AuthUserUseCase } from "../../modules/users/";
import { UsersRepository } from "../../repositories/implements/";

const usersRepository = new UsersRepository();

describe("Modulos - Users", () => {
	afterAll(async () => await usersRepository.cleandb());
	const email = "test@test.com";
	const uuid = randomUUID();
	const username = "test";
	var token = "";
	describe("Create User", () => {
		it("deveria criar um usuário com sucesso!", async () => {
			const { status, data, error } = await CreateUserUseCase.execute({
				email,
				uuid,
				username,
			});
			expect(status).toBe(201);
			expect(data).toHaveProperty("token");
			expect(data).toHaveProperty("user");
			expect(data).not.toHaveProperty("user.uuid");
			expect(data).not.toHaveProperty("token", undefined);
		});
		it("deveria falhar ao tentar cadastrar um email que já existe!", async () => {
			const { status, data, error } = await CreateUserUseCase.execute({
				email,
				uuid,
				username,
			});
			expect(status).toBe(400);
			expect(error.name).toBe("AlreadyExistsError");
		});
		it("deveria falhar na ausência de um email!", async () => {
			const { status, data, error } = await CreateUserUseCase.execute({
				uuid,
				username,
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência de um username!", async () => {
			const { status, data, error } = await CreateUserUseCase.execute({
				uuid,
				email,
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência de um uuid!", async () => {
			const { status, data, error } = await CreateUserUseCase.execute({
				email,
				username,
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
	});

	describe("Auth User", () => {
		it("deveria retornar o usuário autenticado com o token", async () => {
			const { status, data, error } = await AuthUserUseCase.execute({
				email,
				uuid,
			});
			token = data.token;
			expect(status).toBe(200);
			expect(data).toHaveProperty("token");
			expect(data).toHaveProperty("user");
			expect(data.user).not.toHaveProperty("uuid");
			expect(data.user).toHaveProperty("id");
		});

		it("deveria falhar na ausência do email", async () => {
			const { status, data, error } = await AuthUserUseCase.execute({
				email: "",
				uuid,
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência do uuid", async () => {
			const { status, data, error } = await AuthUserUseCase.execute({
				email,
				uuid: "",
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
	});
});
