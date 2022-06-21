import { randomUUID } from "crypto";

interface IUserProps {
  id?: string;
  uuid: string;

  profile: {
    username: string;
    email: string;
    avatar_url?: string;
  };
  create_at?: string;
  update_at?: string;

  favorites?: string[];
  chapters_read?: IChaptersReadProps[];
}

interface IChaptersReadProps {
  project_detail_id: string;
  chapters: string[];
}

interface IUserGet extends Omit<IUserProps, "uuid"> {
  create_at: string;
  update_at: string;
  favorites: string[];
  id: string;
  chapters_read: IChaptersReadProps[];
}

export class User {
  private uuid: string;
  public id: string;
  public profile: {
    username: string;
    email: string;
    avatar_url: string;
  };
  public create_at: string;
  public updated_at: string;

  public favorites: string[];
  public chapters_read: IChaptersReadProps[];

  constructor(props: IUserProps, id?: string) {
    this.id = id || randomUUID();
    this.uuid = props.uuid;
    this.profile = {
      username: props.profile.username,
      email: props.profile.email,
      avatar_url: props.profile.avatar_url || "",
    };

    this.create_at = props.create_at || new Date().toISOString().split("T")[0];
    this.updated_at = props.update_at || new Date().toISOString().split("T")[0];

    this.chapters_read = props.chapters_read || [];
    this.favorites = props.favorites || [];
  }

  get(): IUserGet {
    return {
      chapters_read: this.chapters_read,
      create_at: this.create_at,
      favorites: this.favorites,
      profile: this.profile,
      update_at: this.updated_at,
      id: this.id,
    };
  }

  getUuid() {
    return this.uuid;
  }
}
