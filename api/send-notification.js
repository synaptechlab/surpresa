const webpush = require("web-push");
const { createClient } = require("redis");

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
    let redis;

    try {
        redis = createClient({
            url: process.env.REDIS_URL
        });

        redis.on("error", (error) => {
            console.error("Erro no Redis:", error);
        });

        await redis.connect();

        const subscriptions = await redis.sMembers(
            "push_subscriptions"
        );

        if (!subscriptions || subscriptions.length === 0) {
            await redis.quit();

            return res.status(200).json({
                success: false,
                message: "Nenhuma inscrição encontrada."
            });
        }

        const payload = JSON.stringify({
            title: "Tem novidade 👀",
            body: "Tem uma nova parte da surpresa esperando por você!"
        });

        let sent = 0;
        let removed = 0;
        let errors = [];

        for (const subscription of subscriptions) {
            try {
                const parsedSubscription =
                    typeof subscription === "string"
                        ? JSON.parse(subscription)
                        : subscription;

                await webpush.sendNotification(
                    parsedSubscription,
                    payload
                );

                sent++;

            } catch (error) {
                console.error("Erro ao enviar:", error);

                errors.push({
                    statusCode: error.statusCode || null,
                    message: error.message
                });

                if (
                    error.statusCode === 404 ||
                    error.statusCode === 410
                ) {
                    await redis.sRem(
                        "push_subscriptions",
                        subscription
                    );

                    removed++;
                }
            }
        }

        await redis.quit();

        return res.status(200).json({
            success: true,
            sent,
            removed,
            errors
        });

    } catch (error) {
        console.error("Erro geral:", error);

        if (redis?.isOpen) {
            await redis.quit();
        }

        return res.status(500).json({
            success: false,
            error: error.message,
            name: error.name
        });
    }
}