import JWT from "jsonwebtoken";
import { config } from "../../config/auth";
import { IAuthRepository } from "../interface-auth-repository";
const NODE_ENV = process.env["NODE_ENV"];
const ExpiresIn = NODE_ENV == "test" ? "1s" : "1m";
export class AuthRepository implements IAuthRepository {
	async authenticate(uuid: string): Promise<string> {
		const jwt = JWT.sign({ uuid }, config.private_key, {
			expiresIn: ExpiresIn, // 1 minuto ou 1 segundos (para testes)
		});
		return jwt;
	}

	async verify(token: string): Promise<any> {
		const decoded = JWT.verify(token, config.private_key);
		return decoded;
	}
}
