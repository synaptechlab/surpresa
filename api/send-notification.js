const webpush = require("web-push");
const { Redis } = require("@upstash/redis");

const redis = Redis.fromEnv();

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

async function handler(req, res) {
    try {
        const subscriptions = await redis.smembers("push_subscriptions");

        if (!subscriptions || subscriptions.length === 0) {
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

                if (
                    error.statusCode === 404 ||
                    error.statusCode === 410
                ) {
                    await redis.srem(
                        "push_subscriptions",
                        typeof subscription === "string"
                            ? subscription
                            : JSON.stringify(subscription)
                    );

                    removed++;
                }
            }
        }

        return res.status(200).json({
            success: true,
            sent,
            removed
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = handler;