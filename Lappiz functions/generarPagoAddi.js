(async () => {
    // =====================================================================
    // ADDI - Crear solicitud de crédito (http://api-docs-sandbox.addi.com)
    // Cambia ADDI_CLIENT_ID y ADDI_CLIENT_SECRET por los que te entregó Addi
    // y alterna ADDI_AMBIENTE entre "QA" (staging) y "PROD".
    // =====================================================================
    const ADDI_CREDENCIALES = {
        QA: {
            clientId: "TU_CLIENT_ID_QA",
            clientSecret: "TU_CLIENT_SECRET_QA",
            authUrl: "https://auth-sandbox.addi.com",
            baseUrl: "https://api.addi-staging.com",
        },
        PROD: {
            clientId: "TU_CLIENT_ID_PROD",
            clientSecret: "TU_CLIENT_SECRET_PROD",
            authUrl: "https://auth.addi.com",
            baseUrl: "https://api.addi.com",
        },
    };
    const ADDI_AMBIENTE = "QA";
    const ADDI_AUDIENCE = "https://api.addi.com";
    const ADDI_LOGO = "https://static.unitransco.com/wp-content/uploads/2025/09/u.png";
    const ADDI_CALLBACK = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/confirmarPagoAddi";
    const ADDI_REDIRECCION = "https://runtimetest.lappiz.io/#/page/destino/ExpresoBrasilia_Lappiz";

    const config = ADDI_CREDENCIALES[ADDI_AMBIENTE];

    const {
        orderId,
        totalAmount,
        shippingAmount,
        totalTaxesAmount,
        currency,
        items,
        client,
        shippingAddress,
        billingAddress,
        redirectionUrl,
    } = obj.body;

    // 1) Token OAuth2 contra Auth0
    const tokenResponse = await axios.post(
        `${config.authUrl}/oauth/token`,
        new URLSearchParams({
            client_id: config.clientId,
            client_secret: config.clientSecret,
            audience: ADDI_AUDIENCE,
            grant_type: "client_credentials",
        }),
        { headers: { "Content-Type": "application/json" } }
    );
    const accessToken = tokenResponse.data?.access_token;

    // 2) Crear la solicitud online
    const callerReference = orderId || "ADD-" + Date.now();
    const payload = {
        orderId: callerReference,
        totalAmount: String(totalAmount || 0),
        shippingAmount: String(shippingAmount || 0),
        totalTaxesAmount: String(totalTaxesAmount || 0),
        currency: currency || "COP",
        items: (items || []).map((item) => ({
            sku: item.sku || "SKU_" + (item.name || "").slice(0, 20),
            name: item.name || "Tiquete",
            quantity: String(item.quantity || 1),
            unitPrice: item.unitPrice || 0,
            tax: item.tax || 0,
            pictureUrl: item.pictureUrl || "",
            category: item.category || "transporte",
            brand: item.brand || "Expreso Brasilia",
        })),
        client: {
            idType: client?.idType || "CC",
            idNumber: client?.idNumber || "1111111111",
            firstName: client?.firstName || "Cliente",
            lastName: client?.lastName || "Expreso Brasilia",
            email: client?.email || "",
            cellphone: client?.cellphone || "3000000000",
            cellphoneCountryCode: client?.cellphoneCountryCode || "+57",
            address: {
                street: client?.address?.street || "sin direccion",
                city: client?.address?.city || "Bogota",
                state: client?.address?.state || "Cundinamarca",
                postalCode: client?.address?.postalCode || "00000",
                country: "CO",
            },
        },
        shippingAddress: shippingAddress || {},
        billingAddress: billingAddress || {},
        allyUrlRedirection: {
            logoUrl: ADDI_LOGO,
            callbackUrl: ADDI_CALLBACK,
            redirectionUrl: redirectionUrl || ADDI_REDIRECCION,
        },
    };

    const applicationResponse = await axios.request({
        method: "post",
        url: `${config.baseUrl}/v1/online-applications`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "ExpresoBrasilia_Lappiz/1.0",
        },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
    });

    let applicationUrl = "";
    if (applicationResponse.headers?.location) {
        applicationUrl = applicationResponse.headers.location;
    } else if (applicationResponse.data) {
        applicationUrl =
            applicationResponse.data.redirectionUrl ||
            applicationResponse.data.applicationUrl ||
            applicationResponse.data.initPoint ||
            applicationResponse.data?._links?.webRedirect?.href ||
            "";
    }

    await modelo.ExpresoBrasilia_Lappiz_Pagos.create({
        CodigoReferencia: callerReference,
        Valor: totalAmount || 0,
        Moneda: currency || "COP",
        Firma: "",
        Created_date: new Date(),
        CEData: JSON.stringify(obj.body),
        Estado: "Pendiente",
    });

    res.json({ status: true, data: { applicationUrl, callerReference } });
})();