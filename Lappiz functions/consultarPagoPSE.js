(async () => {
    // =====================================================================
    // PSE - Consultar estado de la transacción (DevolverInfoTransaccionPSE)
    // PSE notifica el resultado al sURLRetorno configurado y/o se consulta
    // este servicio. Reemplaza PSE_LOGIN/PSE_PASSWORD/PSE_WSDL por tu
    // certificación PSE.
    // =====================================================================
    const PSE_LOGIN = "TU_USUARIO_PSE";
    const PSE_PASSWORD = "TU_CLAVE_PSE";
    const PSE_WSDL = "https://TU_URL_DEL_WS_PSE/VendedorService.svc";
    const PSE_NAMESPACE = "http://www.pse.com.co/Vendedor/";

    const { transactionID, referencia, fechaTransaccion } = obj.body;

    const bodyXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <DevolverInfoTransaccionPSE xmlns="${PSE_NAMESPACE}">
      <sTransactionID>${transactionID}</sTransactionID>
      <sReference>${referencia}</sReference>
      <sBankingDate>${fechaTransaccion || ""}</sBankingDate>
    </DevolverInfoTransaccionPSE>
  </soap:Body>
</soap:Envelope>`;

    const response = await axios.request({
        method: "post",
        url: PSE_WSDL,
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `${PSE_NAMESPACE}DevolverInfoTransaccionPSE`,
            Authorization: "Basic " + Buffer.from(`${PSE_LOGIN}:${PSE_PASSWORD}`).toString("base64"),
        },
        data: bodyXml,
    });

    const xml = response.data;
    // Estados típicos PSE: 1 REGISTRADA, 2 PROCESANDO, 3 EXITOSA (aprobada),
    // 4 FALLIDA, 5 ANULADA, 6 ABANDONADA
    const transactionState = extraer(xml, "TransactionState") || extraer(xml, "transactionState") || "";
    const message = extraer(xml, "mensaje") || extraer(xml, "Mensaje") || "";

    res.json({
        status: true,
        data: {
            transactionState,
            mensaje: message,
            pagado: String(transactionState) === "3",
        },
    });
})();

function extraer(xml, tag) {
    const match = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(xml || "");
    return match ? match[1].trim() : "";
}