(async () => {
    const CryptoJS = require('crypto-js');
    const API_KEY = '56b2c7e0c8b6b19a32c2a2334812f866'; // Clave para la firma digital
    const API_LOGIN = '49d116d1f9a2b75a13778a87b3726569'; // Clave para el JSON body
    const MERCHANT_ID = '501300';
    const ACCOUNT_ID = '501300';
    const PAYU_URL = 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi';
    try {
        const { amount, currency, creditCardData, payerData } = obj.body;

        // 1. Generar la firma digital
        const referenceCode = `TEST_${new Date().getTime()}`;
        const signatureString = `${API_KEY}~${MERCHANT_ID}~${referenceCode}~${amount}~${currency}`;
        const signature = CryptoJS.MD5(signatureString).toString();

        // 2. Construir el body JSON para PayU
        const payuBody = {
            "test": true,
            "language": "es",
            "command": "SUBMIT_TRANSACTION",
            "merchant": {
                "apiLogin": API_LOGIN,
                "apiKey": API_KEY // La API Key real va aquí
            },
            "transaction": {
                "order": {
                    "accountId": ACCOUNT_ID,
                    "referenceCode": referenceCode,
                    "description": "Pago desde mi API",
                    "language": "es",
                    "signature": signature,
                    "additionalValues": {
                        "TX_VALUE": {
                            "value": amount,
                            "currency": currency
                        }
                    }
                },
                "payer": {
                    "fullName": payerData.fullName,
                    "emailAddress": payerData.emailAddress
                },
                "creditCard": {
                    "number": creditCardData.number,
                    "securityCode": creditCardData.securityCode,
                    "expirationDate": creditCardData.expirationDate,
                    "name": creditCardData.name
                },
                "type": "AUTHORIZATION_AND_CAPTURE",
                "paymentMethod": "VISA",
                "paymentCountry": "CO",
                "ipAddress": req.ip || '127.0.0.1'
            }
        };

        // 3. Enviar la petición a PayU
        const response = await axios.post(PAYU_URL, payuBody, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        // 4. Devolver la respuesta de PayU al frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error al procesar la transacción:', error.response.data || error.message);
        res.status(500).json({ error: 'Error al procesar la transacción.' });
    }
})();