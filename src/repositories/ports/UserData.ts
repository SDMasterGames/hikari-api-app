import { ChapterReadData } from "./ChapterReadData";

export interface UserData {
  id: string;
  uuid: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  favorites: string[];
  chapters_read: ChapterReadData[];
}
