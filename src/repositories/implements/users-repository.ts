import { prisma } from "../../lib/database";

import {
	ICreateUserData,
	IFindByEmailAndUuidData,
	IUsersRepository,
} from "../interface-users-repository";
import { UserData } from "../ports";

const UsersDB = prisma.user;

const avatarDefault =
	"https://i.pinimg.com/736x/bc/6e/01/bc6e011fdcff6f03977c13e0db1ce6c3.jpg";

export class UsersRepository implements IUsersRepository {
	async create({
		email,
		username,
		uuid,
		avatar_url,
	}: ICreateUserData): Promise<UserData> {
		const result = await UsersDB.create({
			data: {
				avatar_url: avatar_url || avatarDefault,
				email,
				username,
				uuid,
				updated_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
				favorites: [],
			},
			include: {
				chapters_read: true,
			},
		});
		return result;
	}
	async findByEmailAndUuid({
		email,
		uuid,
	}: IFindByEmailAndUuidData): Promise<UserData | null> {
		const result = await UsersDB.findFirst({
			where: {
				email,
				uuid,
			},
			include: {
				chapters_read: true,
			},
		});
		return result;
	}
	async findByUuid(uuid: string): Promise<UserData | null> {
		const result = await UsersDB.findFirst({
			where: {
				uuid,
			},
			include: {
				chapters_read: true,
			},
		});
		return result;
	}
	async cleandb(): Promise<void> {
		await UsersDB.deleteMany({});
	}
}
