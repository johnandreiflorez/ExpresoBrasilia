console.log("PASO 1: Inicio de compra. Seleccion de origen y destino.");
(async () => {
    // ---------------------------
    // Config y servicios
    // ---------------------------
    const API = {
        origenes: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getOrigenes?empresa=EC",
        destinos: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getDestinos?empresa=EC&origen=",
        vigencia: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/vigenciaVenta"
    };

    // ---------------------------
    // Autenticacion: token al inicio para todos los servicios
    // ---------------------------
    const EB_LF = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/";
    let tokenPromise = null;
    async function ebGetToken() {
        try {
            const cached = sessionStorage.getItem("EB_TOKEN");
            if (cached) return cached;
        } catch (e) { }

        if (!tokenPromise) {
            tokenPromise = (async () => {
                const res = await fetch(EB_LF + "getTokenInterno", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });
                if (!res.ok) throw new Error(`Error HTTP ${res.status} al obtener el token.`);
                const data = await res.json();
                const token = data && data.status ? data.token : "";
                if (token) {
                    try { sessionStorage.setItem("EB_TOKEN", token); } catch (e) { }
                }
                return token;
            })();
        }

        try {
            return await tokenPromise;
        } finally {
            tokenPromise = null;
        }
    }
    async function ebWithToken(url) {
        const token = await ebGetToken();
        if (!token) return url;
        return url + (url.indexOf("?") >= 0 ? "&" : "?") + "token=" + encodeURIComponent(token);
    }
    let transaccionData = null;
    async function ebInitTransaccion() {
        try {
            const res = await fetch(await ebWithToken(EB_LF + "obtenerTransaccion"));
            const data = await res.json();
            if (data && !data.error && data.data) {
                transaccionData = data.data;
                try { sessionStorage.setItem("EB_TRANSACCION", JSON.stringify(transaccionData)); } catch (e) { }
            } else {
                console.error("obtenerTransaccion:", data && data.message);
            }
        } catch (e) {
            console.error("obtenerTransaccion error:", e);
        }
    }
    const serviceInitialization = ebGetToken()
        .then(() => ebInitTransaccion())
        .catch((error) => {
            console.error("Error inicializando servicios de búsqueda:", error);
        });

    async function ebCrearCompra(p) {
        if (!transaccionData || !transaccionData.llaveTransaccion) return;
        try {
            const empresa = (transaccionData.usuario && transaccionData.usuario.empresa) || "EC";
            const fecha = new Date().toISOString().replace("T", " ").replace("Z", "").substring(0, 23);
            const token = await ebGetToken();
            const body = {
                transaccion: transaccionData.llaveTransaccion,
                fechaTransaccion: fecha,
                origen: p.origen,
                destino: p.destino,
                fechaIda: p.fechaIda,
                fechaVuelta: p.fechaRegreso || null,
                idaYVuelta: p.fechaRegreso ? "S" : "N",
                estado: "IT",
                estadoProceso: "IT",
                empresa,
                token
            };
            const res = await fetch(EB_LF + "crearCompra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (data && data.error) console.error("crearCompra:", data.message);
        } catch (e) {
            console.error("crearCompra error:", e);
        }
    }

    const pouchInitialization = G_loadScriptAsync(
        "https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js",
        "cdn_pouch"
    );
    const headerInitialization = pouchInitialization
        .then(() => G_addHeaderPages())
        .catch((error) => {
            console.error("Error cargando el encabezado:", error);
        });
    try {
        await pouchInitialization;
        if (typeof PouchDB === "undefined") {
            throw new Error("PouchDB no se cargó correctamente.");
        }
    } catch (error) {
        console.error("Error cargando PouchDB:", error);
        Swal.fire({
            icon: "error",
            title: "No se pudo iniciar la compra",
            text: "No fue posible preparar el almacenamiento local. Recarga la página para intentarlo de nuevo."
        });
        return;
    }
    applyKendoComboStyles();
    //G_addIdApp_page();
    const pouchService = new G_PouchService();
    const compraActiva = await pouchService.obtenerCompraActiva();
    if (!compraActiva) await pouchService.limpiarExpiradas();
    const searchState = {
        tripType: !compraActiva
            ? "roundtrip"
            : (compraActiva.isReturnSelected || compraActiva.fechaRegreso) ? "roundtrip" : "oneway",
        origin: compraActiva?.origen || null,
        destination: compraActiva?.destino || null,
        departureDate: compraActiva?.fechaIda || null,
        returnDate: compraActiva?.fechaRegreso || null
    };

    let selectedDates = [];
    let calendar;
    let destinationRequestId = 0;
    let vigenciaRequestId = 0;
    let flatpickrLoadPromise = null;

    function initSearchStep() {
        restoreCompraActiva();
        loadOrigenes();
        attachEvents();
        loadFlatpickr()
            .then(() => initFecha(searchState.tripType === "oneway" ? "single" : "range"))
            .catch((error) => console.error("Error cargando el calendario:", error));
    }

    const formatDateISO = d => {
        const date = d instanceof Date
            ? d
            : /^\d{4}-\d{2}-\d{2}$/.test(String(d))
                ? new Date(`${d}T00:00:00`)
                : new Date(d);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    async function loadOrigenes() {
        const idTarget = "originSelect";
        initKendoCombobox(idTarget, async (e) => {
            searchState.origin = e.sender.value() || null;
            searchState.destination = null;
            const destinationWidget = kendo.jQuery("#destinationSelect").data("kendoComboBox");
            if (destinationWidget) destinationWidget.value("");
            await loadDestinos(e.sender.value());
            if (searchState.destination) await getVigencia();
            validateForm();
        });
        initDestinationCombobox();

        const originWidget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");
        if (originWidget) {
            originWidget.input.attr("placeholder", "Cargando orígenes...");
            originWidget.enable(false);
        }

        try {
            const response = await fetch(await ebWithToken(API.origenes));
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            const result = await response.json();
            if (result?.error || !Array.isArray(result?.data)) {
                throw new Error(result?.message || "La respuesta de orígenes no tiene un formato válido.");
            }
            updateKendoComboboxData(idTarget, result.data);
            if (originWidget) originWidget.enable(true);

            if (searchState.origin) {
                originWidget?.value(searchState.origin);
                await loadDestinos(searchState.origin);
            }
        } catch (error) {
            console.error("Error cargando los orígenes:", error);
            if (originWidget) {
                originWidget.input.attr("placeholder", "No fue posible cargar los orígenes");
                originWidget.enable(false);
            }
        }
    }

    async function getVigencia() {
        const origen = searchState.origin;
        const destino = searchState.destination;
        const requestId = ++vigenciaRequestId;
        if (!origen || !destino) return;
        try {
            const url = `${API.vigencia}?empresa=EC&origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}`;
            const response = await fetch(await ebWithToken(url));
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            const result = await response.json();
            const days = Number(result?.data);
            if (result?.error || !Number.isFinite(days) || days < 0) {
                throw new Error(result?.message || "La respuesta de vigencia no contiene un plazo válido.");
            }
            if (
                requestId !== vigenciaRequestId ||
                origen !== searchState.origin ||
                destino !== searchState.destination
            ) return;
            updateMaxDateByDays(days);
        } catch (error) {
            console.error("Error consultando la vigencia de venta:", error);
        }
    }

    function updateMaxDateByDays(days) {
        if (!calendar) return;
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + days);
        // Formato YYYY-MM-DD
        const formattedMaxDate = formatDateISO(maxDate);
        calendar.set("maxDate", formattedMaxDate);
    }

    function attachEvents() {
        document.querySelectorAll("input[name='tripType']").forEach(radio => {
            radio.addEventListener("change", e => {
                searchState.tripType = e.target.value;

                if (searchState.tripType === "oneway") {
                    document.getElementById("dateLabel").innerText = "Fecha de ida";
                    searchState.returnDate = null;
                    document.getElementById("tripTypeModal").innerText = "Ida";
                    //eliminar la ultima posicion del array selectedDates si tiene mas de 1 posicion
                    if (selectedDates.length > 1) {
                        selectedDates.pop();
                        getValuesDates();
                    }
                    initFecha("single");
                    Swal.fire({
                        toast: true,
                        position: "top",
                        icon: "info",
                        title: "Modo solo ida activado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    document.getElementById("dateLabel").innerText = "Fecha ida y vuelta";
                    document.getElementById("tripTypeModal").innerText = "Ida y vuelta";
                    initFecha("range");
                }

                validateForm();
            });
        });

        document.getElementById("swapBtn")
            .addEventListener("click", async function () {
                const temp = searchState.origin;
                searchState.origin = searchState.destination;
                searchState.destination = temp;

                const originWidget = kendo.jQuery("#originSelect").data("kendoComboBox");
                const destinationWidget = kendo.jQuery("#destinationSelect").data("kendoComboBox");
                if (!originWidget || !destinationWidget || !searchState.origin) return;
                originWidget.value(searchState.origin);
                await loadDestinos(searchState.origin);
                destinationWidget.value(searchState.destination || "");
                await getVigencia();
                validateForm();
            });

        document.getElementById("searchBtn")
            .addEventListener("click", handleSearch);

        document.getElementById("fechaViaje")
            .addEventListener("click", async () => {
                if (!calendar) {
                    try {
                        await loadFlatpickr();
                        initFecha(searchState.tripType === "oneway" ? "single" : "range");
                    } catch (error) {
                        console.error("Error preparando el calendario:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Calendario no disponible",
                            text: "No fue posible cargar el calendario. Intenta nuevamente."
                        });
                        return;
                    }
                }
                openDateModal();
            });

        document.getElementById("closeDateModal")
            .addEventListener("click", closeDateModal);

        document.getElementById("getValuesDates")
            .addEventListener("click", getValuesDates);
    }

    async function loadDestinos(origen) {
        const idTarget = "destinationSelect";
        initDestinationCombobox(async (e) => {
            searchState.destination = e.sender.value();
            await getVigencia();
            validateForm();
        });
        const widget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");
        if (!widget) return;
        const requestId = ++destinationRequestId;
        if (!origen) {
            widget.setDataSource(new kendo.data.DataSource({ data: [] }));
            widget.value("");
            widget.input.attr("placeholder", "Selecciona un origen");
            widget.enable(false);
            return;
        }

        const selectedDestination = searchState.destination;
        widget.setDataSource(new kendo.data.DataSource({ data: [] }));
        widget.value("");
        widget.input.attr("placeholder", "Cargando destinos...");
        widget.enable(false);

        try {
            const url = API.destinos + encodeURIComponent(origen);
            const response = await fetch(await ebWithToken(url));
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            const result = await response.json();
            if (requestId !== destinationRequestId) return;
            if (result?.error || !Array.isArray(result?.data)) {
                throw new Error(result?.message || "La respuesta de destinos no tiene un formato válido.");
            }
            updateKendoComboboxData(idTarget, result.data);
            widget.enable(true);
            const canRestoreDestination = result.data.some(
                item => String(item.codigo) === String(selectedDestination)
            );
            searchState.destination = canRestoreDestination ? selectedDestination : null;
            widget.value(searchState.destination || "");
            if (searchState.destination) await getVigencia();
            validateForm();
        } catch (error) {
            if (requestId !== destinationRequestId) return;
            console.error("Error cargando los destinos:", error);
            widget.input.attr("placeholder", "No fue posible cargar los destinos");
            widget.enable(false);
        }
    }

    function initDestinationCombobox(onChangeCallback) {
        const idTarget = "destinationSelect";
        if (kendo.jQuery(`#${idTarget}`).data("kendoComboBox")) return;
        initKendoCombobox(idTarget, onChangeCallback || (async (e) => {
            searchState.destination = e.sender.value() || null;
            await getVigencia();
            validateForm();
        }));
        const widget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");
        if (widget) {
            widget.input.attr("placeholder", "Selecciona un origen");
            widget.enable(false);
        }
    }

    function restoreCompraActiva() {
        if (!compraActiva) return;

        selectedDates = [searchState.departureDate].filter(Boolean);
        if (searchState.returnDate) {
            selectedDates.push(searchState.returnDate);
        }

        const tripTypeRadio = document.querySelector(`input[name='tripType'][value='${searchState.tripType}']`);
        if (tripTypeRadio) tripTypeRadio.checked = true;

        const dateLabel = document.getElementById("dateLabel");
        const tripTypeModal = document.getElementById("tripTypeModal");
        if (dateLabel) dateLabel.innerText = searchState.tripType === "oneway" ? "Fecha de ida" : "Fecha ida y vuelta";
        if (tripTypeModal) tripTypeModal.innerText = searchState.tripType === "oneway" ? "Ida" : "Ida y vuelta";

        const fechaInput = document.getElementById("fechaViaje");
        if (fechaInput) {
            fechaInput.value = selectedDates.join(" - ");
        }

        validateForm();
    }


    function validateForm() {
        const isValid =
            searchState.origin &&
            searchState.destination &&
            searchState.departureDate &&
            ((searchState.tripType !== "oneway" && searchState.returnDate)
                || (searchState.tripType === "oneway" && searchState.departureDate));

        document.getElementById("searchBtn").disabled = !isValid;
    }

    async function handleSearch() {
        try {
            Swal.fire({
                title: "Buscando rutas...",
                text: "Estamos consultando disponibilidad",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await serviceInitialization;

            const payload = {
                origen: searchState.origin,
                destino: searchState.destination,
                fechaIda: formatDateISO(searchState.departureDate),
                fechaRegreso: searchState.returnDate
                    ? formatDateISO(searchState.returnDate)
                    : null,
                isReturnSelected: false,
                //isReturnSelected: searchState.tripType === "roundtrip",
                selectedSeatsRegreso: [],
                selectedSeatsIda: [],
                currentSegmentIndex: 0,
                totalSegments: 1,
                //totalSegments: searchState.tripType === "roundtrip" ? 2 : 1,
                cantidadPasajeros: 1,
                tipo: "compraTiquete",
                creadaEn: Date.now(),
                expiracion: 30 * 60 * 1000
            };

            const paramsOutward = {
                agenciaVenta: "X0",
                fechaViaje: payload.fechaIda,
                origen: payload.origen,
                destino: payload.destino
            };

            const paramsReturn = {
                agenciaVenta: "X0",
                fechaViaje: payload.fechaRegreso,
                origen: payload.destino,
                destino: payload.origen
            };

            const successLoadLines = await getLines(paramsOutward);

            if (!successLoadLines.length) {
                Swal.fire({
                    icon: "info",
                    title: "Ups 😕",
                    text: "No encontramos rutas disponibles para la fecha seleccionada.",
                    confirmButtonColor: "#1f4368",
                    confirmButtonText: "Entendido"
                });
                return;
            }

            let successLoadLinesReturn = [];

            if (payload.fechaRegreso) {
                successLoadLinesReturn = await getLines(paramsReturn);

                if (!successLoadLinesReturn.length) {
                    Swal.fire({
                        icon: "warning",
                        title: "Sin disponibilidad",
                        text: "No hay rutas disponibles para el regreso en esa fecha.",
                        confirmButtonColor: "#1f4368"
                    });

                    return;
                }
            }

            await pouchService.guardarCompra({
                ...payload,
                successLoadLines,
                successLoadLinesReturn,
                llaveTransaccion: transaccionData ? transaccionData.llaveTransaccion : null,
                usuarioVenta: transaccionData && transaccionData.usuario ? transaccionData.usuario : null
            });
            await ebCrearCompra(payload);
            await headerInitialization;
            Swal.close();
            G_deleteHeaderPages();
            goLocation('#/page/lineas/ExpresoBrasilia_Lappiz');
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Algo salió mal",
                text: "No pudimos completar la búsqueda. Intenta nuevamente.",
                confirmButtonColor: "#1f4368"
            });
            console.error(error);
        }
    }

    async function getLines(params) {
        const nameFunction =
            `getLineas?agenciaVenta=${params.agenciaVenta}&fechaViaje=${params.fechaViaje}` +
            `&origen=${params.origen}&destino=${params.destino}&contingencia=N`;

        const lappizFunctionId = "12ff70cf-d04a-41bb-b6ad-e564217339d7";
        const ebToken = await ebGetToken();
        const config = {
            nameFunction: nameFunction + (ebToken ? "&token=" + encodeURIComponent(ebToken) : ""),
            lappizFunctionId,
            body: {},
            method: "GET"
        };
        const response = await execLF(config);
        const data = preFilterResponseLineas(response.data);
        return filtrarYOrdenarViajes(data);
    }

    function preFilterResponseLineas(dataLineas) {
        return dataLineas.filter(currentLinea =>
            //|| currentTrayecto.data.puestosDisponibles == 0 
            //Poner esta condicion cuando arreglen el backend
            currentLinea.lineas.some(currentTrayecto => !(currentTrayecto.error))
        );
    }

    function filtrarYOrdenarViajes(viajes) {
        const ahora = new Date();
        return viajes
            .map(v => {
                const linea = v.lineas[0]?.data;
                if (!linea) return null;
                const fechaHora = parseDateTime(linea.fechaSalida, linea.horaSalida);
                return { ...v, _fechaHoraSalida: fechaHora };
            })
            .filter(v => v && v._fechaHoraSalida >= ahora)
            .sort((a, b) => a._fechaHoraSalida - b._fechaHoraSalida)
            .map(v => {
                delete v._fechaHoraSalida;
                return v;
            });
    }

    const parseDateTime = (fecha, hora) => {
        const h = hora.replace(/(\d{2})(\d{2})/, "$1:$2");
        return new Date(`${fecha}T${h}:00`);
    };

    function applyKendoComboStyles() {
        // Neutralizar reglas en hojas de estilo locales que fuerzan width/left: auto !important en .k-animation-container
        try {
            document.querySelectorAll("style").forEach((styleEl) => {
                if (styleEl.textContent && styleEl.textContent.includes(".k-animation-container")) {
                    styleEl.textContent = styleEl.textContent.replace(
                        /\.k-animation-container\s*\{[^}]*\}/g,
                        ".k-animation-container { border-radius: 12px !important; overflow: hidden !important; }"
                    );
                }
            });
        } catch (e) { }

        if (document.getElementById("eb-paso1-kendo-styles")) return;
        const style = document.createElement("style");
        style.id = "eb-paso1-kendo-styles";
        style.textContent = `
            #search-step .input-container {
                position: relative;
                width: 100%;
            }
            #search-step .k-widget.k-dropdown,
            #search-step .k-widget.k-combobox {
                width: 100% !important;
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
                margin-bottom: 1.2rem !important;
            }
            #search-step .k-dropdown-wrap,
            #search-step .k-picker-wrap,
            #search-step .k-combobox .k-state-default {
                width: 100% !important;
                background-color: #f1f3f6 !important;
                border: none !important;
                border-radius: 25px !important;
                height: 48px !important;
                display: flex !important;
                align-items: center !important;
                padding: 0 0.8rem 0 1.2rem !important;
                box-shadow: none !important;
                box-sizing: border-box !important;
            }
            #search-step .destination-wrapper .k-dropdown-wrap {
                padding-right: 3.2rem !important;
            }
            #search-step #fechaViaje {
                height: 48px !important;
                margin: 0 0 1.2rem !important;
                width: 100% !important;
                padding: 0 3rem 0 1.2rem !important;
                background-color: #f1f3f6 !important;
                border: none !important;
                border-radius: 25px !important;
                color: #2d3748 !important;
                box-shadow: none !important;
                box-sizing: border-box !important;
            }
            #search-step #swapBtn {
                height: 48px !important;
                top: 0 !important;
                right: 0 !important;
                transform: none !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 16px !important;
                z-index: 2;
            }
            #search-step .k-dropdown-wrap.k-state-hover,
            #search-step .k-dropdown-wrap.k-state-focused {
                background-color: #e8ecf1 !important;
                border: none !important;
                box-shadow: none !important;
            }
            #search-step .k-dropdown-wrap.k-state-focused,
            #search-step .k-picker-wrap.k-state-focused {
                outline: 2px solid rgba(31, 67, 104, 0.18) !important;
                outline-offset: 1px;
            }
            #search-step .k-dropdown-wrap .k-input,
            #search-step .k-combobox .k-input {
                width: 100% !important;
                height: 100% !important;
                line-height: 48px !important;
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                font-size: 0.9rem !important;
                color: #2d3748 !important;
                box-shadow: none !important;
            }
            #search-step .k-select,
            #search-step .k-combobox .k-state-hover .k-select {
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;
                width: 30px !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
            }
            #search-step .k-icon {
                color: #718096 !important;
            }
            .k-animation-container {
                border-radius: 12px !important;
                overflow: hidden !important;
            }
            .k-list-container.k-popup.k-group.k-reset {
                width: 100% !important;
                border: 1px solid #e2e8f0 !important;
                background-color: #f1f3f6 !important;
                border-radius: 12px !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
                box-sizing: border-box !important;
            }
            .k-list-scroller {
                background: #f1f3f6 !important;
                width: 100% !important;
            }
            .k-list,
            .k-list-ul {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .k-list .k-item,
            .k-list .k-list-item {
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 10px 16px !important;
                font-size: 0.88rem !important;
                border-radius: 6px !important;
                color: #2d3748 !important;
                text-align: left !important;
                justify-content: flex-start !important;
            }
            .k-list .k-item.k-state-hover,
            .k-list .k-item.k-state-selected,
            .k-list .k-list-item.k-state-hover,
            .k-list .k-list-item.k-state-selected {
                background-color: #1f4368 !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }

    function syncKendoPopupWidth(widget) {
        if (!widget || !widget.wrapper || !widget.popup) return;
        const apply = () => {
            const wrapperEl = widget.wrapper[0];
            if (!wrapperEl) return;
            const containerEl = wrapperEl.closest(".input-container") || wrapperEl;
            const rect = containerEl.getBoundingClientRect();
            if (!rect.width) return;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
            const animContainer = widget.popup.wrapper && widget.popup.wrapper[0];
            const listContainer = widget.popup.element && widget.popup.element[0];
            const widthPx = `${Math.round(rect.width)}px`;
            const leftPx = `${Math.round(rect.left + scrollLeft)}px`;

            if (animContainer) {
                animContainer.style.setProperty("width", widthPx, "important");
                animContainer.style.setProperty("min-width", widthPx, "important");
                animContainer.style.setProperty("max-width", widthPx, "important");
                animContainer.style.setProperty("left", leftPx, "important");
            }
            if (listContainer) {
                listContainer.style.setProperty("width", "100%", "important");
                listContainer.style.setProperty("min-width", "100%", "important");
                listContainer.style.setProperty("box-sizing", "border-box", "important");
            }
        };
        apply();
        requestAnimationFrame(apply);
        setTimeout(apply, 0);
        setTimeout(apply, 50);
    }

    async function setControlKendoCombobox(data, idTarget, onChangeCallback) {
        const element = document.querySelector(`#${idTarget}`);
        if (!element) {
            console.warn("Elemento no encontrado:", idTarget);
            setTimeout(() => setControlKendoCombobox(data, idTarget, onChangeCallback), 100);
            return;
        }
        applyKendoComboStyles();
        element.classList.remove("form-control", "form-control-sm");
        element.classList.add("custom-pill-kendo");
        if (element.kendoComboBox) {
            element.kendoComboBox.destroy();
        }
        const widget = kendo.jQuery(`#${idTarget}`).kendoComboBox({
            placeholder: "----",
            filter: "contains",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: data,
            minLength: 1,
            autoBind: true,
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true,
            open: (e) => syncKendoPopupWidth(e.sender),
            dataBound: (e) => syncKendoPopupWidth(e.sender),
            change: onChangeCallback
        }).data("kendoComboBox");
        if (widget && widget.popup) {
            widget.popup.bind("open", () => syncKendoPopupWidth(widget));
            widget.popup.bind("activate", () => syncKendoPopupWidth(widget));
        }
    }

    /**
 * Inicializa el control visualmente de forma inmediata.
 */
    function initKendoCombobox(idTarget, onChangeCallback) {
        const element = document.querySelector(`#${idTarget}`);

        if (!element) {
            console.warn("Elemento no encontrado, reintentando:", idTarget);
            setTimeout(() => initKendoCombobox(idTarget, onChangeCallback), 100);
            return;
        }

        applyKendoComboStyles();
        element.classList.remove("form-control", "form-control-sm");
        element.classList.add("custom-pill-kendo");

        // Si ya existe, lo destruimos para evitar duplicados
        const prevWidget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");
        if (prevWidget) {
            prevWidget.destroy();
        }

        // Inicialización replicando estilos de 4 Pasajeros
        const widget = kendo.jQuery(`#${idTarget}`).kendoComboBox({
            placeholder: "Cargando datos...",
            filter: "contains",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: [],
            minLength: 1,
            autoBind: true,
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true,
            open: (e) => syncKendoPopupWidth(e.sender),
            dataBound: (e) => syncKendoPopupWidth(e.sender),
            change: onChangeCallback
        }).data("kendoComboBox");

        if (widget && widget.popup) {
            widget.popup.bind("open", () => syncKendoPopupWidth(widget));
            widget.popup.bind("activate", () => syncKendoPopupWidth(widget));
        }
    }

    function updateKendoComboboxData(idTarget, data) {
        const widget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");

        if (widget) {
            // Actualizamos el DataSource y cambiamos el placeholder
            const dataSource = new kendo.data.DataSource({ data: data });
            widget.setDataSource(dataSource);

            // Opcional: Restaurar placeholder original o habilitar si estaba deshabilitado
            widget.input.attr("placeholder", "----");
        } else {
            console.error("No se puede actualizar: El widget no ha sido inicializado en", idTarget);
        }
    }

    async function initFecha(mode = "range") {
        await loadFlatpickr();
        if (calendar) {
            calendar.destroy();
        }
        var e = new Date()
        e.setMonth(e.getMonth() + 3);
        calendar = flatpickr("#calendarContainer", {
            inline: true,
            mode: mode,
            minDate: "today",
            maxDate: `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`,
            dateFormat: "Y-m-d",
            locale: "es",
            showMonths: 1,
            disableMobile: true,
            onChange: function (dates) {
                selectedDates = dates.map(date => formatDateISO(date));
                updateModalDateHint();
            }
        });
    }
    function loadFlatpickr() {
        if (window.flatpickr && window.flatpickr.l10ns.es) return Promise.resolve();
        if (flatpickrLoadPromise) return flatpickrLoadPromise;

        flatpickrLoadPromise = new Promise((resolve, reject) => {
            // 1. Cargar CSS (no bloquea el JS, puede ir solo)
            if (!document.querySelector('link[href*="flatpickr.min.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
                document.head.appendChild(link);
            }

            // 2. Cargar el JS Principal
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/flatpickr";

            script.onload = () => {
                // 3. SOLO cuando el principal cargue, cargamos el idioma
                const scriptLocale = document.createElement("script");
                scriptLocale.src = "https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/es.js";

                scriptLocale.onload = () => {
                    console.log("Flatpickr y lenguaje ES cargados");
                    resolve();
                };

                scriptLocale.onerror = () => reject("Error cargando el idioma de flatpickr");
                document.body.appendChild(scriptLocale);
            };

            script.onerror = () => reject("Error cargando flatpickr");
            document.body.appendChild(script);
        });
        flatpickrLoadPromise = flatpickrLoadPromise.catch((error) => {
            flatpickrLoadPromise = null;
            throw error;
        });
        return flatpickrLoadPromise;
    }

    function openDateModal() {
        const element = document.getElementById("dateModal");
        element.classList.remove("hidden");
        updateModalDateHint();
    }

    function updateModalDateHint() {
        const hint = document.getElementById("tripTypeModal");
        if (!hint) return;
        if (searchState.tripType === "oneway") {
            hint.innerText = "Ida";
        } else if (selectedDates.length === 0) {
            hint.innerText = "Selecciona fecha de ida";
        } else if (selectedDates.length === 1) {
            hint.innerText = "Ahora selecciona fecha de regreso";
        } else {
            hint.innerText = "Ida y vuelta";
        }
    }

    function closeDateModal() {
        const element = document.getElementById("dateModal");
        element.classList.add("hidden");
    }

    function getValuesDates() {
        if (searchState.tripType !== "oneway" && selectedDates.length < 2) {
            Swal.fire({
                toast: true,
                position: "top",
                icon: "warning",
                title: "Selecciona también la fecha de regreso",
                showConfirmButton: false,
                timer: 2500
            });
            return;
        }
        const value = selectedDates.join(" - ");
        searchState.departureDate = selectedDates[0];
        searchState.returnDate = selectedDates[1] || null;
        document.getElementById("fechaViaje").value = value;
        validateForm();
        closeDateModal();
    }

    initSearchStep();
})();