import { IUsersRepository } from "../../../repositories/interface-users-repository";
import { IAuthRepository } from "../../../repositories/interface-auth-repository";
import { MissingParams, AlreadyExistsError } from "../../errors";
import { badRequest, created, serverError } from "../../httpHelper";
import { ICreateUserRequestDTO } from "./create-user-dto";

export class createUserUseCase {
  constructor(
    private IUsersRepository: IUsersRepository,
    private IAuthRepository: IAuthRepository
  ) {}
  async execute({ avatar_url, email, username, uuid }: ICreateUserRequestDTO) {
    try {
      if (!email || !username || !uuid) {
        return badRequest(new MissingParams("email, username ou uuid"));
      }

      if (
        await this.IUsersRepository.findByEmailAndUuid({
          email,
          uuid,
        })
      ) {
        return badRequest(new AlreadyExistsError("User already exists"));
      }

      const createUser = await this.IUsersRepository.create({
        email,
        username,
        uuid,
        avatar_url,
      });

      const token = await this.IAuthRepository.authenticate(uuid);

      return created({
        user: createUser,
        token: token,
      });
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
