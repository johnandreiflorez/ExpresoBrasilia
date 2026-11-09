(async () => {
    // =====================================================================
    // PSE - Obtener árbol de bancos disponibles (DevolverArbolServicios)
    // Integración directa con el Web Service de PSE Vendedor (SOAP).
    // Reemplaza PSE_LOGIN/PSE_PASSWORD/PSE_WSDL con los datos de tu
    // certificación PSE (AC.H. Colombia te los entrega al certificarte).
    // =====================================================================
    const PSE_LOGIN = "TU_USUARIO_PSE";
    const PSE_PASSWORD = "TU_CLAVE_PSE";
    const PSE_WSDL = "https://TU_URL_DEL_WS_PSE/VendedorService.svc";
    const PSE_NAMESPACE = "http://www.pse.com.co/Vendedor/";
    const PSE_RFC = "TU_RFC_VENDEDOR";

    const bodyXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <DevolverArbolServicios xmlns="${PSE_NAMESPACE}">
      <sRFC>${PSE_RFC}</sRFC>
    </DevolverArbolServicios>
  </soap:Body>
</soap:Envelope>`;

    const response = await axios.request({
        method: "post",
        url: PSE_WSDL,
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `${PSE_NAMESPACE}DevolverArbolServicios`,
            Authorization: "Basic " + Buffer.from(`${PSE_LOGIN}:${PSE_PASSWORD}`).toString("base64"),
        },
        data: bodyXml,
    });

    const xml = response.data;
    const matches = [];
    const reBanco = /<sCodigoPSE>([^<]+)<\/sCodigoPSE>[\s\S]*?<Nombre>([^<]+)<\/Nombre>/g;
    let match;
    while ((match = reBanco.exec(xml)) !== null) {
        matches.push({ codigo: match[1], nombre: match[2] });
    }

    res.json({ status: true, data: matches });
})();