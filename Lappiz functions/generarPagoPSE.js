(async () => {
    // =====================================================================
    // PSE - Crear transacción (CrearTransaccionPSE)
    // Integración directa con el Web Service de PSE Vendedor (SOAP).
    // Devuelve el TransactionID y la URL a la que se redirige al pagador.
    // Reemplaza PSE_LOGIN/PSE_PASSWORD/PSE_WSDL por tu certificación PSE.
    // =====================================================================
    const PSE_LOGIN = "TU_USUARIO_PSE";
    const PSE_PASSWORD = "TU_CLAVE_PSE";
    const PSE_WSDL = "https://TU_URL_DEL_WS_PSE/VendedorService.svc";
    const PSE_NAMESPACE = "http://www.pse.com.co/Vendedor/";
    const PSE_CODIGO_SERVICIO = "TU_CODIGO_SERVICIO";
    const PSE_RFC = "TU_RFC_VENDEDOR";
    const PSE_URL_RETORNO = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/respuestaPSE";

    const {
        codigoBanco,
        numeroDocumento,
        tipoDocumento,
        nombreCliente,
        emailCliente,
        telefonoCliente,
        valorTransaccion,
        referencia,
        tipoPersona,
        descripcion,
        ipCliente,
    } = obj.body;

    const bodyXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <CrearTransaccionPSE xmlns="${PSE_NAMESPACE}">
      <sCodigoBanco>${codigoBanco}</sCodigoBanco>
      <sNumeroDocumento>${numeroDocumento}</sNumeroDocumento>
      <sTipoDocumento>${tipoDocumento}</sTipoDocumento>
      <sNombreCliente>${nombreCliente}</sNombreCliente>
      <sEmailCliente>${emailCliente}</sEmailCliente>
      <sTelefonoCliente>${telefonoCliente}</sTelefonoCliente>
      <sValorTransaccion>${valorTransaccion}</sValorTransaccion>
      <sCodigoServicio>${PSE_CODIGO_SERVICIO}</sCodigoServicio>
      <sRFC>${PSE_RFC}</sRFC>
      <sReferencia>${referencia}</sReferencia>
      <sTipoPersona>${tipoPersona}</sTipoPersona>
      <sDescripcion>${descripcion}</sDescripcion>
      <sURLRetorno>${PSE_URL_RETORNO}</sURLRetorno>
      <fIngresaDesdeInternet>false</fIngresaDesdeInternet>
      <fDetalleInformacionVendedor>false</fDetalleInformacionVendedor>
      <sIPCliente>${ipCliente || "127.0.0.1"}</sIPCliente>
    </CrearTransaccionPSE>
  </soap:Body>
</soap:Envelope>`;

    const response = await axios.request({
        method: "post",
        url: PSE_WSDL,
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `${PSE_NAMESPACE}CrearTransaccionPSE`,
            Authorization: "Basic " + Buffer.from(`${PSE_LOGIN}:${PSE_PASSWORD}`).toString("base64"),
        },
        data: bodyXml,
    });

    const xml = response.data;
    const transactionID = extraer(xml, "transactionID") || extraer(xml, "TransactionID");
    const url = extraer(xml, "url") || extraer(xml, "URL") || "";
    const fIrATransaccion = extraer(xml, "fIrATransaccion") || "";

    await modelo.ExpresoBrasilia_Lappiz_Pagos.create({
        CodigoReferencia: referencia,
        Valor: valorTransaccion,
        Moneda: "COP",
        Firma: "",
        Created_date: new Date(),
        CEData: JSON.stringify(obj.body),
        Estado: "Pendiente",
    });

    res.json({
        status: true,
        data: { transactionID, url: url.startsWith("http") ? url : `https://${url}`, fIrATransaccion },
    });
})();

function extraer(xml, tag) {
    const match = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(xml || "");
    return match ? match[1].trim() : "";
}