import { randomUUID } from "crypto";
import { createUserUseCase } from "../../modules/users/create/create-user-usecase";
import { getUserUseCase } from "../../modules/users/getUser/get-user-usecase";
import { AuthTestRepository } from "../implements/auth-test-repository";
import { UsersTestRepository } from "../implements/users-test-repository";

const usersRepository = new UsersTestRepository();
const authRepository = new AuthTestRepository();

const createUser = new createUserUseCase(usersRepository, authRepository);
const getUser = new getUserUseCase(usersRepository);

describe("Module - Users", () => {
  const user = {
    email: "test@hotmail.com",
    username: "test",
    uuid: randomUUID(),
    id: "",
  };

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

  describe("Get User", () => {
    it("deveria retornar um usuário com sucesso", async () => {
      const { status, data, error } = await getUser.execute({ id: user.id });
      expect(status).toBe(200);
      expect(data).toHaveProperty("id");
    });

    it("não deveria retornar um usuário", async () => {
      const { status, data, error } = await getUser.execute({ id: "test" });
      expect(status).toBe(400);
      expect(error.name).toBe("NotFoundError");
    });
  });
});
