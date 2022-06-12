export interface ICacheRepository {
  get(key: string): Promise<any | undefined>;
  set(key: string, value: any, expire_seconds: number): Promise<any>;
}
