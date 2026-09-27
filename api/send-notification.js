const { createClient } = require("redis");

async function handler(req, res) {
    let redis;

    try {
        console.log("1. Iniciando teste");

        console.log(
            "2. REDIS_URL existe:",
            !!process.env.REDIS_URL
        );

        redis = createClient({
            url: process.env.REDIS_URL
        });

        redis.on("error", (error) => {
            console.error("Redis error:", error);
        });

        console.log("3. Conectando ao Redis...");

        await redis.connect();

        console.log("4. Redis conectado!");

        const subscriptions = await redis.sMembers(
            "push_subscriptions"
        );

        console.log(
            "5. Inscrições encontradas:",
            subscriptions.length
        );

        await redis.quit();

        return res.status(200).json({
            success: true,
            redis: true,
            subscriptions: subscriptions.length
        });

    } catch (error) {
        console.error("ERRO COMPLETO:", error);

        if (redis?.isOpen) {
            await redis.quit();
        }

        return res.status(500).json({
            success: false,
            error: error.message,
            name: error.name,
            stack: error.stack
        });
    }
}

module.exports = handler;