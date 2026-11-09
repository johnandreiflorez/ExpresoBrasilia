(async () => {
    // =====================================================================
    // NEQUI CONECTA - Pago con QR dinámico
    // Cambia aquí las credenciales que asignó Nequi (Portal de Desarrolladores
    // Nequi, https://api.nequi.com.co) y el ambiente a usar.
    // =====================================================================
    const NEQUI_CREDENCIALES = {
        QA: {
            clientId: "TU_CLIENT_ID_QA",
            clientSecret: "TU_CLIENT_SECRET_QA",
            apiKey: "TU_X_API_KEY_QA",
            tokenUrl: "https://us.b2c.qa.nequi.com/oauth/token",
            baseUrl: "https://api.sandbox.nequi.com",
        },
        PROD: {
            clientId: "TU_CLIENT_ID_PROD",
            clientSecret: "TU_CLIENT_SECRET_PROD",
            apiKey: "TU_X_API_KEY_PROD",
            tokenUrl: "https://oauth.nequi.com/oauth2/token?grant_type=client_credentials",
            baseUrl: "https://api.nequi.com",
        },
    };

    // Alterna entre "QA" y "PROD" cuando quieras probar/producir
    const AMBIENTE = "QA";
    const config = NEQUI_CREDENCIALES[AMBIENTE];

    const { companyId, value, reference, messageId, data } = obj.body;

    // 1) Token OAuth2 (Basic auth con client_id:client_secret en base64)
    const basic = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
    const tokenResponse = await axios.post(
        config.tokenUrl,
        "grant_type=client_credentials",
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${basic}`,
            },
        }
    );
    const accessToken = tokenResponse.data?.access_token;

    // 2) Crear el cobro (QR dinámico)
    const requestBody = {
        RequestMessage: {
            RequestHeader: {
                Channel: "MF-001",
                RequestDate: fechaColombia(),
                MessageID: messageId || String(Date.now()).slice(-10),
                ClientID: companyId,
                Destination: {
                    ServiceName: "PaymentsService",
                    ServiceOperation: "generateCodeQR",
                    ServiceRegion: "C001",
                    ServiceVersion: "1.2.0",
                },
            },
            RequestBody: {
                any: {
                    generateCodeQRRQ: {
                        code: reference || "COMPRA_1",
                        value: String(value || 0),
                        currency: "COP",
                        reference: reference || "",
                    },
                },
            },
        },
    };

    const response = await axios.post(
        `${config.baseUrl}/payments/v2/-services-paymentservice-generatecodeqr`,
        requestBody,
        {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": config.apiKey,
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const rs = response.data?.ResponseMessage?.ResponseBody?.any?.generateCodeQRRS || {};
    const qrRaw = rs.qr || rs.code || "";

    await modelo.ExpresoBrasilia_Lappiz_Pagos.create({
        CodigoReferencia: reference || "COMPRA_1",
        Valor: value || 0,
        Moneda: "COP",
        Firma: "",
        Created_date: new Date(),
        CEData: JSON.stringify(data || {}),
        Estado: "Pendiente",
    });

    res.json({
        status: true,
        data: {
            qr: qrRaw,
            qrCompleto: qrRaw.startsWith("bancadigital-") ? qrRaw : "bancadigital-" + qrRaw,
            code: rs.code || "",
            expirationTime: rs.expirationTime || "",
            message: rs.message || "",
        },
    });
})();

function fechaColombia() {
    const now = new Date();
    const local = new Date(now.getTime() + -5 * 60 * 60000);
    return local.toISOString().replace("Z", "-05:00");
}