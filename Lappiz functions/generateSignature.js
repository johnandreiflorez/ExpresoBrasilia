(async () => {

    const crypto = require('crypto');
    let { referenceCode, amount, currency, data } = obj.body;
    amount = amount || 10000.00;
    currency = currency || 'COP';

    const apiKey = "4Vj8eK4rloUd272L48hsrarnUA"; // ⚠️ solo en backend
    const merchantId = "508029";

    const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${normalizeAmount(amount)}~${currency}`;
    console.log("String para firma:", signatureString);
    const signature = crypto.createHash('md5').update(signatureString, 'utf8').digest('hex');//crypto.MD5(signatureString).toString();
    console.log("Firma generada:", signature);

    await modelo.ExpresoBrasilia_Lappiz_Pagos.create({
        CodigoReferencia: referenceCode,
        Valor: amount,
        Moneda: currency,
        Firma: signature,
        Created_date: new Date(),
        CEData: JSON.stringify(data),
        Estado: 'Pendiente'
    })

    res.json({ signature });
})()

function normalizeAmount(amount) {
    let num = parseFloat(amount);

    if (Number.isNaN(num)) {
        throw new Error(`El valor amount no es numérico: ${amount}`);
    }

    // Convertir a string con 2 decimales para analizar
    let [entero, dec] = num.toFixed(2).split(".");
    dec = dec || "00";

    const d1 = parseInt(dec[0]); // primer decimal
    const d2 = parseInt(dec[1]); // segundo decimal

    // Caso especial: exacto .00 → dejar como .0
    if (d1 === 0 && d2 === 0) {
        return `${entero}.0`;
    }

    // Aplicar round half to even
    if (d2 === 5) {
        if (d1 % 2 === 0) {
            // primer decimal par → redondea hacia abajo
            return `${entero}.${d1}`;
        } else {
            // primer decimal impar → redondea hacia arriba
            return `${entero}.${d1 + 1}`;
        }
    } else {
        // Redondeo normal a 1 decimal
        return (Math.round(num * 10) / 10).toFixed(1);
    }
}