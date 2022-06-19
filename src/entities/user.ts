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

export class User {
  public id: string;
  public uuid: string;
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
}
