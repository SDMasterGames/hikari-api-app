import Redis from "ioredis";
import { connectionRedis } from "../../lib/cache-redis";
import { ICacheRepository } from "../interface-cache-repository";

export class CacheRepository implements ICacheRepository {
  async get(key: string): Promise<any | undefined> {
    const redis = connectionRedis();
    if (!redis) return undefined;
    const results = await redis.get(key);
    return results ? JSON.parse(results) : results;
  }

  async set(
    key: string,
    value: any,
    expire_seconds: number = 60
  ): Promise<any | undefined> {
    const redis = connectionRedis();
    if (!redis) return undefined;
    await redis.set(key, JSON.stringify(value), "EX", expire_seconds);
  }
}
