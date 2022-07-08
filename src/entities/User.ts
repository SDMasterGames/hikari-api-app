import { ValidateUtils } from "../utils";
import { ChapterRead } from "./ChapterRead";

interface IUserProps {
	uuid: string;
	username: string;
	email: string;
	avatar_url: string;
	created_at: string;
	updated_at: string;
	favorites: string[];
	chapters_read: ChapterRead[];
}

interface IUserCreateProps {
	uuid: string;
	username: string;
	email: string;
	avatar_url: string;
	created_at: string;
	updated_at: string;
	favorites: string[];
	chapters_read: ChapterRead[] | any[];
}

export class User {
	private readonly uuid: string;
	private readonly profile: {
		username: string;
		email: string;
		avatar_url: string;
	};
	private readonly created_at: string;
	private readonly updated_at: string;

	private readonly favorites: string[];
	private readonly chapters_read: ChapterRead[];

	constructor(props: IUserProps) {
		this.uuid = props.uuid;
		this.profile = {
			username: props.username,
			email: props.email,
			avatar_url: props.avatar_url,
		};

		this.created_at = props.created_at;
		this.updated_at = props.updated_at;

		this.chapters_read = props.chapters_read;
		this.favorites = props.favorites;
	}

	getProfile() {
		return this.profile;
	}

	getFavorites() {
		return this.favorites;
	}

	getAt() {
		return {
			created_at: this.created_at,
			updated_at: this.updated_at,
		};
	}

	getUuid() {
		return this.uuid;
	}

	get() {
		return {
			chapters_read: this.chapters_read,
			create_at: this.created_at,
			favorites: this.favorites,
			profile: this.profile,
			update_at: this.updated_at,
		};
	}

	static create(props: IUserCreateProps) {
		if (!ValidateUtils.StringValid(props.username)) {
			throw new Error("username é inválido");
		}

		if (!ValidateUtils.StringValid(props.email)) {
			throw new Error("email é inválido");
		}

		if (!ValidateUtils.StringValid(props.avatar_url)) {
			throw new Error("avatar_url é inválido");
		}

		if (!Array.isArray(props.favorites)) {
			throw new Error("favorites é inválido");
		}

		if (!Array.isArray(props.chapters_read)) {
			throw new Error("chapters read é inválido");
		}

		return new User({
			...props,
			chapters_read:
				props.chapters_read instanceof ChapterRead
					? props.chapters_read
					: props.chapters_read.map(elem => ChapterRead.create(elem)),
		});
	}
}
