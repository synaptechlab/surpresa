import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({
                success: false,
                message: "Método não permitido."
            });
        }

        const subscription = req.body;

        if (!subscription || !subscription.endpoint) {
            return res.status(400).json({
                success: false,
                message: "Inscrição inválida."
            });
        }

        await redis.sadd(
            "push_subscriptions",
            JSON.stringify(subscription)
        );

        return res.status(200).json({
            success: true,
            message: "Inscrição salva com sucesso!"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}