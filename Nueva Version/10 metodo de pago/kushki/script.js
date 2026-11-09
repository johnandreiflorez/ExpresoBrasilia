const PUBLIC_KEY = 'fc746c9c632e4163a7565514ca34a2e5';
const COMPANIA_ID = 'TU_CLIENT_ID_NEQUI';

const LAPPIZ_FUNCTIONS = {
    mediosPago: { nameFunction: 'pagosMediosPago', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_MEDIOS_PAGO' },
    pagosConfig: { nameFunction: 'pagosConfig', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_PAGOS_CONFIG' },
    pagosIniciar: { nameFunction: 'pagosIniciar', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_PAGOS_INICIAR' },
    pagosEstado: { nameFunction: 'pagosEstado', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_PAGOS_ESTADO' },
    pagosSubscribe: { nameFunction: 'pagosSubscribe', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_PAGOS_SUBSCRIBE' },
    obtenerTransaccion: { nameFunction: 'obtenerTransaccion', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_OBTENER_TRANSACCION' },
    crearCompra: { nameFunction: 'crearCompra', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_CREAR_COMPRA' },
    actualizarCompra: { nameFunction: 'actualizarCompra', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_ACTUALIZAR_COMPRA' },
    registrarPasajero: { nameFunction: 'registrarPasajero', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_REGISTRAR_PASAJERO' },
    registrarComprador: { nameFunction: 'registrarComprador', lappizFunctionId: 'CAMBIAR_FUNCTION_ID_REGISTRAR_COMPRADOR' },
};
(async () => {
    // -----------------------
    // Inicializacion y estado
    // -----------------------
    G_deleteHeaderPages();
    G_addStylePages();
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    await G_loadScriptAsync("https://cdn.kushkipagos.com/kushki-checkout.js", "cdn_kushki");
    const pouch = new G_PouchService();
    const compra = await pouch.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas()
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
    }
    const cardAmount = {
        subtotalIva: compra.valorImpuestos || 0,
        iva: compra.valorImpuestos || 0,
        subtotalIva0: +normalizeAmount(compra.totalPagar || 100),
    }
    let kushkiInicializado = false;
    function normalizeAmount(amount) {
        let num = parseFloat(amount);
        if (Number.isNaN(num)) {
            throw new Error("El valor amount no es numerico: " + amount);
        }
        let [entero, dec] = num.toFixed(2).split(".");
        dec = dec || "00";
        const d1 = parseInt(dec[0]);
        const d2 = parseInt(dec[1]);
        if (d1 === 0 && d2 === 0) { return entero + ".0"; }
        if (d2 === 5) {
            return (d1 % 2 === 0) ? entero + "." + d1 : entero + "." + (d1 + 1);
        } else {
            return (Math.round(num * 10) / 10).toFixed(1);
        }
    }

    // -----------------------
    // AUTENTICACION: token al inicio para todos los servicios
    // -----------------------
    const EB_LF = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/";
    async function ebGetToken() {
        try {
            const cached = sessionStorage.getItem("EB_TOKEN");
            if (cached) return cached;
        } catch (e) { }
        const res = await fetch(EB_LF + "getTokenInterno", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        const token = data && data.status ? data.token : "";
        if (token) {
            try { sessionStorage.setItem("EB_TOKEN", token); } catch (e) { }
        }
        return token;
    }
    function ebTokenSync() {
        try { return sessionStorage.getItem("EB_TOKEN") || ""; } catch (e) { return ""; }
    }
    function ebUrlToken(url) {
        const t = ebTokenSync();
        return t ? url + (url.indexOf("?") >= 0 ? "&" : "?") + "token=" + encodeURIComponent(t) : url;
    }
    function ebTransaccionId() {
        if (compra.llaveTransaccion) return compra.llaveTransaccion;
        try {
            const tx = JSON.parse(sessionStorage.getItem("EB_TRANSACCION") || "null");
            return tx && tx.llaveTransaccion ? tx.llaveTransaccion : null;
        } catch (e) { return null; }
    }
    await ebGetToken();

    let mediosPago = [];
    async function cargarMediosPago() {
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.mediosPago, {});
            if (response && !response.error && Array.isArray(response.data)) {
                mediosPago = response.data;
                aplicarMediosPagoUI();
            }
        } catch (e) {
            console.error("medios-pago error:", e);
        }
    }
    function medioPagoId(codigo) {
        const m = mediosPago.find((x) => x.codigo === codigo);
        return m ? m.id : null;
    }
    function aplicarMediosPagoUI() {
        if (!mediosPago.length) return;
        const mapa = { kushki: "TARJETA", transferencia: "TRANSFERENCIA", nequi: "NEQUI", addi: "ADDI" };
        document.querySelectorAll(".payment-card").forEach((card) => {
            const cod = mapa[card.dataset.payment];
            if (!cod) return;
            const disponible = mediosPago.some((m) => m.codigo === cod);
            card.classList.toggle("d-none", !disponible);
        });
    }
    await cargarMediosPago();

    // -----------------------
    // DATOS DEL TITULAR DE LA COMPRA
    // -----------------------
    const tiposIdentificacionTitularEndpoint = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacionTitular?empresa=EC&portal=S&titular=S";

    const titularContainer = document.getElementById("titularContainer");
    const titularNumeroIdInput = document.getElementById("titularNumeroId");
    const titularNombreInput = document.getElementById("titularNombre");
    const facturaTercero = document.getElementById("facturaTercero");
    const terceroCard = document.getElementById("terceroCard");
    const clearTerceroBtn = document.getElementById("clearTerceroBtn");
    const terceroDigContainer = document.getElementById("terceroDigContainer");
    const terceroRazonSocialContainer = document.getElementById("terceroRazonSocialContainer");
    const terceroPersonaNaturalFields = document.getElementById("terceroPersonaNaturalFields");

    function toggleTerceroCampos(tipoDoc) {
        const esNIT = tipoDoc === "NT";
        if (terceroDigContainer) terceroDigContainer.classList.toggle("d-none", !esNIT);
        if (terceroRazonSocialContainer) terceroRazonSocialContainer.classList.toggle("d-none", !esNIT);
        if (terceroPersonaNaturalFields) terceroPersonaNaturalFields.classList.toggle("d-none", esNIT);
    }

    facturaTercero.addEventListener("change", (e) => {
        terceroCard.classList.toggle("d-none", !e.target.checked);
    });

    let dataPaises = [];
    try {
        let nameFunction = 'Paises';
        let lappizFunctionId = '5e011a16-1643-48ed-bbbd-5a3853a62ba8';
        let body = null;
        let method = 'GET';
        let config = { nameFunction, lappizFunctionId, body, method };
        const responsePaises = await execLF(config);
        dataPaises = Array.isArray(responsePaises) ? responsePaises : (responsePaises?.data || []);
    } catch (error) {
        console.error('No se pudieron cargar los paises:', error);
    }

    let terceroTipoIdSelect = null;
    let terceroCodigoPaisSelect = null;
    try {
        const tiposIdTerceroSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: () => ebUrlToken(tiposIdentificacionTitularEndpoint),
                    dataType: "json",
                },
            },
            schema: {
                parse: function (response) {
                    return response && response.data ? response.data : [];
                },
            },
        });

        terceroTipoIdSelect = kendo.jQuery("#terceroTipoId").kendoDropDownList({
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: tiposIdTerceroSource,
            optionLabel: "Seleccione...",
            autoBind: true,
            change: (e) => {
                toggleTerceroCampos(e.sender.value());
            },
        }).data("kendoDropDownList");

        terceroCodigoPaisSelect = kendo.jQuery("#terceroCodigoPais").kendoDropDownList({
            dataSource: dataPaises,
            dataTextField: "Indicativo",
            dataValueField: "Indicativo",
            template: '<img src="#: LinkBandera?.split("|")[2] #" alt="Bandera" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle;"><span>#: Indicativo #</span>',
            valueTemplate: '<img src="#: LinkBandera?.split("|")[2] #" alt="Bandera" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle;"><span>#: Indicativo #</span>',
        }).data("kendoDropDownList");
    } catch (error) {
        console.error('Error al inicializar los widgets Kendo del tercero:', error);
    }

    titularNumeroIdInput.addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) return;
        try {
            let nameFunction = "obtenerPasajero?numDocumento=" + value;
            let lappizFunctionId = "ed4e119c-e5df-451b-9773-999319b575c6";
            let method = "GET";
            let body = {};
            const ebTok = ebTokenSync();
            let config = { nameFunction: ebTok ? nameFunction + "&token=" + encodeURIComponent(ebTok) : nameFunction, lappizFunctionId, body, method };
            const response = await execLF(config);
            if (response.status) {
                const d = response.data || {};
                const nombre = [d.primerNombre, d.primerApellido].filter(Boolean).join(" ");
                if (nombre) titularNombreInput.value = nombre;
            }
        } catch (error) { }
    });

    document.getElementById("terceroNumeroId").addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) return;
        try {
            let nameFunction = "obtenerPasajero?numDocumento=" + value;
            let lappizFunctionId = "ed4e119c-e5df-451b-9773-999319b575c6";
            let method = "GET";
            let body = {};
            const ebTok = ebTokenSync();
            let config = { nameFunction: ebTok ? nameFunction + "&token=" + encodeURIComponent(ebTok) : nameFunction, lappizFunctionId, body, method };
            const response = await execLF(config);
            if (response.status) fillTerceroData(response.data);
        } catch (error) { }
    });

    document.getElementById("terceroNumeroId").addEventListener("input", (e) => {
        const tipoDoc = terceroTipoIdSelect ? terceroTipoIdSelect.value() : "";
        if (tipoDoc === "NT") {
            document.getElementById("terceroDig").value = calculateDV(e.target.value);
        }
    });

    function fillTerceroData(data) {
        if (!data) return;
        document.getElementById("terceroRazonSocial").value = data.razonSocial || data.nombreCompleto || "";
        document.getElementById("terceroNombre1").value = data.primerNombre || "";
        document.getElementById("terceroNombre2").value = data.segundoNombre || "";
        document.getElementById("terceroApellido1").value = data.primerApellido || "";
        document.getElementById("terceroApellido2").value = data.segundoApellido || "";
        document.getElementById("terceroCorreo").value = data.email || "";
    }

    function calculateDV(nit) {
        const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
        let sum = 0;
        const cleanedNit = nit.replace(/\D/g, "");
        const reversedNit = cleanedNit.split("").reverse();
        for (let i = 0; i < reversedNit.length; i++) {
            const digit = parseInt(reversedNit[i], 10);
            sum += digit * weights[i];
        }
        const remainder = sum % 11;
        if (remainder === 0 || remainder === 1) {
            return remainder;
        } else {
            return 11 - remainder;
        }
    }

    clearTerceroBtn.addEventListener("click", () => {
        document.getElementById("terceroNumeroId").value = "";
        document.getElementById("terceroDig").value = "";
        document.getElementById("terceroRazonSocial").value = "";
        document.getElementById("terceroNombre1").value = "";
        document.getElementById("terceroNombre2").value = "";
        document.getElementById("terceroApellido1").value = "";
        document.getElementById("terceroApellido2").value = "";
        document.getElementById("terceroCorreo").value = "";
        document.getElementById("terceroCelular").value = "";
        if (terceroTipoIdSelect) terceroTipoIdSelect.value(null);
        if (terceroCodigoPaisSelect) terceroCodigoPaisSelect.value(null);
        toggleTerceroCampos(null);
    });

    if (compra.facturaTercero) {
        const t = compra.facturaTercero;
        facturaTercero.checked = true;
        terceroCard.classList.remove("d-none");
        document.getElementById("terceroNumeroId").value = t.numeroIdentificacion || "";
        document.getElementById("terceroDig").value = t.digitoVerificacion || "";
        document.getElementById("terceroRazonSocial").value = t.razonSocial || "";
        document.getElementById("terceroNombre1").value = t.primerNombre || "";
        document.getElementById("terceroNombre2").value = t.segundoNombre || "";
        document.getElementById("terceroApellido1").value = t.primerApellido || "";
        document.getElementById("terceroApellido2").value = t.segundoApellido || "";
        document.getElementById("terceroCorreo").value = t.email || "";
        document.getElementById("terceroCelular").value = t.celular || "";
        if (t.tipoIdentificacion && terceroTipoIdSelect) {
            terceroTipoIdSelect.value(t.tipoIdentificacion);
            toggleTerceroCampos(t.tipoIdentificacion);
        }
        if (t.codigoPais && terceroCodigoPaisSelect) terceroCodigoPaisSelect.value(t.codigoPais);
    }

    const tiqueteTitular = compra.data?.tiquetes?.[0]?.titularPago;
    const titularNumero = (tiqueteTitular && tiqueteTitular.numeroIdentificacion) || compra.titularPago?.numeroIdentificacion || "";
    const titularNombre = (tiqueteTitular && tiqueteTitular.nombre) || compra.titularPago?.nombre || "";
    const tieneTitular = !!(titularNumero && titularNombre);

    if (tieneTitular) {
        titularNumeroIdInput.value = titularNumero;
        titularNombreInput.value = titularNombre;
        titularNumeroIdInput.readOnly = true;
        titularNombreInput.readOnly = true;
        titularNumeroIdInput.classList.add("readonly-input");
        titularNombreInput.classList.add("readonly-input");
    } else {
        if (titularContainer) titularContainer.classList.add("d-none");
        facturaTercero.checked = true;
        terceroCard.classList.remove("d-none");
    }

    // -----------------------
    // METODO DE PAGO
    // -----------------------
    const paymentCards = document.querySelectorAll('.payment-card');

    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(item => {
                item.classList.remove('selected');
            });
            card.classList.add('selected');
            const selectedPayment = card.dataset.payment;
            console.log('Metodo seleccionado:', selectedPayment);
        });
    });

    function getSelectedPayment() {
        return document.querySelector('.payment-card.selected')?.dataset.payment;
    }

    function isValidTercero() {
        const tipoDoc = terceroTipoIdSelect ? terceroTipoIdSelect.value() : "";
        const esNIT = tipoDoc === "NT";
        const camposBase = [
            document.getElementById("terceroNumeroId").value.trim(),
            document.getElementById("terceroCorreo").value.trim(),
            document.getElementById("terceroCelular").value.trim(),
            tipoDoc,
            terceroCodigoPaisSelect ? terceroCodigoPaisSelect.value() : "",
        ];
        const camposEspecificos = esNIT
            ? [
                document.getElementById("terceroDig").value.trim(),
                document.getElementById("terceroRazonSocial").value.trim(),
            ]
            : [
                document.getElementById("terceroNombre1").value.trim(),
                document.getElementById("terceroApellido1").value.trim(),
            ];
        return [...camposBase, ...camposEspecificos].every((v) => !!v);
    }

    // -----------------------
    // FOOTER Y NAVEGACION
    // -----------------------
    document.getElementById("btnBack").addEventListener("click", () => {
        goLocation('#/page/pasajeros/ExpresoBrasilia_Lappiz');
    });

    document.getElementById("btnContinuePayment").addEventListener("click", async () => {
        if (window.__procesandoPago) return;
        window.__procesandoPago = true;
        const botonPago = document.getElementById("btnContinuePayment");
        if (botonPago) botonPago.disabled = true;
        try {
            const quiereTercero = facturaTercero.checked;

            if (quiereTercero && !isValidTercero()) {
                Swal.fire({
                    title: "Atencion",
                    text: "Completa todos los datos de facturacion a tercero antes de continuar.",
                    icon: "warning",
                    confirmButtonText: "Entendido",
                });
                return;
            }

            if (!tieneTitular && !quiereTercero) {
                Swal.fire({
                    title: "Atencion",
                    text: "No hay un pasajero mayor de edad. Completa la facturacion a tercero para vincular la factura.",
                    icon: "warning",
                    confirmButtonText: "Entendido",
                });
                return;
            }

            let numeroIdentificacionTitular = titularNumero;
            let nombreTitular = titularNombre;
            if (!tieneTitular) {
                const esNIT = terceroTipoIdSelect ? terceroTipoIdSelect.value() === "NT" : false;
                numeroIdentificacionTitular = document.getElementById("terceroNumeroId").value.trim();
                nombreTitular = esNIT
                    ? document.getElementById("terceroRazonSocial").value.trim()
                    : [
                        document.getElementById("terceroNombre1").value.trim(),
                        document.getElementById("terceroApellido1").value.trim(),
                    ].filter(Boolean).join(" ").trim();
            }
            compra.titularPago = {
                numeroIdentificacion: numeroIdentificacionTitular,
                nombre: nombreTitular,
            };

            if (quiereTercero) {
                compra.facturaTercero = {
                    tipoIdentificacion: terceroTipoIdSelect.value(),
                    numeroIdentificacion: document.getElementById("terceroNumeroId").value.trim(),
                    digitoVerificacion: document.getElementById("terceroDig").value.trim() || null,
                    razonSocial: document.getElementById("terceroRazonSocial").value.trim() || null,
                    primerNombre: document.getElementById("terceroNombre1").value.trim(),
                    segundoNombre: document.getElementById("terceroNombre2").value.trim(),
                    primerApellido: document.getElementById("terceroApellido1").value.trim(),
                    segundoApellido: document.getElementById("terceroApellido2").value.trim(),
                    email: document.getElementById("terceroCorreo").value.trim(),
                    codigoPais: terceroCodigoPaisSelect.value(),
                    celular: document.getElementById("terceroCelular").value.trim(),
                };
            } else {
                compra.facturaTercero = null;
            }

            compra.data?.tiquetes?.map((currentTiquet) => {
                currentTiquet.titularPago = {
                    numeroIdentificacion: compra.titularPago.numeroIdentificacion,
                    nombre: compra.titularPago.nombre,
                };
                return currentTiquet;
            });

            await guardarCompraActualizada();

            const selectedPayment = getSelectedPayment();
            if (!selectedPayment) {
                Swal.fire({
                    title: "Atencion",
                    text: "Selecciona una forma de pago para continuar.",
                    icon: "warning",
                    confirmButtonText: "Entendido",
                });
                return;
            }

            await ebPrepararPago(selectedPayment);

            if (selectedPayment === "kushki") {
                abrirModalKushki();
            } else if (selectedPayment === "nequi") {
                await iniciarPagoNequi();
            } else if (selectedPayment === "transferencia") {
                abrirModalPSE();
            } else if (selectedPayment === "addi") {
                await iniciarPagoAddi();
            } else {
                Swal.fire({
                    title: "Aviso",
                    text: "El metodo de pago \"" + selectedPayment + "\" no esta disponible por ahora.",
                    icon: "info",
                    confirmButtonText: "Entendido",
                });
            }
        } finally {
            window.__procesandoPago = false;
            if (botonPago) botonPago.disabled = false;
        }
    });

    // -----------------------
    // UTILIDADES DE PAGO
    // -----------------------
    function callLappiz(conf, body) {
        const token = ebTokenSync();
        return execLF({
            nameFunction: conf.nameFunction,
            lappizFunctionId: conf.lappizFunctionId,
            body: Object.assign({}, body || {}, token ? { token } : {}),
            method: "POST"
        });
    }

    async function guardarCompraActualizada() {
        try {
            return await pouch.guardarCompra({ ...compra });
        } catch (error) {
            if (error && error.status === 409) {
                const actual = await pouch.obtenerCompraActiva();
                const base = actual || compra;
                return pouch.guardarCompra({
                    ...base,
                    ...compra,
                    titularPago: compra.titularPago,
                    facturaTercero: compra.facturaTercero,
                    data: compra.data,
                });
            }
            throw error;
        }
    }

    // -----------------------
    // SERVICIOS DE COMPRA ANTES DE PAGAR
    // -----------------------
    function construirComprador() {
        const t = (compra.data && compra.data.tiquetes && compra.data.tiquetes[0]) || {};
        const p = t.pasajero || {};
        let base;
        if (compra.facturaTercero) {
            const tc = compra.facturaTercero;
            const esNIT = tc.tipoIdentificacion === "NT";
            base = {
                numeroIdentificacion: tc.numeroIdentificacion,
                tipoIdentificacion: tc.tipoIdentificacion,
                primerNombre: esNIT ? (tc.razonSocial || "") : (tc.primerNombre || ""),
                segundoNombre: esNIT ? "" : (tc.segundoNombre || ""),
                primerApellido: esNIT ? "" : (tc.primerApellido || ""),
                segundoApellido: esNIT ? "" : (tc.segundoApellido || ""),
                nombreCompleto: esNIT
                    ? (tc.razonSocial || "")
                    : [tc.primerNombre, tc.segundoNombre, tc.primerApellido, tc.segundoApellido].filter(Boolean).join(" "),
                email: tc.email || "",
                celular: tc.celular || "",
                sexo: p.sexo || null,
                fechaNacimiento: p.fechaNacimiento || null,
                pais: p.pais || "169",
                descripcionPais: p.descripcionPais || null,
            };
        } else {
            base = Object.assign({}, p);
            base.nombreCompleto = base.nombreCompleto ||
                [base.primerNombre, base.segundoNombre, base.primerApellido, base.segundoApellido].filter(Boolean).join(" ");
        }
        if (!base.numeroIdentificacion) return null;
        const empresa = (compra.usuarioVenta && compra.usuarioVenta.empresa) || "EC";
        base.id = { empresa: empresa, numeroIdentificacion: base.numeroIdentificacion };
        base.lector = base.lector || "N";
        return base;
    }

    async function ebPrepararPago(codigoMedio) {
        const transaccion = ebTransaccionId();
        if (!transaccion) {
            console.warn("Sin llaveTransaccion: se omiten registrarComprador/actualizarCompra");
            return;
        }
        const token = await ebGetToken();

        const comprador = construirComprador();
        if (comprador) {
            try {
                const res = await fetch(EB_LF + "registrarComprador", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Object.assign({}, comprador, { transaccion: transaccion, token: token }))
                });
                const data = await res.json();
                if (data && data.error) console.error("registrarComprador:", data.message);
            } catch (e) {
                console.error("registrarComprador error:", e);
            }
        }

        const mapaMedios = { kushki: "TARJETA", nequi: "NEQUI", transferencia: "TRANSFERENCIA", addi: "ADDI" };
        const idMedio = medioPagoId(mapaMedios[codigoMedio] || "");
        try {
            const res = await fetch(EB_LF + "actualizarCompra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transaccion: transaccion,
                    token: token,
                    estado: "PP",
                    estadoProceso: "PG",
                    valorCompra: compra.totalPagar || 0,
                    medioPago: idMedio || undefined,
                    tiquetesBody: compra.data ? JSON.stringify(compra.data) : undefined
                })
            });
            const data = await res.json();
            if (data && data.error) console.error("actualizarCompra (PG):", data.message);
        } catch (e) {
            console.error("actualizarCompra (PG) error:", e);
        }
    }

    function vincularCierreModal(modalId, instancia) {
        const modalEl = document.getElementById(modalId);
        if (!modalEl) return;
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach((btn) => {
            btn.addEventListener("click", () => {
                if (instancia && typeof instancia.hide === "function") {
                    try { instancia.hide(); } catch (err) { }
                    return;
                }
                modalEl.classList.remove("show", "d-block");
                document.body.classList.remove("modal-open");
                const backdrop = document.querySelector(".modal-backdrop");
                if (backdrop) backdrop.remove();
            });
        });
    }

    function emailComprador() {
        const tercero = compra.facturaTercero;
        if (tercero && tercero.email) return tercero.email;
        const t = compra.data?.tiquetes?.find((tq) => tq.email || tq.pasajero?.email);
        return (t && (t.email || t.pasajero?.email)) || "test@example.com";
    }

    function infoCliente() {
        const t = compra.data?.tiquetes?.[0] || {};
        const p = t.pasajero || t;
        const titular = compra.titularPago || {};
        const nombreCompleto = titular.nombre || [p.primerNombre, p.primerApellido].filter(Boolean).join(" ") || "Cliente Expreso Brasil";
        const partes = nombreCompleto.split(" ");
        const primerNombre = partes[0] || "Cliente";
        const segundoNombre = partes[1] || "";
        const primerApellido = partes[2] || "Expreso";
        const segundoApellido = partes[3] || "Brasilia";
        return {
            idNumber: titular.numeroIdentificacion || p.numeroIdentificacion || "1111111111",
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            email: emailComprador(),
            cellphone: (compra.facturaTercero && compra.facturaTercero.celular) || p.telefono || p.celular || "3000000000",
        };
    }

    // -----------------------
    // KUSHKI (tarjeta)
    // -----------------------
    const kushkiModal = window.bootstrap ? new bootstrap.Modal(document.getElementById("kushkiModal")) : null;

    function abrirModalKushki() {
        if (kushkiModal) kushkiModal.show();
        else document.getElementById("kushkiModal").classList.add("show", "d-block");
        if (kushkiInicializado) return;
        setTimeout(() => {
            try {
                if (!window.KushkiCheckout) throw new Error("Libreria Kushki no disponible");
                window.__kushki = new KushkiCheckout({
                    kformId: "x1de9DNBb",
                    form: "my-form",
                    publicMerchantId: PUBLIC_KEY,
                    inTestEnvironment: true,
                    amount: cardAmount,
                });
                kushkiInicializado = true;
            } catch (error) {
                console.error("Error inicializando Kushki:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cargar el formulario de pago Kushki.",
                    icon: "error",
                    confirmButtonText: "Entendido",
                });
            }
        }, 300);
    }

    // -----------------------
    // NEQUI (contrato unificado)
    // -----------------------
    const nequiModal = window.bootstrap ? new bootstrap.Modal(document.getElementById("nequiModal")) : null;
    let nequiPollTimer = null;

    function mostrarNequiModal() {
        if (nequiModal) nequiModal.show();
        else document.getElementById("nequiModal").classList.add("show", "d-block");
    }

    function ocultarNequiModal() {
        if (nequiModal) nequiModal.hide();
        else document.getElementById("nequiModal").classList.remove("show", "d-block");
    }

    async function iniciarPagoNequi() {
        const transaccion = compra.llaveTransaccion || ("NEQ-" + Date.now());
        const telefono = (compra.facturaTercero && compra.facturaTercero.celular)
            || compra.data?.tiquetes?.[0]?.pasajero?.celular
            || compra.data?.tiquetes?.[0]?.celular
            || "3000000000";
        const redirectUrl = window.location.origin + window.location.pathname + "#/page/resumen/ExpresoBrasilia_Lappiz";

        Swal.fire({ title: "Enviando solicitud Nequi...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pagosIniciar, {
                codigo: "NEQUI",
                transaccion,
                telefono,
                redirectUrl,
            });
            Swal.close();
            if (response?.error) throw new Error(response.message || "Error iniciando pago Nequi");
            const accion = response?.data?.accion;
            const data = response?.data || {};
            if (accion === "PUSH") {
                const nequiReferencia = data.referencia || "";
                mostrarEsperaNequi(nequiReferencia, transaccion);
            } else {
                throw new Error(data.mensaje || "Respuesta inesperada de Nequi");
            }
        } catch (error) {
            Swal.close();
            console.error("Error iniciando pago Nequi:", error);
            Swal.fire({
                title: "Error",
                text: error.message || "No se pudo iniciar el pago con Nequi.",
                icon: "error",
                confirmButtonText: "Entendido",
            });
        }
    }

    function mostrarEsperaNequi(nequiReferencia, transaccion) {
        const qrLoading = document.getElementById("nequiQrLoading");
        const qr = document.getElementById("nequiQr");
        const estado = document.getElementById("nequiEstado");
        if (qrLoading) qrLoading.style.display = "none";
        if (qr) qr.style.display = "none";
        if (estado) estado.textContent = "Revisa tu app Nequi y aprueba el cobro...";
        mostrarNequiModal();
        nequiPollTimer = setInterval(() => consultarEstadoNequi(nequiReferencia, transaccion), 5000);
    }

    async function consultarEstadoNequi(nequiReferencia, transaccion) {
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pagosEstado, {
                transaccion,
                referencia: nequiReferencia,
            });
            const d = response?.data || {};
            const estado = d.estado || "";
            const estadoEl = document.getElementById("nequiEstado");
            if (estado === "SUCCESS") {
                clearInterval(nequiPollTimer);
                nequiPollTimer = null;
                if (estadoEl) estadoEl.textContent = "Pago recibido correctamente.";
                ocultarNequiModal();
                Swal.fire({
                    title: "Pago recibido",
                    text: "Tu pago con Nequi fue aprobado.",
                    icon: "success",
                    confirmButtonText: "Continuar",
                }).then(() => goLocation('#/page/resumen/ExpresoBrasilia_Lappiz'));
                return;
            }
            if (estado === "FAILED") {
                clearInterval(nequiPollTimer);
                nequiPollTimer = null;
                if (estadoEl) estadoEl.textContent = d.mensajeRespuesta || "Pago rechazado.";
                ocultarNequiModal();
                Swal.fire({
                    title: "Pago rechazado",
                    text: d.mensajeRespuesta || "El pago fue rechazado. Puedes intentar con otro medio.",
                    icon: "error",
                    confirmButtonText: "Entendido",
                });
                return;
            }
            if (estadoEl) estadoEl.textContent = "Aun no se aprueba el pago en la app...";
        } catch (error) {
            console.error("Error consultando estado Nequi:", error);
        }
    }

    // -----------------------
    // TRANSFERENCIA (contrato unificado)
    // -----------------------
    const pseModal = window.bootstrap ? new bootstrap.Modal(document.getElementById("pseModal")) : null;

    async function abrirModalPSE() {
        const info = infoCliente();
        const elDoc = document.getElementById("pseNumeroDocumento");
        const elNombre = document.getElementById("pseNombre");
        const elEmail = document.getElementById("pseEmail");
        const elTelefono = document.getElementById("pseTelefono");
        if (elDoc) elDoc.value = info.idNumber;
        if (elNombre) elNombre.value = [info.primerNombre, info.segundoNombre, info.primerApellido, info.segundoApellido].filter(Boolean).join(" ");
        if (elEmail) elEmail.value = info.email;
        if (elTelefono) elTelefono.value = info.cellphone;

        const select = document.getElementById("pseBanco");
        if (select) select.innerHTML = '<option value="">Cargando bancos...</option>';
        if (pseModal) pseModal.show();
        else document.getElementById("pseModal").classList.add("show", "d-block");
        try {
            // El listado de bancos se obtiene de la funcion antigua obtenerBancosPSE
            // (Kushki PSE no necesita seleccion de banco, pero se mantiene por compatibilidad)
            const response = await callLappiz(LAPPIZ_FUNCTIONS.mediosPago, {});
            const bancos = Array.isArray(response?.data) ? response.data : [];
            if (select) {
                select.innerHTML = '<option value="">Seleccione el banco...</option>' +
                    bancos.map((b) => '<option value="' + (b.codigo || '') + '">' + (b.nombre || '') + '</option>').join("");
            }
        } catch (error) {
            console.error("Error cargando bancos PSE:", error);
            if (select) select.innerHTML = '<option value="">No se pudieron cargar los bancos</option>';
        }
    }

    document.getElementById("pseContinuarBtn").addEventListener("click", async () => {
        const campos = ["pseBanco", "pseNumeroDocumento", "pseTipoDocumento", "pseTipoPersona", "pseNombre", "pseEmail", "pseTelefono"];
        const valido = campos.every((id) => {
            const el = document.getElementById(id);
            return el && el.value.trim() !== "";
        });
        if (!valido) {
            Swal.fire({ title: "Atencion", text: "Completa todos los datos para continuar con la transferencia.", icon: "warning", confirmButtonText: "Entendido" });
            return;
        }
        const transaccion = compra.llaveTransaccion || ("PSE-" + Date.now());
        const redirectUrl = window.location.origin + window.location.pathname + "#/page/resumen/ExpresoBrasilia_Lappiz";
        const telEl = document.getElementById("pseTelefono");
        Swal.fire({ title: "Iniciando la transaccion con tu banco...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pagosIniciar, {
                codigo: "TRANSFERENCIA",
                transaccion,
                telefono: telEl ? telEl.value.trim() : "",
                redirectUrl,
            });
            Swal.close();
            if (response?.error) throw new Error(response.message || "Error iniciando transferencia");
            const accion = response?.data?.accion;
            if (accion === "MODAL_KUSHKI") {
                abrirModalKushki();
            } else if (response?.data?.url) {
                window.location.href = response.data.url;
            } else {
                Swal.fire({ title: "Error", text: response?.message || "No se pudo iniciar la transferencia.", icon: "error", confirmButtonText: "Entendido" });
            }
        } catch (error) {
            Swal.close();
            console.error("Error iniciando transferencia:", error);
            Swal.fire({ title: "Error", text: error.message || "No se pudo iniciar la transferencia.", icon: "error", confirmButtonText: "Entendido" });
        }
    });

    // -----------------------
    // ADDI (contrato unificado)
    // -----------------------
    async function iniciarPagoAddi() {
        const transaccion = compra.llaveTransaccion || ("ADD-" + Date.now());
        const redirectUrl = window.location.origin + window.location.pathname + "#/page/resumen/ExpresoBrasilia_Lappiz";

        // Verificar configuracion Addi (min/max, visibilidad)
        try {
            const configResponse = await callLappiz(LAPPIZ_FUNCTIONS.pagosConfig, {
                codigo: "ADDI",
                requestedAmount: normalizeAmount(compra.totalPagar || 1),
            });
            if (configResponse?.error) {
                if (!/soporta configuraci/.test(configResponse.message || "")) {
                    throw new Error(configResponse.message || "Error consultando configuracion Addi");
                }
            } else {
                const cfg = configResponse?.data || {};
                if (cfg.visible === false || cfg.activeAlly === false) {
                    Swal.fire({ title: "No disponible", text: "Addi no esta disponible para esta compra.", icon: "info", confirmButtonText: "Entendido" });
                    return;
                }
            }
        } catch (error) {
            console.error("Error consultando config Addi:", error);
        }

        Swal.fire({ title: "Verificando con Addi...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pagosIniciar, {
                codigo: "ADDI",
                transaccion,
                redirectUrl,
            });
            Swal.close();
            if (response?.error) throw new Error(response.message || "Error iniciando pago Addi");
            const accion = response?.data?.accion;
            if ((accion === "REDIRECT" && response?.data?.url) || response?.data?.url) {
                window.location.href = response.data.url;
            } else {
                Swal.fire({ title: "Error", text: response?.message || "Addi no devolvio la URL de solicitud.", icon: "error", confirmButtonText: "Entendido" });
            }
        } catch (error) {
            Swal.close();
            console.error("Error iniciando pago Addi:", error);
            Swal.fire({ title: "Error", text: error.message || "No se pudo iniciar la solicitud con Addi.", icon: "error", confirmButtonText: "Entendido" });
        }
    }

    vincularCierreModal("kushkiModal", kushkiModal);
    vincularCierreModal("nequiModal", nequiModal);
    vincularCierreModal("pseModal", pseModal);
})();
