import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
});

redis.on("error", (error) => {
    console.error("Erro no Redis:", error);
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Método não permitido."
        });
    }

    try {
        if (!redis.isOpen) {
            await redis.connect();
        }

        const {
            password,
            deviceId,
            token
        } = req.body || {};

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: "Identificador do dispositivo ausente."
            });
        }

        // ==========================================
        // VERIFICAR TOKEN EXISTENTE
        // ==========================================

        if (token) {
            const savedDeviceId =
                await redis.get(`device-token:${token}`);

            if (
                savedDeviceId &&
                savedDeviceId === deviceId
            ) {
                return res.status(200).json({
                    success: true,
                    authorized: true
                });
            }

            return res.status(401).json({
                success: false,
                authorized: false,
                message: "Token inválido."
            });
        }

        // ==========================================
        // PRIMEIRO ACESSO: VERIFICAR SENHA
        // ==========================================

        if (password !== process.env.DEVICE_PASSWORD) {
            return res.status(401).json({
                success: false,
                authorized: false,
                message: "Senha incorreta."
            });
        }

        // ==========================================
        // GERAR TOKEN
        // ==========================================

        const accessToken =
            crypto.randomUUID() +
            "-" +
            crypto.randomUUID();

        // ==========================================
        // SALVAR TOKEN NO REDIS
        // ==========================================

        await redis.set(
            `device-token:${accessToken}`,
            deviceId
        );

        // ==========================================
        // AUTORIZAR DISPOSITIVO
        // ==========================================

        return res.status(200).json({
            success: true,
            authorized: true,
            token: accessToken
        });

    } catch (error) {
        console.error("Erro na API:", error);

        return res.status(500).json({
            success: false,
            authorized: false,
            message: "Erro interno."
        });
    }
}
