import { randomUUID } from "crypto";
import "dotenv/config";
import { CreateUserUseCase } from "../../modules/users/";
import { UsersRepository } from "../../repositories/implements/";

const usersRepository = new UsersRepository();

describe("Modulos - Users", () => {
	afterAll(async () => await usersRepository.cleandb());
	const email = "test@test.com";
	const uuid = randomUUID();
	const username = "test";
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
});
