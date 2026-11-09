(async () => {
    // =====================================================================
    // NEQUI CONECTA - Consulta de estado del pago (getStatusPayment)
    // Usado para hacer polling mientras el usuario aprueba el pago en la app.
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

    const AMBIENTE = "QA";
    const config = NEQUI_CREDENCIALES[AMBIENTE];

    const { companyId, qr, transactionalCode, messageId } = obj.body;

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

    const requestBody = {
        RequestMessage: {
            RequestHeader: {
                Channel: "MF-001",
                RequestDate: fechaColombia(),
                MessageID: messageId || String(Date.now()).slice(-10),
                ClientID: companyId,
                Destination: {
                    ServiceName: "PaymentsService",
                    ServiceOperation: "getStatusPayment",
                    ServiceRegion: "C001",
                    ServiceVersion: "1.2.0",
                },
            },
            RequestBody: {
                any: {
                    getStatusPaymentRQ: {
                        codeQR: qr,
                        transactionalCode: transactionalCode || "",
                    },
                },
            },
        },
    };

    const response = await axios.post(
        `${config.baseUrl}/payments/v2/-services-paymentservice-getstatuspayment`,
        requestBody,
        {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": config.apiKey,
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const rs = response.data?.ResponseMessage?.ResponseBody?.any?.getStatusPaymentRS || {};

    res.json({
        status: true,
        data: {
            ...rs,
            codigoQREstado: rs.codeQRStatus || "",
            mensaje: rs.message || "",
            pagado: /paid|success|aprobado|exitoso|SUCCESS/i.test(JSON.stringify(rs)),
        },
    });
})();

function fechaColombia() {
    const now = new Date();
    const local = new Date(now.getTime() + -5 * 60 * 60000);
    return local.toISOString().replace("Z", "-05:00");
}