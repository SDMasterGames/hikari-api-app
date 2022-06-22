import JWT from "jsonwebtoken";
import { IAuthRepository } from "../../repositories/interface-auth-repository";

const private_key = "private_key";

export class AuthTestRepository implements IAuthRepository {
  async authenticate(uuid: string): Promise<string> {
    const jwt = JWT.sign({ uuid }, private_key, {
      expiresIn: "1s",
    });
    return jwt;
  }

  async verify(token: string): Promise<any> {
    try {
      const decoded = JWT.verify(token, private_key,{
        ignoreExpiration:false
      });
      return { data: decoded };
    } catch (error) {
      return { error };
    }
  }
}
