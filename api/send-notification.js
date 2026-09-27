const webpush = require("web-push");
const { createClient } = require("redis");

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);


// ==========================================
// DATAS DAS REVELAÇÕES
// ==========================================

const revelationDates = [
    "2026-09-27",
    "2026-10-04",
    "2026-10-11",
    "2026-10-18",
    "2026-10-25",
    "2026-11-01",
    "2026-11-08",
    "2026-11-15",
    "2026-11-22",
    "2026-11-29",
    "2026-12-06",
    "2026-12-13"
];


// ==========================================
// DATA ATUAL EM HORÁRIO DE BRASÍLIA
// ==========================================

function getBrazilDate() {

    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());

}


// ==========================================
// ENVIO DAS NOTIFICAÇÕES
// ==========================================

export default async function handler(req, res) {

    let redis;

    try {

        const today = getBrazilDate();

        console.log("Data atual:", today);


        // ==================================
        // VERIFICA SE HOJE TEM REVELAÇÃO
        // ==================================

        if (!revelationDates.includes(today)) {

            return res.status(200).json({
                success: true,
                sent: 0,
                removed: 0,
                message: "Hoje não há nenhuma revelação programada.",
                date: today
            });

        }


        // ==================================
        // CONECTA AO REDIS
        // ==================================

        redis = createClient({
            url: process.env.REDIS_URL
        });

        redis.on("error", (error) => {
            console.error("Erro no Redis:", error);
        });

        await redis.connect();


        // ==================================
        // BUSCA AS INSCRIÇÕES
        // ==================================

        const subscriptions = await redis.sMembers(
            "push_subscriptions"
        );


        if (!subscriptions || subscriptions.length === 0) {

            await redis.quit();

            return res.status(200).json({
                success: true,
                sent: 0,
                removed: 0,
                message: "Nenhuma inscrição encontrada."
            });

        }


        // ==================================
        // MENSAGEM
        // ==================================

        const payload = JSON.stringify({

            title: "Tem novidade 👀",

            body: "Tem uma nova parte da surpresa esperando por você!"

        });


        let sent = 0;
        let removed = 0;
        let errors = [];


        // ==================================
        // ENVIA PARA CADA DISPOSITIVO
        // ==================================

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

                console.error(
                    "Erro ao enviar:",
                    error
                );


                errors.push({

                    statusCode:
                        error.statusCode || null,

                    message:
                        error.message

                });


                // ==================================
                // REMOVE INSCRIÇÕES INVÁLIDAS
                // ==================================

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


        // ==================================
        // RESPOSTA
        // ==================================

        return res.status(200).json({

            success: true,

            sent,

            removed,

            errors,

            date: today

        });


    } catch (error) {

        console.error(
            "Erro geral:",
            error
        );


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