import Redis from "ioredis";

let redis: Redis;
export function connectionRedis(): Redis | null {
  try {
    const host = process.env["REDIS_HOST"];
    const port = process.env["REDIS_PORT"];
    const password = process.env["REDIS_PASSWORD"];

    if (!host || !port || !password) {
      console.error("missing redis config");
      return null;
    }

    if (redis) {
      return redis;
    }
    redis = new Redis({
      host,
      port: Number(port),
      password,
    });

    redis.on("error", (err) => {
      redis.disconnect();
      console.error(err);
    });
    return redis.status === "ready" ? redis : null;
  } catch (error) {
    return null;
  }
}
