import { randomUUID } from "crypto";
import { User } from "../../entities/User";
import {
	IFindByEmailAndUuidData,
	IUsersRepository,
	ICreateUserData,
} from "../../repositories/interface-users-repository";
import { UserData } from "../../repositories/ports";

const users = new Map<string, any>();

export class UsersTestRepository implements IUsersRepository {
	create({
		email,
		username,
		uuid,
		avatar_url,
	}: ICreateUserData): Promise<UserData> {
		const user: UserData = {
			avatar_url: avatar_url || "",
			chapters_read: [],
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			email,
			favorites: [],
			username,
			uuid,
			id: randomUUID(),
		};

		users.set(user.id, user);
		return Promise.resolve(user);
	}

	findByEmailAndUuid(data: IFindByEmailAndUuidData): Promise<UserData | null> {
		var user = null;
		users.forEach((value, key) => {
			const { id, ...props } = value;
			const item = User.create(props);
			if (value.email === data.email || item.getUuid() === data.uuid) {
				user = JSON.parse(JSON.stringify(value));
			}
		});
		return Promise.resolve(user || null);
	}

	async updateAvatarUrl(uuid: string, avatar_url: string): Promise<void> {
		const user = (await this.findByUuid(uuid)) as UserData;
		user.avatar_url = avatar_url;
		users.set(user.id, user);
	}

	async updateFavorites(uuid: string, favorites: string[]): Promise<void> {
		const user = (await this.findByUuid(uuid)) as UserData;
		user.favorites = favorites;
		users.set(user.id, user);
	}

	async findByUuid(uuid: string): Promise<UserData | null> {
		var user = null;
		users.forEach((value, key) => {
			if (value.uuid != uuid) return;
			user = JSON.parse(JSON.stringify(value));
		});
		return Promise.resolve(user);
	}
	async cleandb(): Promise<void> {}
}
