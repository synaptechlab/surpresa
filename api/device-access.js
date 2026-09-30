export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Método não permitido."
        });
    }

    try {
        const { password, deviceId } = req.body || {};

        if (!deviceId) {
            return res.status(400).json({
                success: false,
                message: "Identificador do dispositivo ausente."
            });
        }

        if (password !== process.env.DEVICE_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Senha incorreta."
            });
        }

        return res.status(200).json({
            success: true,
            deviceId
        });

    } catch (error) {
        console.error("Erro na API:", error);

        return res.status(500).json({
            success: false,
            message: "Erro interno."
        });
    }
}
