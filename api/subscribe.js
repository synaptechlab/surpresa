import { Redis } from "@upstash/redis";

export default async function handler(req, res) {
    try {
        const redis = Redis.fromEnv();

        await redis.set("test_connection", "funcionando");

        const value = await redis.get("test_connection");

        return res.status(200).json({
            success: true,
            redis: value
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            name: error.name
        });
    }
}