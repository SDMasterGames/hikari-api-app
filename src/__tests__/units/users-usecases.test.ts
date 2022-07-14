import { randomUUID } from "crypto";

import { authUserUseCase } from "../../modules/users/auth/auth-user-usecase";
import { createUserUseCase } from "../../modules/users/create/create-user-usecase";
import { getUserUseCase } from "../../modules/users/getUser/get-user-usecase";
import { revalidateUserUseCase } from "../../modules/users/revalidate/revalidate-user-usecase";
import { updateUserUseCase } from "../../modules/users/update/update-user-usecase";
import { AuthTestRepository } from "../implements/auth-test-repository";
import { UsersTestRepository } from "../implements/users-test-repository";

const usersRepository = new UsersTestRepository();
const authRepository = new AuthTestRepository();

const createUser = new createUserUseCase(usersRepository, authRepository);
const authUser = new authUserUseCase(usersRepository, authRepository);
const getUser = new getUserUseCase(usersRepository);
const revalidateUser = new revalidateUserUseCase(authRepository);
const updateUser = new updateUserUseCase(usersRepository);

describe("Module - Users", () => {
	const user = {
		email: "test@hotmail.com",
		username: "test",
		uuid: randomUUID(),
		id: "",
	};
	let token = "";
	describe("Create User", () => {
		it("deveria criar um usuário com sucesso", async () => {
			const { status, data, error } = await createUser.execute(user);
			expect(status).toBe(201);
			user.id = data.user.id;
			expect(data.user).toHaveProperty("id");
			expect(data).toHaveProperty("token");
		});

		it("deveria falhar ao tentar cadastrar um usuário com email já cadastrado", async () => {
			const { status, data, error } = await createUser.execute(user);
			expect(status).toBe(400);
			expect(error.name).toBe("AlreadyExistsError");
		});

		it("deveria falhar ao tentar cadastrar um usuário com uuid diferente", async () => {
			const { status, data, error } = await createUser.execute({
				avatar_url: "",
				email: user.email,
				username: user.username,
				uuid: randomUUID(),
			});
			expect(status).toBe(400);
			expect(error.name).toBe("AlreadyExistsError");
		});
	});

	describe("Auth User", () => {
		it("deveria retornar o usuário autenticado com o token", async () => {
			const { status, data, error } = await authUser.execute({
				email: user.email,
				uuid: user.uuid,
			});
			token = data.token;
			expect(status).toBe(200);
			expect(data).toHaveProperty("token");
			expect(data).toHaveProperty("user");
			expect(data.user).not.toHaveProperty("uuid");
			expect(data.user).toHaveProperty("id");
		});

		it("deveria falhar na ausência do email", async () => {
			const { status, data, error } = await authUser.execute({
				email: "",
				uuid: user.uuid,
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
		it("deveria falhar na ausência do uuid", async () => {
			const { status, data, error } = await authUser.execute({
				email: user.email,
				uuid: "",
			});

			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
	});

	describe("Revalidate User", () => {
		it("deveria revalidar o usuário com sucesso", async () => {
			const { status, data, error } = await revalidateUser.execute({
				token,
			});
			expect(status).toBe(200);
		});

		it("deveria falha por jwt malformatado", async () => {
			const { status, data, error } = await revalidateUser.execute({
				token: "pao",
			});
			expect(status).toBe(400);
			expect(error.message).toBe("jwt malformed");
		});
		it("deveria falha por token expirado", async () => {
			await new Promise(r => setTimeout(r, 1000)); //1 segundo
			const { status, data, error } = await revalidateUser.execute({
				token,
			});
			expect(status).toBe(400);
			expect(error.message).toBe("jwt expired");
		});
	});

	describe("Get User", () => {
		it("deveria retornar um usuário com sucesso", async () => {
			const { status, data, error } = await getUser.execute({
				uuid: user.uuid,
			});
			expect(status).toBe(200);
			expect(data).toHaveProperty("id");
		});

		it("não deveria retornar um usuário", async () => {
			const { status, data, error } = await getUser.execute({ uuid: "test" });
			expect(status).toBe(400);
			expect(error.name).toBe("NotFoundError");
		});
	});

	describe("Update User", () => {
		it("deveria atualizar com sucesso o avatar_url do usuário", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				avatar_url: "https://github.com/matheusgmc.png",
			});
			expect(status).toBe(200);
			expect(data).not.toHaveProperty("uuid");
			expect(data).toHaveProperty(
				"profile.avatar_url",
				"https://github.com/matheusgmc.png"
			);
		});

		it("deveria falhar ao informa um avatar_url inválido", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				avatar_url: "https://github.com/matheusgmc",
			});
			expect(status).toBe(400);
			expect(error.name).toBe("InvalidParams");
		});

		it("deveria adicionar um favorito novo ao usuário", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				favorites: "node",
			});
			expect(status).toBe(200);
			expect(data).not.toHaveProperty("uuid");
			expect(data).toHaveProperty("favorites[0]", "node");
			expect(data).toHaveProperty("favorites.length", 1);
		});
		it("deveria remover o favorito do usuário", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				favorites: "node",
			});
			expect(status).toBe(200);
			expect(data).not.toHaveProperty("uuid");
			expect(data).not.toHaveProperty("favorites[0]", "node");
			expect(data).toHaveProperty("favorites.length", 0);
		});

		it("deveria falhar na ausência de um uuid", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: "",
			});
			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
		it("deveria falhar ao informa um avatar_url inválido", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				avatar_url: "",
			});
			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});

		it("deveria falhar ao informa um favorites inválido", async () => {
			const { status, data, error } = await updateUser.execute({
				uuid: user.uuid,
				favorites: "",
			});
			expect(status).toBe(400);
			expect(error.name).toBe("MissingParams");
		});
	});
});
