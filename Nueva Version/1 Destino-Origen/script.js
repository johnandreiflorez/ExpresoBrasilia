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
    loadOrigenes();
    loadDestinos('CTG');
    await G_addHeaderPages();
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

    async function initSearchStep() {
        await loadFlatpickr();
        await restoreCompraActiva();
        initFecha(searchState.tripType === "oneway" ? "single" : "range");
        attachEvents();
    }

    const formatDateISO = d => {
        const date = new Date(d);
        return date.toISOString().slice(0, 10);
    };
    async function loadOrigenes() {
        const idTarget = "originSelect"
        initKendoCombobox(idTarget, async (e) => {
            searchState.origin = e.sender.value() || null;
            await loadDestinos(e.sender.value());
            await getVigencia();
            validateForm();
        })
        const response = await fetch(API.origenes);
        const data = await response.json();
        updateKendoComboboxData(idTarget, data.data)

        if (searchState.origin) {
            const widget = kendo.jQuery("#originSelect").data("kendoComboBox");
            if (widget) {
                widget.value(searchState.origin);
                await loadDestinos(searchState.origin);
            }
        }
        //setControlKendoCombobox(data.data, idTarget);
    }

    async function getVigencia() {
        const origen = searchState.origin;
        const destino = searchState.destination;
        const response = await fetch(`${API.vigencia}?empresa=EC&origen=${origen}&destino=${destino}`);
        const data = await response.json();
        updateMaxDateByDays(data.data);
    }

    function updateMaxDateByDays(days) {
        if (!calendar) return;
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + days);
        // Formato YYYY-MM-DD
        const formattedMaxDate = maxDate.toISOString().split("T")[0];
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

                kendo.jQuery("#originSelect").data("kendoComboBox").value(searchState.origin);
                await loadDestinos(searchState.origin);
                kendo.jQuery("#destinationSelect").data("kendoComboBox").value(searchState.destination);
                await getVigencia();
                validateForm();
            });

        document.getElementById("searchBtn")
            .addEventListener("click", handleSearch);

        document.getElementById("fechaViaje")
            .addEventListener("click", openDateModal);

        document.getElementById("closeDateModal")
            .addEventListener("click", closeDateModal);

        document.getElementById("getValuesDates")
            .addEventListener("click", getValuesDates);
    }

    async function loadDestinos(origen) {
        const idTarget = "destinationSelect";
        initKendoCombobox(idTarget, async (e) => {
            searchState.destination = e.sender.value();
            await getVigencia();
            validateForm();
        })
        const response = await fetch(API.destinos + encodeURIComponent(origen));
        const data = await response.json();
        updateKendoComboboxData(idTarget, data.data);

        if (searchState.destination) {
            const widget = kendo.jQuery("#destinationSelect").data("kendoComboBox");
            if (widget) {
                widget.value(searchState.destination);
                await getVigencia();
                validateForm();
            }
        }
    }

    async function restoreCompraActiva() {
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
                successLoadLinesReturn
            });
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
        const config = { nameFunction, lappizFunctionId, body: {}, method: "GET" };
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

    async function setControlKendoCombobox(data, idTarget, onChangeCallback) {
        const element = document.querySelector(`#${idTarget}`);
        if (!element) {
            console.warn("Elemento no encontrado:", idTarget);
            setTimeout(() => setControlKendoCombobox(data, idTarget), 100);
            return;
        }
        if (element.kendoComboBox) {
            element.kendoComboBox.destroy();
        }
        kendo.jQuery(`#${idTarget}`).kendoComboBox({
            inputMode: "search",
            adaptiveMode: "auto",
            size: "small",
            rounded: "full",
            fillMode: "none",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: data,
            filter: "contains",
            placeholder: "----",
            minLength: 1,
            autoBind: true,
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true,
            change: onChangeCallback
        });
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

        // Si ya existe, lo destruimos para evitar duplicados
        const widget = kendo.jQuery(`#${idTarget}`).data("kendoComboBox");
        if (widget) {
            widget.destroy();
        }

        // Inicialización con DataSource vacío
        kendo.jQuery(`#${idTarget}`).kendoComboBox({
            inputMode: "search",
            adaptiveMode: "auto",
            size: "small",
            rounded: "full",
            fillMode: "none",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: [], // Empezamos vacío
            filter: "contains",
            placeholder: "Cargando datos...", // Placeholder temporal
            minLength: 1,
            autoBind: true,
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true,
            change: onChangeCallback
        });
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
        return new Promise((resolve, reject) => {
            if (window.flatpickr && window.flatpickr.l10ns.es) {
                resolve();
                return;
            }

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