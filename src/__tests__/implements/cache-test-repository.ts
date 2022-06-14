import { ICacheRepository } from "../../repositories/interface-cache-repository";

const cache = new Map<string, any>();

export class CacheTestRepository implements ICacheRepository {
  get(key: string): Promise<any | null> {
    const result = cache.get(key);
    return Promise.resolve(result || null);
  }
  set(key: string, value: any, expire_seconds?: number | undefined): Promise<any | null> {
    cache.set(key, value);
    return Promise.resolve();
  }
}
