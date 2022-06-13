import Redis from "ioredis";
import { connectionRedis } from "../../lib/cache-redis";
import { ICacheRepository } from "../interface-cache-repository";

export class CacheRepository implements ICacheRepository {
  public redis = connectionRedis();
  async get(key: string): Promise<any | undefined> {
    if (!this.redis) return undefined;
    const results = await this.redis.get(key);
    return results ? JSON.parse(results) : results;
  }

  async set(
    key: string,
    value: any,
    expire_seconds: number
  ): Promise<any | undefined> {
    if (!this.redis) return undefined;
    await this.redis.set(key, JSON.stringify(value), "EX", expire_seconds);
  }
}
