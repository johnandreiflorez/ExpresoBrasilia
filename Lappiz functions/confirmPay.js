(async () => {
  const crypto = require('crypto');
  const API_KEY = "4Vj8eK4rloUd272L48hsrarnUA";
  const MERCHANT_ID = "508029";
  try {
    const { reference_sale, value, currency, state_pol, sign, response_message_pol } = obj.body;
    console.log("🔔 Notificación PayU recibida:", obj.body);
    //formatera value to two decimals
    const TX_VALUE = normalizeAmount(value);
    const localSignatureString = `${API_KEY}~${MERCHANT_ID}~${reference_sale}~${TX_VALUE}~${currency}~${state_pol}`;
    console.log("String para firma local:", localSignatureString);
    const localSignature = crypto.createHash('md5').update(localSignatureString, 'utf8').digest('hex');

    console.log("Firma PayU:", sign);
    console.log("Firma Local:", localSignature);

    if (localSignature !== sign) {
      console.error("❌ Firma inválida, posible manipulación.");
      return res.status(400).send("Invalid signature");
    }

    if (state_pol === "4" && response_message_pol === "APPROVED") {
      console.log("✅ Pago aprobado:", reference_sale);

    } else if (state_pol === "6") {
      console.log("❌ Pago rechazado:", reference_sale);

    } else if (state_pol === "7") {
      console.log("⏳ Pago pendiente:", reference_sale);

    }
    const pago = await modelo.ExpresoBrasilia_Lappiz_Pagos.findOne({ where: { CodigoReferencia: reference_sale } });
    await modelo.ExpresoBrasilia_Lappiz_Pagos.update({ DataRespuesta: JSON.stringify(obj.body), Estado: state_pol === "4" ? 'Aprobado' : state_pol === "6" ? 'Rechazado' : state_pol === "7" ? 'Pendiente' : 'Desconocido' }, { where: { CodigoReferencia: reference_sale } })
    if (pago && pago.CEData) {
      const dataBody = JSON.parse(pago.CEData);
      dataBody.data.tiquetes.map(tiquete => {
        tiquete.titularPago.numeroIdentificacion = dataBody.titularPago.numeroIdentificacion;
        tiquete.titularPago.nombre = dataBody.titularPago.primerNombre + (dataBody.titularPago.segundoNombre ? ' ' + dataBody.titularPago.segundoNombre : '') + ' ' + dataBody.titularPago.primerApellido + (dataBody.titularPago.segundoApellido ? ' ' + dataBody.titularPago.segundoApellido : '');
        return tiquete;
      });
      await grabarTicket(dataBody.data);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("⚠️ Error en confirmPay:", err);
    res.status(500).send("Server error");
  }
})();
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

async function grabarTicket(dataBody) {
  try {
    let data = JSON.stringify(dataBody);
    console.log("Data para grabar ticket:", data);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://testportalapp.expresobrasilia.com//BrasiliaTiquetesWS/api/v1/tiquetes/grabarTiquete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic QlJBU0lMSUFfUFJVRUJBUzpCcmFzaWxpYS4yMDI0Kg=='
      },
      data: data
    };
    const response = await axios.request(config)
    const proccesSendEmail = async (arrayBodies) => {
      for (let currentBody of arrayBodies) {
        await enviarTiquetePorEmail(currentBody);
      }
    }
    const dataSendMail = Array.isArray(response.data) ? response.data : response.data.data;
    for (let currentSend of dataSendMail) {
      if (currentSend.ida.length > 0)
        await proccesSendEmail(currentSend.ida);
      if (currentSend.vuelta.length > 0)
        await proccesSendEmail(currentSend.vuelta);
    }

  } catch (error) {
    console.error('Error al grabar el ticket:', error);
  }
}

async function getToken() {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://testportalapp.expresobrasilia.com/BrasiliaServices/login/authenticate?username=WSAPPWEB&password=Brasilia2026*',
      headers: {}
    };
    const response = await axios.request(config);
    return response.data.token;
  } catch (error) {
    console.error('Error al recuperar el token de brasilia:', error);
    return ''
  }
}

async function enviarTiquetePorEmail(dataBody) {
  try {
    console.log("Data para enviar tiquete por email:", dataBody);
    const token = await getToken();
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://testportalapp.expresobrasilia.com/BrasiliaServices/tickets/enviarTiquete?codigoEmpresa=${dataBody.codigoEmpresa}&codigoAgencia=${dataBody.codigoAgencia}&numeroTiquete=${dataBody.numeroTiquete}&email=${dataBody.email}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.request(config)
  } catch (error) {
    console.error('Error al enviar el tiquete por email:', error);
  }
}