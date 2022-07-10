import { User } from "../entities/User";
import { UserData } from "./ports";

export interface IFindByEmailAndUuidData {
	email: string;
	uuid: string;
}

export interface ICreateUserData {
	uuid: string;
	email: string;
	username: string;
	avatar_url?: string;
}

export interface IUsersRepository {
	create(data: ICreateUserData): Promise<UserData>;

	findByEmailAndUuid(data: IFindByEmailAndUuidData): Promise<UserData | null>;
	findByUuid(uuid: string): Promise<UserData | null>;

	//usado apenas para testes, nunca usar em produção
	cleandb(): Promise<void>;
}
