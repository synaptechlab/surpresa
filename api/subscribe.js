import { createClient } from "redis";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Método não permitido."
        });
    }

    let redis;

    try {
        const subscription = req.body;

        if (!subscription || !subscription.endpoint) {
            return res.status(400).json({
                success: false,
                message: "Inscrição inválida."
            });
        }

        redis = createClient({
            url: process.env.REDIS_URL
        });

        redis.on("error", (error) => {
            console.error("Erro no Redis:", error);
        });

        await redis.connect();

        await redis.sAdd(
            "push_subscriptions",
            JSON.stringify(subscription)
        );

        await redis.quit();

        return res.status(200).json({
            success: true,
            message: "Inscrição salva com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao salvar inscrição:", error);

        if (redis?.isOpen) {
            await redis.quit();
        }

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}