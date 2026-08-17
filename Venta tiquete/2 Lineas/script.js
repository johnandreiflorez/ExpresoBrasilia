// Paso 2 - Selección de línea de viaje (Versión refactorizada, JavaScript "manilla")
// Lista para copiar/pegar y reemplazar.
// Dependencias externas esperadas: G_addHeaderPages, G_PouchService, Swal, goLocation, kendo (opcional)

(async () => {
    // -----------------------
    // Inicialización y estado
    // -----------------------
    await G_addHeaderPages();
    const pouchService = new G_PouchService();
    const compra = await pouchService.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas()
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
    };

    // -----------------------
    // Bind events
    // -----------------------
    if (el.btnBack) el.btnBack.addEventListener("click", handleBack);
    if (el.applyFilters) el.applyFilters.addEventListener("click", applyFilters);
    if (el.clearFilters) el.clearFilters.addEventListener("click", resetFilters);
    if (el.filterIcon) el.filterIcon.addEventListener("click", () => el.filterCard && el.filterCard.classList.toggle("d-none"));

    // Inicial render
    updateTitle();
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

        // Renderizar listas
        renderLines(filteredOut, el.listOutward, isReturnSelected);

        // Cerrar panel de filtros
        if (el.filterCard) el.filterCard.classList.add("d-none");
    }

    function resetFilters() {
        document.querySelectorAll("#step2 input[type=checkbox]").forEach((cb) => cb.checked = false);
        if (el.sortRoutes) el.sortRoutes.value = "price";
        // restaurar listas originales
        let currentOutward = [...(CURRENT_LINES || [])];
        renderLines(currentOutward, el.listOutward, !!fechaRegreso);
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
                ACP: "fa-tv",
                WIF: "fa-wifi",
                EAB: "fa-headphones",
                TMC: "fa-plug",
            };
            let amenitiesHtml = '';
            const aminidades = consolidateAmenities(lineas);
            if (Array.isArray(aminidades) && aminidades.length > 0) {
                amenitiesHtml += '<div class="amenities-list">';
                aminidades.forEach((amen) => {
                    const iconClass = amenityIcons[amen.codigo] || "fa-question-circle";
                    amenitiesHtml += `<span class="amenity-badge small"><i class="fas ${iconClass}"></i> ${escapeHtml(amen.descripcion)}</span>`;
                });
                amenitiesHtml += '</div>';
            }
            card.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <img src="${LOGOS[primera.empresa] || ''}" alt="logo servicio" class="mr-2" style="height:32px;">
          </div>
          <div class="row">
            <div class="col-6">
              <p class="mb-1"><strong>Salida:</strong> ${escapeHtml(salida)}</p>
              <p class="mb-1"><strong>Llegada:</strong> ${escapeHtml(llegada)}</p>
              <p class="mb-1"><strong>Duración:</strong> ${escapeHtml(duracion)}</p>
            </div>
            <div class="col-6 text-right">
              <p class="mb-1 text-muted">Tarifa base</p>
              <h5 class="mb-1">$${formatNumber(tarifaBase)}</h5>
              ${mejorDesc ? `<p class="mb-1 text-success">Con descuento: <strong>$${formatNumber(tarifaDesc)}</strong></p>` : ""}
            </div>
          </div>
          ${lineas.length > 1 ? `<p class="mb-1"><strong>Rutas:</strong> ${lineas.length}</p>` : ""}
          ${amenitiesHtml}
          </div>
          <div class="d-flex justify-content-between mt-2">
            <button class="btn btn-primary btn-sm ver-sillas">Ver sillas</button>
            
            ${lineas.length > 1 ? `<button class="btn btn-danger btn-sm ver-detalles" data-toggle="collapse" data-target="#${uniqueId}">Ver detalles</button>` : ''}
          </div>
          <div id="${uniqueId}" class="detalles collapse mt-3">
            ${renderTimeline(lineas)}
          </div>
        </div>
      `;

            // Evento 'Ver sillas'
            const verSillasBtn = card.querySelector(".ver-sillas");
            if (verSillasBtn) {
                verSillasBtn.addEventListener("click", async () => {
                    // Validaciones de capacidad
                    const minAvailable = Math.min(...(trayecto.lineas || []).map(l => (l.data && (l.data.puestosDisponibles || 0)) || 0));
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
                    goLocation('#/page/sillas/ExpresoBrasilia_Lappiz');
                });
            }

            container.appendChild(card);
        });
    }
    function consolidateAmenities(lineas) {
        const amenities = new Set();

        lineas.forEach(l => {
            const aList = l.amenidades || l.data?.amenidades || [];
            aList.forEach(a => amenities.add(a));
        });

        return [...amenities];
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


        let html = `<div class="timeline">`;
        lineas.forEach((l) => {
            const salida = formatTime12h(l.horaSalida || l.hora);
            const llegada = formatTime12h(l.horaLlegada);
            const duracionParcial = formatDuration(getDurationMinutes(l));
            html += `
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <img src="${LOGOS[l.empresa] || ''}" alt="logo servicio" class="mr-2" style="height:32px;">
          </div>
          <div><strong>Salida:</strong> ${escapeHtml(salida)} · ${escapeHtml(l.descOrigen || "")}</div>
          <div class="small text-muted">${escapeHtml((l.infoServicio && l.infoServicio.descripcion) || "")}</div>
          <div class="small">Vía: ${escapeHtml(l.via || "N/A")}</div>
          <div class="small">Duración parcial: ${escapeHtml(duracionParcial)}</div>
          <div><strong>Llegada:</strong> ${escapeHtml(llegada)} · ${escapeHtml(l.descDestino || "")}</div>
          <hr>
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
        return Array.from(document.querySelectorAll("#step2 input[type=checkbox]:checked"))
            .filter(cb => cb.id !== "directOnly")
            .map(cb => cb.value);
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

    function updateTitle() {
        if (!el.titleStep) return;
        el.titleStep.innerText = isReturnSelected ? "Selecciona tu viaje de Regreso" : "Selecciona tu viaje de ida";
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
