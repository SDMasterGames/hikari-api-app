import JWT from "jsonwebtoken";
import { config } from "../../config/auth";
import { IAuthRepository } from "../interface-auth-repository";

export class AuthRepository implements IAuthRepository {
	async authenticate(uuid: string): Promise<string> {
		const jwt = JWT.sign({ uuid }, config.private_key, {
			expiresIn: "1m", // 1 minuto
		});
		return jwt;
	}

	async verify(token: string): Promise<any> {
		const decoded = JWT.verify(token, config.private_key);
		return decoded;
	}
}
