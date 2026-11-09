const PUBLIC_KEY = "fc746c9c632e4163a7565514ca34a2e5";
const COMPANIA_ID = "TU_CLIENT_ID_NEQUI";

const LAPPIZ_FUNCTIONS = {
    nequiCrearCobro: { nameFunction: "generarPagoNequi", lappizFunctionId: "CAMBIAR_FUNCTION_ID_NEQUI_GENERAR" },
    nequiConsultar: { nameFunction: "consultarPagoNequi", lappizFunctionId: "CAMBIAR_FUNCTION_ID_NEQUI_CONSULTAR" },
    pseBancos: { nameFunction: "obtenerBancosPSE", lappizFunctionId: "CAMBIAR_FUNCTION_ID_PSE_BANCOS" },
    pseCrear: { nameFunction: "generarPagoPSE", lappizFunctionId: "CAMBIAR_FUNCTION_ID_PSE_CREAR" },
    addiCrear: { nameFunction: "generarPagoAddi", lappizFunctionId: "CAMBIAR_FUNCTION_ID_ADDI_CREAR" },
};
(async () => {
    // -----------------------
    // Inicialización y estado
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
        //document.getElementById('resumenCompra').classList.add('d-none');
    }
    const cardAmount = {
        subtotalIva: compra.valorImpuestos || 0, // define el valor 0 cuando la Tx no tiene impuestos
        iva: compra.valorImpuestos || 0, // define el valor 0 cuando la Tx no tiene impuestos
        subtotalIva0: +normalizeAmount(compra.totalPagar || 100), // Define el valor total de la Tx en caso de que no tenga impuestos, de lo contrario configura 0
    }
    let kushkiInicializado = false;
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

    // -----------------------
    // DATOS DEL TITULAR DE LA COMPRA
    // -----------------------
    const tiposIdentificacionTitularEndpoint = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacionTitular?empresa=EC&portal=S&titular=S";

    // Referencias del DOM
    const titularContainer = document.getElementById("titularContainer");
    const titularNumeroIdInput = document.getElementById("titularNumeroId");
    const titularNombreInput = document.getElementById("titularNombre");
    const facturaTercero = document.getElementById("facturaTercero");
    const terceroCard = document.getElementById("terceroCard");
    const clearTerceroBtn = document.getElementById("clearTerceroBtn");
    const terceroDigContainer = document.getElementById("terceroDigContainer");
    const terceroRazonSocialContainer = document.getElementById("terceroRazonSocialContainer");
    const terceroPersonaNaturalFields = document.getElementById("terceroPersonaNaturalFields");

    // Regla de negocio: NIT muestra DIG + Razón social en lugar de datos de persona natural
    function toggleTerceroCampos(tipoDoc) {
        const esNIT = tipoDoc === "NT";
        if (terceroDigContainer) terceroDigContainer.classList.toggle("d-none", !esNIT);
        if (terceroRazonSocialContainer) terceroRazonSocialContainer.classList.toggle("d-none", !esNIT);
        if (terceroPersonaNaturalFields) terceroPersonaNaturalFields.classList.toggle("d-none", esNIT);
    }

    // Desplegar/ocultar la tarjeta de facturación a tercero
    facturaTercero.addEventListener("change", (e) => {
        terceroCard.classList.toggle("d-none", !e.target.checked);
    });

    // Países (códigos telefónicos) para la facturación a tercero
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
        console.error('No se pudieron cargar los países:', error);
    }

    // Widgets Kendo del formulario de tercero (no deben romper la página)
    let terceroTipoIdSelect = null;
    let terceroCodigoPaisSelect = null;
    try {
        const tiposIdTerceroSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: tiposIdentificacionTitularEndpoint,
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

    // Autocompletar el nombre del titular a partir del documento
    titularNumeroIdInput.addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) return;
        try {
            let nameFunction = "obtenerPasajero?numDocumento=" + value;
            let lappizFunctionId = "ed4e119c-e5df-451b-9773-999319b575c6";
            let method = "GET";
            let body = {};
            let config = { nameFunction, lappizFunctionId, body, method };
            const response = await execLF(config);
            if (response.status) {
                const d = response.data || {};
                const nombre = [d.primerNombre, d.primerApellido].filter(Boolean).join(" ");
                if (nombre) titularNombreInput.value = nombre;
            }
        } catch (error) { }
    });

    // Consumir el servicio al editar el número de identificación del tercero y autocompletar datos
    document.getElementById("terceroNumeroId").addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) return;
        try {
            let nameFunction = "obtenerPasajero?numDocumento=" + value;
            let lappizFunctionId = "ed4e119c-e5df-451b-9773-999319b575c6";
            let method = "GET";
            let body = {};
            let config = { nameFunction, lappizFunctionId, body, method };
            const response = await execLF(config);
            if (response.status) fillTerceroData(response.data);
        } catch (error) { }
    });

    // Regla de negocio: autocompletar DIG en vivo a partir del número de identificación cuando el tipo es NIT
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

    // Cálculo del dígito verificador (módulo 11) para NIT/RUC
    function calculateDV(nit) {
        const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
        let sum = 0;

        // Limpiar el NIT, eliminando cualquier caracter no numérico y revertirlo
        const cleanedNit = nit.replace(/\D/g, "");
        const reversedNit = cleanedNit.split("").reverse();

        // Sumar los productos del dígito por su peso
        for (let i = 0; i < reversedNit.length; i++) {
            const digit = parseInt(reversedNit[i], 10);
            sum += digit * weights[i];
        }

        // Calcular el residuo del módulo 11
        const remainder = sum % 11;

        // Determinar el dígito de verificación final
        if (remainder === 0 || remainder === 1) {
            return remainder;
        } else {
            return 11 - remainder;
        }
    }

    // Limpiar formulario del tercero
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

    // Rellenar con datos guardados del tercero
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

    // Los datos del titular se toman del pasajero mayor de edad
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
        // Sin mayor de edad: ocultar el titular y pedir de inmediato la factura a tercero
        if (titularContainer) titularContainer.classList.add("d-none");
        facturaTercero.checked = true;
        terceroCard.classList.remove("d-none");
    }

    // -----------------------
    // MÉTODO DE PAGO
    // -----------------------
    const paymentCards = document.querySelectorAll('.payment-card');

    paymentCards.forEach(card => {

        card.addEventListener('click', () => {

            paymentCards.forEach(item => {
                item.classList.remove('selected');
            });

            card.classList.add('selected');

            const selectedPayment = card.dataset.payment;

            console.log('Método seleccionado:', selectedPayment);

            // Aquí puedes ejecutar tu lógica
            // realizarPago(selectedPayment);
        });

    });
    function getSelectedPayment() {
        return document
            .querySelector('.payment-card.selected')
            ?.dataset.payment;
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
    // FOOTER Y NAVEGACIÓN
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
                title: "Atención",
                text: "Completa todos los datos de facturación a tercero antes de continuar.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
            return;
        }

        if (!tieneTitular && !quiereTercero) {
            Swal.fire({
                title: "Atención",
                text: "No hay un pasajero mayor de edad. Completa la facturación a tercero para vincular la factura.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
            return;
        }

        // Guardar titular de la compra (desde el mayor de edad o desde el tercero)
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

        // Guardar facturación a tercero
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
                title: "Atención",
                text: "Selecciona una forma de pago para continuar.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
            return;
        }

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
                text: `El método de pago "${selectedPayment}" no está disponible por ahora.`,
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
        return execLF({ nameFunction: conf.nameFunction, lappizFunctionId: conf.lappizFunctionId, body, method: "POST" });
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
                if (!window.KushkiCheckout) throw new Error("Librería Kushki no disponible");
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
    // NEQUI
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
        if (!window.QRCode) {
            await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js", "cdn_qrcode");
        }
        const referencia = "NEQ-" + Date.now();
        Swal.fire({ title: "Generando cobro...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.nequiCrearCobro, {
                companyId: COMPANIA_ID,
                value: compra.totalPagar || 1,
                reference: referencia,
                messageId: String(Date.now()).slice(-10),
                data: compra,
            });
            Swal.close();
            if (!response?.status) throw new Error("Nequi no generó el cobro.");
            await mostrarQRNequi(response.data, referencia);
        } catch (error) {
            Swal.close();
            console.error("Error iniciando pago Nequi:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo iniciar el pago con Nequi.",
                icon: "error",
                confirmButtonText: "Entendido",
            });
        }
    }

    async function mostrarQRNequi(data, referencia) {
        document.getElementById("nequiQrLoading").style.display = "none";
        document.getElementById("nequiQr").style.display = "block";
        document.getElementById("nequiEstado").textContent = "Esperando aprobación en la app Nequi...";
        await new Promise((resolve) => {
            QRCode.toCanvas(document.getElementById("nequiQr"), data.qrCompleto, { width: 220, margin: 1 }, resolve);
        });
        mostrarNequiModal();
        nequiPollTimer = setInterval(() => consultarEstadoNequi(data.qr, referencia), 5000);
    }

    async function consultarEstadoNequi(qr, referencia) {
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.nequiConsultar, {
                companyId: COMPANIA_ID,
                qr,
                transactionalCode: "",
                messageId: referencia,
            });
            const d = response?.data || {};
            if (d.pagado) {
                clearInterval(nequiPollTimer);
                nequiPollTimer = null;
                document.getElementById("nequiEstado").textContent = "Pago recibido correctamente.";
                ocultarNequiModal();
                Swal.fire({
                    title: "Pago recibido",
                    text: "Tu pago con Nequi fue aprobado.",
                    icon: "success",
                    confirmButtonText: "Continuar",
                }).then(() => goLocation('#/page/resumen/ExpresoBrasilia_Lappiz'));
                return;
            }
            document.getElementById("nequiEstado").textContent =
                d.mensaje || "Aún no se aprueba el pago en la app...";
        } catch (error) {
            console.error("Error consultando estado Nequi:", error);
        }
    }

    // -----------------------
    // PSE (transferencia bancaria)
    // -----------------------
    const pseModal = window.bootstrap ? new bootstrap.Modal(document.getElementById("pseModal")) : null;

    async function abrirModalPSE() {
        const info = infoCliente();
        document.getElementById("pseNumeroDocumento").value = info.idNumber;
        document.getElementById("pseNombre").value = [info.primerNombre, info.segundoNombre, info.primerApellido, info.segundoApellido].filter(Boolean).join(" ");
        document.getElementById("pseEmail").value = info.email;
        document.getElementById("pseTelefono").value = info.cellphone;

        const select = document.getElementById("pseBanco");
        select.innerHTML = '<option value="">Cargando bancos...</option>';
        if (pseModal) pseModal.show();
        else document.getElementById("pseModal").classList.add("show", "d-block");
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pseBancos, {});
            const bancos = response?.data || [];
            select.innerHTML = '<option value="">Seleccione el banco...</option>' +
                bancos.map((b) => `<option value="${b.codigo}">${b.nombre}</option>`).join("");
        } catch (error) {
            console.error("Error cargando bancos PSE:", error);
            select.innerHTML = '<option value="">No se pudieron cargar los bancos</option>';
        }
    }

    document.getElementById("pseContinuarBtn").addEventListener("click", async () => {
        const campos = ["pseBanco", "pseNumeroDocumento", "pseTipoDocumento", "pseTipoPersona", "pseNombre", "pseEmail", "pseTelefono"];
        const valido = campos.every((id) => document.getElementById(id).value.trim() !== "");
        if (!valido) {
            Swal.fire({ title: "Atención", text: "Completa todos los datos para continuar con el PSE.", icon: "warning", confirmButtonText: "Entendido" });
            return;
        }
        Swal.fire({ title: "Iniciando la transacción con tu banco...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.pseCrear, {
                codigoBanco: document.getElementById("pseBanco").value,
                numeroDocumento: document.getElementById("pseNumeroDocumento").value.trim(),
                tipoDocumento: document.getElementById("pseTipoDocumento").value,
                nombreCliente: document.getElementById("pseNombre").value.trim(),
                emailCliente: document.getElementById("pseEmail").value.trim(),
                telefonoCliente: document.getElementById("pseTelefono").value.trim(),
                valorTransaccion: normalizeAmount(compra.totalPagar || 1),
                referencia: "PSE-" + Date.now(),
                tipoPersona: document.getElementById("pseTipoPersona").value,
                descripcion: "Compra de tiquetes Expreso Brasilia",
            });
            Swal.close();
            if (response?.data?.url) window.location.href = response.data.url;
            else Swal.fire({ title: "Error", text: "PSE no devolvió la URL de pago.", icon: "error", confirmButtonText: "Entendido" });
        } catch (error) {
            Swal.close();
            console.error("Error iniciando transacción PSE:", error);
            Swal.fire({ title: "Error", text: "No se pudo iniciar la transacción con el PSE.", icon: "error", confirmButtonText: "Entendido" });
        }
    });

    // -----------------------
    // ADDI (pagar en cuotas)
    // -----------------------
    async function iniciarPagoAddi() {
        const info = infoCliente();
        const total = normalizeAmount(compra.totalPagar || 1);
        const cantidad = compra.data?.tiquetes?.length || 1;
        const items = (compra.data?.tiquetes || []).map((tq) => {
            const p = tq.pasajero || tq;
            const pax = [p.primerNombre, p.primerApellido].filter(Boolean).join(" ") || "Tiquete";
            return {
                name: pax,
                quantity: 1,
                unitPrice: Math.round(compra.totalPagar / cantidad),
            };
        });
        Swal.fire({ title: "Verificando con Addi...", didOpen: () => Swal.showLoading() });
        try {
            const response = await callLappiz(LAPPIZ_FUNCTIONS.addiCrear, {
                orderId: "ADD-" + Date.now(),
                totalAmount: total,
                shippingAmount: 0,
                totalTaxesAmount: compra.valorImpuestos || 0,
                currency: "COP",
                items,
                client: {
                    idType: "CC",
                    idNumber: info.idNumber,
                    firstName: info.primerNombre,
                    lastName: info.primerApellido,
                    email: info.email,
                    cellphone: info.cellphone,
                    cellphoneCountryCode: "+57",
                },
            });
            Swal.close();
            if (response?.data?.applicationUrl) window.location.href = response.data.applicationUrl;
            else Swal.fire({ title: "Error", text: "Addi no devolvió la URL de solicitud.", icon: "error", confirmButtonText: "Entendido" });
        } catch (error) {
            Swal.close();
            console.error("Error iniciando pago Addi:", error);
            Swal.fire({ title: "Error", text: "No se pudo iniciar la solicitud con Addi.", icon: "error", confirmButtonText: "Entendido" });
        }
    }

    vincularCierreModal("kushkiModal", kushkiModal);
    vincularCierreModal("nequiModal", nequiModal);
    vincularCierreModal("pseModal", pseModal);
})();