import { User } from "../../entities/User";
import {
  IFindByEmailAndUuidData,
  IUsersRepository,
  ICreateUserData,
} from "../../repositories/interface-users-repository";

const users = new Map<string, any>();

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

  findByEmailAndUuid(data: IFindByEmailAndUuidData): Promise<User | null> {
    var user = null;
    users.forEach((value, key) => {
      const {id,...props} = value
      const item = new User(props,id);
      if (value.profile.email === data.email || item.getUuid() === data.uuid) {
        user = value;
      }
    });
    return Promise.resolve(user || null);
  }

  async findById(id: string): Promise<User | null> {
    return Promise.resolve(users.get(id) || null);
  }
}
