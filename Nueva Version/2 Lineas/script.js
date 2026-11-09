// Paso 2 - Selección de línea de viaje (Versión refactorizada, JavaScript "manilla")
// Lista para copiar/pegar y reemplazar.
// Dependencias externas esperadas: G_addHeaderPages, G_PouchService, Swal, goLocation, kendo (opcional)

(async () => {
    console.log("script Step 2")
    // -----------------------
    // Inicialización y estado
    // -----------------------
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    G_deleteHeaderPages();
    G_addStylePages();
    G_addModalResumen();
    const pouchService = new G_PouchService();
    const compra = await pouchService.obtenerCompraActiva();
    if (!compra) {
        await pouchService.limpiarExpiradas()
        document.querySelectorAll('.detalles-modal').forEach(e => e.remove())
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        document.getElementById('resumenCompra').classList.add('d-none');
    }

    const {
        _id,
        fechaIda,
        fechaRegreso,
        successLoadLines = [],
        successLoadLinesReturn = [],
        isReturnSelected = false,
    } = compra;
    let CURRENT_LINES = isReturnSelected ? successLoadLinesReturn : successLoadLines;
    // Logos y roles (dejar como están para compatibilidad)
    const LOGOS = {
        EC: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/brasilia.svg",
        UN: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/unitransco.svg",
        EA: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/arauca.svg",
    };
    const ROLES = {
        12: { porcentajeDescuento: "porcentajeDescAuxiliar" },
        22: { porcentajeDescuento: "porcentajeDescDirector" },
        23: { porcentajeDescuento: "porcentajeDescEspecial" },
    };
    const ROL = sessionStorage.roleId || "";

    // Contenedores DOM (cached)
    const el = {
        btnBack: document.getElementById("lastStep2"),
        applyFilters: document.getElementById("applyFilters"),
        clearFilters: document.getElementById("clearFilters"),
        filterIcon: document.getElementById("filterIcon"),
        filterCard: document.getElementById("filterCard"),
        sortRoutes: document.getElementById("sortRoutes"),
        listOutward: document.getElementById("listOutward"),
        listReturn: document.getElementById("listReturn"),
        titleStep: document.getElementById("title-step2"),
        directFilterGroup: document.getElementById("directFilterGroup"),
        dateStep: document.getElementById("date-step2"),
        departure: document.getElementById("departure"),
        arrival: document.getElementById("arrival"),
        countLines: document.getElementById("count-lines"),
        closeFilterModal: document.getElementById("closeFilterModal"),
        checksTimeSlots: document.querySelectorAll("#filterCard input[type=checkbox]")
    };

    // -----------------------
    // Bind events
    // -----------------------
    function bindEvents() {
        if (!el.btnBack || !el.applyFilters || !el.clearFilters || !el.filterIcon || !el.closeFilterModal || !el.checksTimeSlots) {
            setTimeout(bindEvents, 10);
            return;
        }
        el.btnBack.addEventListener("click", handleBack);
        el.applyFilters.addEventListener("click", applyFilters);
        el.clearFilters.addEventListener("click", resetFilters);
        el.filterIcon.addEventListener("click", toggleViewFilterModal);
        el.closeFilterModal.addEventListener("click", toggleViewFilterModal)
        el.checksTimeSlots.forEach((checkTimeSlot) => checkTimeSlot.addEventListener("click", (e) => {
            if (e.checked)
                e.classList.add('active');
            else
                e.classList.remove('active');
        }))
        console.log("BIND EVENTS OK")
    }
    bindEvents();

    function toggleViewFilterModal() {
        el.filterCard.classList.toggle("hidden")
    }

    // Inicial render
    updateTitle();
    updateDate();
    updateDepartureArrival();
    initCountLines();
    renderLines(CURRENT_LINES, el.listOutward, isReturnSelected);
    // if (fechaRegreso && currentReturn.length > 0) {
    //   renderLines(currentReturn, el.listReturn, true);
    //   if (typeof kendo !== "undefined" && kendo.jQuery) kendo.jQuery("#linesReturn").removeClass("d-none");
    // }
    updateDirectFilterVisibility();

    // -----------------------
    // Navegación
    // -----------------------
    function handleBack() {
        document.querySelectorAll('.detalles-modal').forEach(e => e.remove())
        if (isReturnSelected) {
            // Si estaba seleccionando regreso, regresar a selección de sillas y limpiar flag
            pouchService.guardarCompra({ _id, isReturnSelected: false });
            return goLocation("#/page/sillas/ExpresoBrasilia_Lappiz");
        }
        // Si estaba en ida, regresar a pantalla de destino
        goLocation("#/page/destino/ExpresoBrasilia_Lappiz");
        document.getElementById('resumenCompra').classList.add('d-none');
    }

    // -----------------------
    // Filtros y ordenamiento
    // -----------------------
    function applyFilters() {
        const selectedSlots = getSelectedTimeSlots();
        const sortOption = el.sortRoutes ? el.sortRoutes.value : "price";
        const directOnly = isDirectOnlyChecked();

        // Copias de las listas originales para filtrar
        let filteredOut = [...(CURRENT_LINES || [])];

        // Filtrar por slots (mañana/tarde/noche/madrugada)
        if (selectedSlots.length > 0) {
            filteredOut = filteredOut.filter((t) => {
                const hora = safeGet(t, ["lineas", 0, "data", "horaSalida"]) || safeGet(t, ["lineas", 0, "data", "hora"]);
                return selectedSlots.includes(getTimeSlot(hora));
            });
        }

        // Ordenar
        const sorter = buildSorter(sortOption);
        filteredOut.sort(sorter);

        // Filtro directOnly (rutas sin conexion ni enlace)
        if (directOnly) {
            filteredOut = filteredOut.filter((line) => !line.conexion && !line.enlace);
        }
        const total = CURRENT_LINES.length;
        const filter = filteredOut.length;
        updateCountLines(total, filter);
        // Renderizar listas
        renderLines(filteredOut, el.listOutward, isReturnSelected);

        // Cerrar panel de filtros
        toggleViewFilterModal();
    }

    function resetFilters() {
        document.querySelectorAll("#filterCard input[type=checkbox]").forEach((cb) => {
            cb.checked = false;
            cb.classList.remove('active')
        });
        if (el.sortRoutes) el.sortRoutes.value = "price";
        // restaurar listas originales
        let currentOutward = [...(CURRENT_LINES || [])];
        renderLines(currentOutward, el.listOutward, !!fechaRegreso);
        updateCountLines(currentOutward.length, currentOutward.length)
        toggleViewFilterModal();

    }

    // -----------------------
    // Render de tarjetas
    // -----------------------
    function renderLines(trayectos = [], container, isReturn) {
        if (!container) return;
        container.innerHTML = "";

        if (!Array.isArray(trayectos) || trayectos.length === 0) {
            container.innerHTML = "<div class='text-muted p-3'>No hay rutas disponibles.</div>";
            return;
        }

        trayectos.forEach((trayecto, idx) => {
            const lineas = (trayecto.lineas || []).map(l => l.data || {});
            if (lineas.length === 0) return; // salto defensivo

            const primera = lineas[0];
            const ultima = lineas[lineas.length - 1];
            const uniqueId = `det-${primera.ruta || "ruta"}-${primera.hora || primera.horaSalida || idx}-${idx}`;

            const salida = formatTime12h(primera.horaSalida || primera.hora);
            const llegada = formatTime12h(ultima.horaLlegada);
            const duracion = formatDuration(Math.round((toDateTime(ultima.fechaLlegada, ultima.horaLlegada) - toDateTime(primera.fechaSalida, primera.horaSalida)) / 60000));

            // Cálculo de tarifas y mejor descuento por rol (si aplica)
            let tarifaBase = 0;
            let mejorDesc = 0;
            lineas.forEach((l) => {
                tarifaBase += (l.tarifa && l.tarifa.valorTarifa) ? l.tarifa.valorTarifa : 0;
                const descField = ROL && ROLES[ROL] ? ROLES[ROL].porcentajeDescuento : null;
                const desc = descField ? (l.tarifa ? l.tarifa[descField] || 0 : 0) : 0;
                if (desc > mejorDesc) mejorDesc = desc;
            });
            const tarifaDesc = Math.round(tarifaBase - (tarifaBase * mejorDesc) / 100);

            // Construcción del card
            const card = document.createElement("div");
            card.className = "card mb-3 shadow-sm";
            const amenityIcons = {
                ACP: "video",
                WIF: "wifi",
                EAB: "musica",
                TMC: "cargador",
            };
            let amenitiesHtml = '';
            const aminidades = consolidateAmenities(lineas);
            if (Array.isArray(aminidades) && aminidades.length > 0) {
                amenitiesHtml += '<div class="amenities-list" style="line-height: 2px;"> ';
                aminidades.forEach((amen) => {
                    const iconClass = amenityIcons[amen.codigo] || "video";
                    amenitiesHtml += `<span class="amenity-badge small"><img src="https://runtimetest.lappiz.io/assets/images/expreso/${iconClass}.svg" alt="${amen.descripcion}" style="width: 16px; height: 16px;"> ${escapeHtml(amen.descripcion)}</span>`;
                });
                amenitiesHtml += '</div>';
            }
            if (idx == 0) {
                card.style.cssText = "margin-bottom: 0px !important";
            }
            card.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center mb-4" style="justify-content: space-between;">
            <img src="${LOGOS[primera.empresa] || ''}" alt="logo servicio" class="mr-2" style="height:15px;">
            <h5 class="mb-1 line-price">$${formatNumber(tarifaBase)} <span class="currency">cop</span></h5>
            ${mejorDesc ? `<p class="mb-1 line-price">$${formatNumber(tarifaDesc)} <span class="currency">cop</span></p>` : ""}
          </div>
          <div class="row" style="display: flex;justify-content: space-between;flex-wrap: nowrap;align-items: center;">
            <div>
              <p style="line-height: 2px;" class="mb-1"><strong>${escapeHtml(salida)}</strong></p>
              <p class="mb-1"><strong>${compra.isReturnSelected ? compra.destino : compra.origen}</strong></p>
              <p style="line-height: 2px;" class="text-muted">${trayecto.terminalOrigen || ''}</p>
            </div>
            <div><p class="text-muted">– ${lineas.length} ${lineas.length > 1 ? "rutas" : "ruta"} →</p></div>
            <div>
              <p style="line-height: 2px;" class="mb-1"><strong>${escapeHtml(llegada)}</strong></p>
              <p class="mb-1"><strong>${compra.isReturnSelected ? compra.origen : compra.destino}</strong></p>
              <p style="line-height: 2px;" class="text-muted">${trayecto.terminalDestino || ''}</p>
            </div>
          </div>
          
          </div>
          <div class="d-flex justify-content-between mt-2">
          <button class="btn btn-primary btn-sm ver-detalles" data-target="${uniqueId}">Ver detalle</button>
          <button class="btn btn-primary btn-sm ver-sillas">Ver sillas</button>
          </div>
        </div>
      `;
            //   <div id="${uniqueId}" class="detalles-modal hidden">
            //         <div class="detalles-sheet">
            //         ${amenitiesHtml}
            //         ${renderTimeline(lineas)}
            //         </div>
            //       </div>
            const detalleModal = document.createElement("div");
            detalleModal.id = uniqueId;
            detalleModal.className = "detalles-modal hidden";
            detalleModal.innerHTML = `
    <div class="detalles-sheet">
        
    <button class="close-modal-btn" style="transform: translate(350px, 0px);border: none;background: none;">✕</button>
        <div class="sheet-header">
            <h2 class="title-intinerary">Detalle de trayecto</h2>
            <p class="subtitle-muted">Itinerario</p>
        </div>

        <div class="badge-viaje">
            <img src="https://runtimetest.lappiz.io/assets/images/expreso/info.svg" alt="alerta" style="width: 16px; height: 16px;">
            <span>Viaje de paso</span>
        </div>

        ${renderTimeline(lineas)}

        <div class="services-section">
            <h3 class="subtitle-intinerary">Características y servicios</h3>
            ${amenitiesHtml}
        </div>

    </div>
`;

            document.body.appendChild(detalleModal);


            // Evento 'Ver sillas'
            const verSillasBtn = card.querySelector(".ver-sillas");
            const verDetalleBtn = card.querySelector(".ver-detalles");
            const closeModalBtn = detalleModal.querySelector(".close-modal-btn");
            if (closeModalBtn) {
                closeModalBtn.addEventListener("click", () => {
                    detalleModal.classList.add("hidden");
                    document.body.style.overflow = "";
                });
            }
            if (verDetalleBtn && detalleModal) {

                verDetalleBtn.addEventListener("click", () => {
                    detalleModal.classList.remove("hidden");
                    document.body.style.overflow = "hidden"; // bloquea scroll fondo
                });

                detalleModal.addEventListener("click", (e) => {
                    if (e.target === detalleModal) {
                        detalleModal.classList.add("hidden");
                        document.body.style.overflow = "";
                    }
                });
            }
            if (verSillasBtn) {
                verSillasBtn.addEventListener("click", async () => {
                    // Validaciones de capacidad
                    //const minAvailable = Math.min(...(trayecto.lineas || []).map(l => (l.data && (l.data.puestosDisponibles || 0)) || 0));
                    const minAvailable = 5;
                    const cantidadPasajeros = minAvailable || window.cantidadPasajeros || 1; // si tu app define cantidadPasajeros global, se usa; si no, 1 por defecto

                    if (trayecto.conexion) {
                        const sinCupos = (trayecto.lineas || []).some(l => ((l.data && (l.data.puestosDisponibles || 0)) === 0));
                        if (sinCupos) {
                            return Swal.fire({
                                icon: "error",
                                title: "Ruta no disponible",
                                text: "Esta ruta con conexión no se puede seleccionar porque una de sus subrutas no tiene asientos disponibles.",
                            });
                        }
                    }

                    if (minAvailable <= 0 || (isReturnSelected && cantidadPasajeros && minAvailable < cantidadPasajeros)) {
                        return Swal.fire({
                            title: "Sin disponibilidad",
                            text: "Este trayecto no tiene asientos disponibles en todos los segmentos.",
                            icon: "warning",
                        });
                    }

                    // Abre modal (funcionalidad mínima retornando estado de segmentos)
                    const seatState = await openSeatModal(trayecto);
                    if (!seatState) return;

                    // Guardar selección parcial en PouchDB
                    if (isReturnSelected) {
                        pouchService.guardarCompra({ _id, viajeRegreso: trayecto, ...seatState, cantidadPasajeros });
                    } else {
                        pouchService.guardarCompra({ _id, viajeIda: trayecto, ...seatState, cantidadPasajeros });
                    }

                    // Navegar a selección de sillas
                    document.querySelectorAll('.detalles-modal').forEach(e => e.remove())
                    goLocation('#/page/sillas/ExpresoBrasilia_Lappiz');
                });
            }
            if (idx == 0) {
                const firstCard = document.createElement("div");
                firstCard.style.cssText = `
    margin-top: 1rem;
    background: #f7d300;
    padding: 3px;
    border-radius: 23px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    `;
                firstCard.innerHTML = `
    <p class="text-center">Más rapido</p>
    `;
                firstCard.appendChild(card);
                container.appendChild(firstCard);
            } else {
                container.appendChild(card);
            }
        });
    }
    function consolidateAmenities(lineas) {
        const amenitiesMap = new Map();

        lineas.forEach(l => {
            const aList = l.amenidades || l.data?.amenidades || [];

            aList.forEach(a => {
                if (a && a.codigo && !amenitiesMap.has(a.codigo)) {
                    amenitiesMap.set(a.codigo, a);
                }
            });
        });

        return Array.from(amenitiesMap.values());
    }


    // -----------------------
    // Modal / apertura sillas
    // -----------------------
    async function openSeatModal(lineData) {
        // Retorna un objeto con estado inicial para la selección de sillas
        // (aquí no abrimos UI real; mantenemos el contrato que usan otras partes del sistema)
        return { currentSegmentIndex: 0, totalSegments: (lineData.lineas || []).length };
    }

    // -----------------------
    // Timeline (detalles)
    // -----------------------
    function renderTimeline(lineas = []) {
        if (lineas.length <= 0) return '';

        let html = `<div class="timeline">`;

        lineas.forEach((l, idx) => {

            const salida = formatTime12h(l.horaSalida || l.hora);
            const llegada = formatTime12h(l.horaLlegada);
            const fechaSalida = l.fechaSalida || l.fecha;
            const fechaLlegada = l.fechaLlegada;
            const classNameFirst = idx === 0 ? "timeline-item first" : idx === lineas.length - 1 ? "timeline-item last" : "timeline-item middle";
            const classNameSecond = idx === lineas.length - 1 ? "timeline-item last" : "timeline-item middle";
            html += `
            <div class="${classNameFirst}">
                <h3 class="subtitle-intinerary">Salida</h3>
                <p>${escapeHtml(fechaSalida)} - Hora: ${escapeHtml(salida)}</p>
                <p><strong>${escapeHtml(l.descOrigen || "")}</strong></p>
                <p>${escapeHtml(l.ubicacion || "")}</p>
                <p>${escapeHtml(l.direccion || "")}</p>
                <p>${escapeHtml(l.geografia || "")}</p>
                <div class="mb-2">
                    <img src="${LOGOS[l.empresa] || ''}" 
                         alt="logo servicio" 
                         style="height:15px;">
                </div>
            </div>

            <div class="${classNameSecond}">
                <h3 class="subtitle-intinerary">Llegada</h3>
                <p>${escapeHtml(fechaLlegada)} - Hora: ${escapeHtml(llegada)}</p>
                <p><strong>${escapeHtml(l.descDestino || "")}</strong></p>
            </div>
        `;
        });

        html += `</div>`;

        return html;
    }


    // -----------------------
    // Utilitarios: fechas, tiempos, slots
    // -----------------------
    function parseHora(horaStr = "") {
        const s = String(horaStr).padStart(4, "0");
        const hours = parseInt(s.substring(0, 2), 10) || 0;
        const minutes = parseInt(s.substring(2), 10) || 0;
        return { hours, minutes };
    }

    function toDateTime(fecha = "1970-01-01", hhmm = "0000") {
        const { hours, minutes } = parseHora(hhmm);
        const [year = 1970, month = 1, day = 1] = (fecha || "").split("-").map(n => parseInt(n, 10));
        return new Date(year, (month || 1) - 1, day || 1, hours, minutes);
    }

    function getDurationMinutes(line = {}) {
        // line espera propiedades horaSalida / horaLlegada (HHMM)
        const salida = toMinutes(line.horaSalida || line.hora || "0000");
        const llegada = toMinutes(line.horaLlegada || "0000");
        let dur = llegada - salida;
        if (dur < 0) dur += 24 * 60; // cruza medianoche
        return dur;
    }

    function toMinutes(horaStr = "0000") {
        const { hours, minutes } = parseHora(horaStr);
        return hours * 60 + minutes;
    }

    function getTimeSlot(horaStr = "0000") {
        const { hours } = parseHora(horaStr);
        if (hours >= 7 && hours < 12) return "morning";
        if (hours >= 12 && hours < 19) return "afternoon";
        if (hours >= 19 && hours <= 23) return "night";
        return "dawn";
    }

    function formatTime12h(hhmm) {
        if (!hhmm) return "";
        const { hours, minutes } = parseHora(hhmm);
        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    function formatDuration(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    }

    // -----------------------
    // Helpers DOM / util
    // -----------------------
    function getSelectedTimeSlots() {
        return Array.from(document.querySelectorAll("#filterCard input[type=checkbox]:checked"))
            .filter(cb => cb.id !== "directOnly")
            .map(cb => {
                cb.classList.add('active')
                return cb.value
            });
    }

    function isDirectOnlyChecked() {
        const elDirect = document.getElementById("directOnly");
        return elDirect ? elDirect.checked : false;
    }

    function buildSorter(sortOption) {
        return (a, b) => {
            try {
                switch (sortOption) {
                    case "price": {
                        const aVal = safeGet(a, ["lineas", 0, "data", "tarifa", "valorTarifa"]) || 0;
                        const bVal = safeGet(b, ["lineas", 0, "data", "tarifa", "valorTarifa"]) || 0;
                        return aVal - bVal;
                    }
                    case "duration": {
                        const aDur = getDurationMinutes(safeGet(a, ["lineas", 0, "data"]) || {});
                        const bDur = getDurationMinutes(safeGet(b, ["lineas", 0, "data"]) || {});
                        return aDur - bDur;
                    }
                    case "departure": {
                        const aDate = toDateTime(safeGet(a, ["lineas", 0, "data", "fechaSalida"]), safeGet(a, ["lineas", 0, "data", "horaSalida"]) || safeGet(a, ["lineas", 0, "data", "hora"]));
                        const bDate = toDateTime(safeGet(b, ["lineas", 0, "data", "fechaSalida"]), safeGet(b, ["lineas", 0, "data", "horaSalida"]) || safeGet(b, ["lineas", 0, "data", "hora"]));
                        return aDate - bDate;
                    }
                    case "arrival": {
                        const aLast = safeGet(a, ["lineas", a.lineas.length - 1, "data"]) || {};
                        const bLast = safeGet(b, ["lineas", b.lineas.length - 1, "data"]) || {};
                        return toDateTime(aLast.fechaLlegada, aLast.horaLlegada) - toDateTime(bLast.fechaLlegada, bLast.horaLlegada);
                    }
                    default:
                        return 0;
                }
            } catch (err) {
                return 0;
            }
        };
    }
    function initCountLines() {
        const total = CURRENT_LINES.length;
        const filter = CURRENT_LINES.length;
        updateCountLines(total, filter);
    }
    function updateTitle() {
        if (!el.titleStep) return;
        el.titleStep.innerText = isReturnSelected ? "regreso" : "ida";
    }

    function updateDate() {
        if (!el.dateStep) return;
        el.dateStep.innerText = isReturnSelected ? fechaRegreso : fechaIda;
    }

    function updateDepartureArrival() {
        if (!el.departure) return;
        el.departure.innerText = compra.isReturnSelected ? compra.destino : compra.origen;
        if (!el.arrival) return;
        el.arrival.innerText = compra.isReturnSelected ? compra.origen : compra.destino;
    }

    function updateCountLines(total, filter) {
        if (!el.countLines) return;
        el.countLines.innerText = `${filter} de ${total}`;
    }

    function updateDirectFilterVisibility() {
        const listToCheck = CURRENT_LINES || [];
        const hasLink = listToCheck.some(t => !!t.enlace);
        const hasConnections = listToCheck.some(t => !!t.conexion);
        if (!el.directFilterGroup) return;
        if (hasLink || hasConnections) el.directFilterGroup.classList.remove("d-none");
        else el.directFilterGroup.classList.add("d-none");
    }


    // -----------------------
    // Utilitarios pequeños
    // -----------------------
    function safeGet(obj, path = []) {
        return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    }

    function formatNumber(n) {
        return Number(n || 0).toLocaleString("es-CO");
    }

    function escapeHtml(str = "") {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})();
