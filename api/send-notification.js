const webpush = require("web-push");

export default async function handler(req, res) {
    try {
        console.log("1. Testando VAPID...");

        console.log("VAPID_SUBJECT existe:", !!process.env.VAPID_SUBJECT);
        console.log("VAPID_PUBLIC_KEY existe:", !!process.env.VAPID_PUBLIC_KEY);
        console.log("VAPID_PRIVATE_KEY existe:", !!process.env.VAPID_PRIVATE_KEY);

        webpush.setVapidDetails(
            process.env.VAPID_SUBJECT,
            process.env.VAPID_PUBLIC_KEY,
            process.env.VAPID_PRIVATE_KEY
        );

        console.log("2. VAPID configurado!");

        return res.status(200).json({
            success: true,
            vapid: {
                subject: !!process.env.VAPID_SUBJECT,
                publicKey: !!process.env.VAPID_PUBLIC_KEY,
                privateKey: !!process.env.VAPID_PRIVATE_KEY
            }
        });

    } catch (error) {
        console.error("ERRO VAPID:", error);

        return res.status(500).json({
            success: false,
            error: error.message,
            name: error.name
        });
    }
}