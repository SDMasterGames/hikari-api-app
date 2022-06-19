import { User } from "../../entities/user";
import {
  IFindByEmailAndUuidData,
  IUsersRepository,
  ICreateUserData,
} from "../../repositories/interface-users-repository";

const users = new Map<string, User>();

export class UsersTestRepository implements IUsersRepository {
  create({
    email,
    username,
    uuid,
    avatar_url,
  }: ICreateUserData): Promise<User> {
    const user = new User({
      uuid,
      profile: {
        email,
        username,
        avatar_url,
      },
    });
    users.set(user.id, user);
    return Promise.resolve(user);
  }

  findByEmailAndUuid(data: IFindByEmailAndUuidData): Promise<boolean> {
    var user = null;
    users.forEach((value, key) => {
      if (value.profile.email === data.email || value.uuid === data.uuid) {
        user = value;
      }
    });
    return Promise.resolve(!!user);
  }
}
