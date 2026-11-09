(async () => {
    // =====================================================================
    // ADDI - Webhook / confirmación de la solicitud de crédito
    // Addi notifica aquí el estado de la solicitud (callbackUrl). Cuando la
    // solicitud es aprobada se graban los tiquetes, igual que confirmPay.
    // =====================================================================
    try {
        const body = obj.body;
        console.log("🔔 Notificación Addi:", body);
        const application = body.application || body.data || body;
        const reference = application.reference || body.reference || application.orderId || "";
        const estado = (application.status || body.status || "").toUpperCase();
        const aprobado = /APPROVED|APROBADO|ACCEPTED/i.test(estado);

        const pago = await modelo.ExpresoBrasilia_Lappiz_Pagos.findOne({ where: { CodigoReferencia: reference } });
        await modelo.ExpresoBrasilia_Lappiz_Pagos.update(
            { DataRespuesta: JSON.stringify(body), Estado: aprobado ? "Aprobado" : "Rechazado" },
            { where: { CodigoReferencia: reference } }
        );

        if (aprobado && pago && pago.CEData) {
            const dataBody = JSON.parse(pago.CEData);
            dataBody.data.tiquetes.map((tiquete) => {
                tiquete.titularPago.numeroIdentificacion = dataBody.titularPago.numeroIdentificacion;
                tiquete.titularPago.nombre = dataBody.titularPago.primerNombre + (dataBody.titularPago.segundoNombre ? " " + dataBody.titularPago.segundoNombre : "") + " " + dataBody.titularPago.primerApellido + (dataBody.titularPago.segundoApellido ? " " + dataBody.titularPago.segundoApellido : "");
                return tiquete;
            });
            await grabarTicket(dataBody.data);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("⚠️ Error en confirmarPagoAddi:", error);
        res.status(500).send("Server error");
    }
})();

async function grabarTicket(dataBody) {
    try {
        let data = JSON.stringify(dataBody);
        console.log("Data para grabar ticket:", data);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://testportalapp.expresobrasilia.com//BrasiliaTiquetesWS/api/v1/tiquetes/grabarTiquete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic QlJBU0lMSUFfUFJVRUJBUzpCcmFzaWxpYS4yMDI0Kg=="
            },
            data: data,
        };
        const response = await axios.request(config);
        const dataSendMail = Array.isArray(response.data) ? response.data : response.data.data;
        for (let currentSend of dataSendMail) {
            if (currentSend.ida.length > 0) await proccesSendEmail(currentSend.ida);
            if (currentSend.vuelta.length > 0) await proccesSendEmail(currentSend.vuelta);
        }
    } catch (error) {
        console.error("Error al grabar el ticket:", error);
    }
}

async function proccesSendEmail(arrayBodies) {
    for (let currentBody of arrayBodies) {
        await enviarTiquetePorEmail(currentBody);
    }
}

async function getToken() {
    try {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://testportalapp.expresobrasilia.com/BrasiliaServices/login/authenticate?username=WSAPPWEB&password=Brasilia2026*",
            headers: {},
        };
        const response = await axios.request(config);
        return response.data.token;
    } catch (error) {
        console.error("Error al recuperar el token de brasilia:", error);
        return "";
    }
}

async function enviarTiquetePorEmail(dataBody) {
    try {
        const token = await getToken();
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://testportalapp.expresobrasilia.com/BrasiliaServices/tickets/enviarTiquete?codigoEmpresa=${dataBody.codigoEmpresa}&codigoAgencia=${dataBody.codigoAgencia}&numeroTiquete=${dataBody.numeroTiquete}&email=${dataBody.email}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        const response = await axios.request(config);
    } catch (error) {
        console.error("Error al enviar el tiquete por email:", error);
    }
}