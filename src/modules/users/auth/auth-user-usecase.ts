import { User } from "../../../entities";
import { IAuthRepository } from "../../../repositories/interface-auth-repository";
import { IUsersRepository } from "../../../repositories/interface-users-repository";
import { MissingParams, NotFoundError } from "../../errors";
import { badRequest, IHttpResponse, ok, serverError } from "../../httpHelper";
import { IAuthUserRequestDTO } from "./auth-user-dto";

export class authUserUseCase {
  constructor(
    private IUsersRepository: IUsersRepository,
    private IAuthRepository: IAuthRepository
  ) {}
  async execute({ email, uuid }: IAuthUserRequestDTO): Promise<IHttpResponse> {
    try {
      if (!email || !uuid) {
        return badRequest(new MissingParams("email ou uuid"));
      }

      const result = await this.IUsersRepository.findByEmailAndUuid({
        email,
        uuid,
      });

      if (!result) {
        return badRequest(new NotFoundError("Usuário não existe!"));
      }

      const user = User.create(result);

      const token = await this.IAuthRepository.authenticate(user.getUuid());

      return ok({ user: { ...user.get(), id: result.id }, token });
    } catch (error: any) {
      return serverError(error.message);
    }
  }
}
