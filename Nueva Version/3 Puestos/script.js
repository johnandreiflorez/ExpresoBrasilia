// Paso 3 - Selección de sillas 
console.log("Iniciar con la Selección de asientos");
(async () => {
    // -----------------------
    // Inicialización y estado
    // -----------------------
    G_deleteHeaderPages();
    G_addStylePages();
    G_addModalResumen();
    document.querySelectorAll('.detalles-modal').forEach(e => e.remove())
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    const pouch = new G_PouchService();
    const compra = await pouch.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas()
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        // document.getElementById('resumenCompra').classList.add('d-none');
    }
    const LOGOS = {
        EC: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/brasilia.svg",
        UN: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/unitransco.svg",
        EA: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/arauca.svg",
    };
    // Estado persistido desde "compra"
    const state = {
        _id: compra._id,
        origen: compra.origen,
        destino: compra.destino,
        fechaIda: compra.fechaIda,
        fechaRegreso: compra.fechaRegreso,
        viajeIda: compra.viajeIda || null,
        viajeRegreso: compra.viajeRegreso || null,
        isReturnSelected: !!compra.isReturnSelected,
        cantidadPasajeros: compra.cantidadPasajeros || window.cantidadPasajeros || 1,
        currentSegmentIndex: Number(compra.currentSegmentIndex || 0),
        totalSegments: Number(compra.totalSegments || (!!compra.isReturnSelected ? compra.viajeRegreso?.lineas?.length : compra.viajeIda?.lineas?.length) || 1),
        selectedSeatsIda: Array.isArray(compra.selectedSeatsIda) ? [...compra.selectedSeatsIda] : [],
        selectedSeatsRegreso: Array.isArray(compra.selectedSeatsRegreso) ? [...compra.selectedSeatsRegreso] : [],
        timerExpiresAt: compra.timerExpiresAt || null,
        successLoadLinesReturn: compra.successLoadLinesReturn || [],
        minSeats: compra.minSeats || 0
    };

    const ROLES = {
        12: { porcentajeDescuento: "porcentajeDescAuxiliar" },
        22: { porcentajeDescuento: "porcentajeDescDirector" },
        23: { porcentajeDescuento: "porcentajeDescEspecial" },
    };
    let isReservingSeat = false;
    const ROL = sessionStorage.roleId || "";
    // Timer state
    let countdownInterval = null;
    const TIMER_DEFAULT = 10 * 60;
    let timeLeft = state.timerExpiresAt ? Math.max(0, Math.floor((state.timerExpiresAt - Date.now()) / 1000)) : TIMER_DEFAULT;

    // DOM cache (defensivo)
    const DOM = {
        layout: document.getElementById("seatLayout"),
        title: document.getElementById("title-step3"),
        selectLinesBtn: document.getElementById("selectLines"),
        lastStepBtn: document.getElementById("lastStep3"),
        lastRouteBtn: document.getElementById("lastRoute"),
        nextRouteBtn: document.getElementById("nextRoute"),
        clearSeatsBtn: document.getElementById("clearSeats"),
        timer: document.getElementById("timer"),
        timerValue: document.getElementById("timerValue"),
        seatsFree: document.getElementById("seatsFree"),
        seatsTaken: document.getElementById("seatsTaken"),
        countPassengers: document.getElementById("count-passengers"),
        seatsTotal: document.getElementById("seatsTotal"),
        origenDestino: document.getElementById("origen-destino")
    };

    // Seguridad: si no hay viaje seleccionado, informar
    if (!state.viajeIda) {
        console.warn("No hay viajes cargados en la compra (viajeIda missing).");
    }

    if (state.fechaRegreso && !state.viajeRegreso) {
        console.warn("No hay viajes cargados en la compra (viajeRegreso missing).")
    }
    // Mostramos el boton de resumen si ya existe algun asiento seleccionado
    if (state?.selectedSeatsIda?.length > 0 || state?.selectedSeatsRegreso?.length > 0) {
        // document.getElementById('resumenCompra').classList.remove('d-none');
    }

    DOM.origenDestino.innerHTML = !state.isReturnSelected ? `${state.viajeIda.descOrigen} | ${state.viajeIda.descDestino}` : `${state.viajeRegreso?.descOrigen} | ${state.viajeRegreso?.descDestino}`;
    DOM.title.textContent = !state.isReturnSelected ? `Selecciona tus asientos de ida` : `Selecciona tus asientos de regreso`;

    // Restaurar timer persistido
    if (!hasAnyIdaSeatSelection() && state.timerExpiresAt) {
        state.timerExpiresAt = null;
        await saveStateToPouch();
        timeLeft = TIMER_DEFAULT;
    } else if (state.timerExpiresAt) {
        if (timeLeft <= 0) {
            await handleTimerExpired();
            return;
        }
        startTimerIfNeeded();
    }

    // -----------------------
    // Funciones auxiliares
    // -----------------------
    function safeGet(obj, path = []) {
        return path.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
    }

    async function saveStateToPouch() {
        // Solo guardamos las partes que importan para este paso
        try {
            await pouch.guardarCompra({ ...state })
        } catch (e) { console.error("Error guardando compra en pouch:", e) };
    }

    function formatNumber(n) {
        return Number(n || 0).toLocaleString("es-CO");
    }

    function getSelectedSeatsCount(seatGroups = []) {
        if (!Array.isArray(seatGroups)) return 0;
        return seatGroups.reduce((count, group) => {
            return count + (Array.isArray(group) ? group.length : 0);
        }, 0);
    }

    function hasAnyIdaSeatSelection() {
        return getSelectedSeatsCount(state.selectedSeatsIda) > 0;
    }

    function getTimerRemaining() {
        if (!state.timerExpiresAt) return TIMER_DEFAULT;
        return Math.max(0, Math.floor((state.timerExpiresAt - Date.now()) / 1000));
    }

    async function handleTimerExpired() {
        clearIntervalSafely();
        state.timerExpiresAt = null;
        timeLeft = 0;

        try {
            await pouch.eliminarCompra(state._id);
        } catch (e) {
            console.error("Error eliminando compra expirada:", e);
        }

        Swal.fire({
            icon: "warning",
            title: "Tiempo agotado",
            text: "El tiempo para completar tu compra ha terminado. Volverás al inicio.",
        }).then(() => {
            goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        });
    }

    // -----------------------
    // Timer (reservas)
    // -----------------------
    function startTimerIfNeeded() {
        if (state.timerExpiresAt) {
            if (!countdownInterval) {
                timeLeft = getTimerRemaining();
                if (timeLeft <= 0) {
                    handleTimerExpired();
                    return;
                }
                toggleTimer(true, false);
            }
            return;
        }

        if (hasAnyIdaSeatSelection() && !countdownInterval) {
            state.timerExpiresAt = Date.now() + TIMER_DEFAULT * 1000;
            timeLeft = TIMER_DEFAULT;
            saveStateToPouch();
            toggleTimer(true, true);
        }
    }

    function stopTimerIfNeeded() {
        if (!hasAnyIdaSeatSelection() && countdownInterval) {
            state.timerExpiresAt = null;
            toggleTimer(false, false);
            saveStateToPouch();
        }
    }

    function toggleTimer(enable, showMessage = true) {
        if (!DOM.timer || !DOM.timerValue) {
            if (enable && !countdownInterval) {
                countdownInterval = setInterval(() => {
                    timeLeft--;
                    if (timeLeft <= 0) {
                        clearIntervalSafely();
                        handleTimerExpired();
                    }
                }, 1000);
            } else if (!enable && countdownInterval) {
                clearIntervalSafely();
                timeLeft = TIMER_DEFAULT;
            }
            return;
        }

        if (enable) {
            if (countdownInterval) return; // ya corriendo
            if (showMessage) {
                Swal.fire({
                    icon: "info",
                    title: "Importante",
                    text: `Tiempo reservado para tu compra: ${Math.floor(TIMER_DEFAULT / 60)} minutos.`,
                });
            }
            DOM.timer.classList.remove("d-none");
            updateTimerDisplay();
            countdownInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0) {
                    clearIntervalSafely();
                    handleTimerExpired();
                }
            }, 1000);
        } else {
            DOM.timer.classList.add("d-none");
            clearIntervalSafely();
            timeLeft = TIMER_DEFAULT;
            updateTimerDisplay();
        }
    }

    function updateTimerDisplay() {
        if (!DOM.timerValue) return;
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
        const seconds = (timeLeft % 60).toString().padStart(2, "0");
        DOM.timerValue.textContent = `${minutes}:${seconds}`;
    }

    function clearIntervalSafely() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    // -----------------------
    // Conteo y validaciones
    // -----------------------
    function countSelectedTotal() {
        return getSelectedSeatsCount(state.selectedSeatsIda) + getSelectedSeatsCount(state.selectedSeatsRegreso);
    }

    function updateSeatCounters(total = 0, taken = 0, chosen = 0, tarifaLinea = null) {
        // Mostrar contadores si existen nodos
        if (DOM.seatsFree) DOM.seatsFree.textContent = Math.max(0, total - taken - chosen);
        if (DOM.seatsTaken) DOM.seatsTaken.textContent = taken;
        if (DOM.countPassengers) DOM.countPassengers.textContent = chosen;

        // Calcular tarifa total a pagar (si tarifaLinea provista usarla)
        let tarifa = tarifaLinea;
        if (tarifa === null) {
            // Intentar calcular desde viajeIda/viajeRegreso
            tarifa = computeTotalTripFare(state.viajeIda) || 0;
            if (state.isReturnSelected && state.viajeRegreso) tarifa += computeTotalTripFare(state.viajeRegreso) || 0;
        }

        const totalPagar = (state.cantidadPasajeros || 0) * tarifa;
        if (DOM.seatsTotal) DOM.seatsTotal.textContent = formatNumber(totalPagar);
        if (!state.isReturnSelected)
            calcularTotales(state.viajeIda.lineas)
        else
            calcularTotales(state.viajeRegreso.lineas)
    }

    function computeTotalTripFare(viaje = {}) {
        if (!viaje || !Array.isArray(viaje.lineas)) return 0;
        return viaje.lineas.reduce((acc, linea) => {
            const valor = safeGet(linea, ["data", "tarifa", "valorTarifa"]) || 0;
            const estampilla = safeGet(linea, ["data", "tarifa", "valorEstampilla"]) || 0;
            const impuesto = safeGet(linea, ["data", "tarifa", "porcentajeImpuesto"]) || 0;
            const lineaTotal = (valor + estampilla) * (1 + impuesto);
            return acc + lineaTotal;
        }, 0);
    }

    function validateSeatsUI() {
        // Habilitar selectLines solo si condiciones han sido cumplidas
        if (!DOM.selectLinesBtn) return;
        if (!state.isReturnSelected) {
            DOM.selectLinesBtn.disabled = (state.selectedSeatsIda.length === 0);
        } else if (state.fechaRegreso) {
            DOM.selectLinesBtn.disabled = (state.selectedSeatsIda?.[0]?.length !== state.selectedSeatsRegreso?.[state.currentSegmentIndex]?.length);
        }
    }

    // -----------------------
    // API helpers (execLF)
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
    async function ebWithToken(url) {
        const token = await ebGetToken();
        if (!token) return url;
        return url + (url.indexOf("?") >= 0 ? "&" : "?") + "token=" + encodeURIComponent(token);
    }
    function ebTransaccionId() {
        if (state.llaveTransaccion) return state.llaveTransaccion;
        try {
            const tx = JSON.parse(sessionStorage.getItem("EB_TRANSACCION") || "null");
            return tx && tx.llaveTransaccion ? tx.llaveTransaccion : null;
        } catch (e) { return null; }
    }
    async function ebActualizarCompra(body) {
        const transaccion = ebTransaccionId();
        if (!transaccion) {
            console.warn("actualizarCompra omitido: sin llaveTransaccion");
            return null;
        }
        try {
            const token = await ebGetToken();
            const res = await fetch(EB_LF + "actualizarCompra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.assign({}, body, { transaccion, token }))
            });
            const data = await res.json();
            if (data && data.error) console.error("actualizarCompra:", data.message);
            return data;
        } catch (e) {
            console.error("actualizarCompra error:", e);
            return null;
        }
    }
    function ebValorCompra() {
        try {
            let total = 0;
            const n = state.cantidadPasajeros || 1;
            [state.viajeIda, state.viajeRegreso].forEach((v) => {
                ((v && v.lineas) || []).forEach((l) => {
                    const t = (l.data && l.data.tarifa) || {};
                    const base = t.valorTarifa || 0;
                    const iva = (base * (t.porcentajeIva || 0)) / 100;
                    const imp = (base * (t.porcentajeImpuesto || 0)) / 100;
                    total += (base + iva + imp + (t.valorEstampilla || 0)) * n;
                });
            });
            return Math.round(total) || null;
        } catch (e) { return null; }
    }
    async function execLappizFunction(config) {
        try {
            const token = await ebGetToken();
            if (token) {
                config.body = Object.assign({}, config.body || {}, { token });
            }
            const res = await execLF(config);
            return res;
        } catch (err) {
            console.error("execLF error:", err);
            return { error: true, message: err.message || String(err) };
        }
    }

    // -----------------------
    // Clear / unselect seats
    // -----------------------
    async function clearAllSeats(isBack = false) {
        const currently = state.isReturnSelected ? state.selectedSeatsRegreso : state.selectedSeatsIda;

        let confirmed = { isConfirmed: true };
        if (!isBack) {
            confirmed = await Swal.fire({
                title: "¿Limpiar todos los puestos?",
                text: `Esto liberará todos los asientos seleccionados en ${state.isReturnSelected ? "regreso" : "ida"}.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, limpiar",
                cancelButtonText: "Cancelar",
            });
        }

        if (!confirmed.isConfirmed) return;

        // Desmarcar cada asiento vía API
        for (const s of [...currently]) {
            const body = {
                numero: s.numero,
                empresa: s.empresa,
                fechaViaje: s.fechaViaje,
                hora: s.hora,
                origen: s.codigoOrigen,
                destino: s.codigoDestino,
                ruta: s.ruta,
            };
            const config = {
                nameFunction: "desmarcarPuesto",
                lappizFunctionId: "e0f971b9-7921-4eb9-b7db-5ef3fb23b69c",
                body,
                method: "POST",
            };
            try {
                await execLappizFunction(config);
            } catch (err) {
                console.error("Error al desmarcar puesto:", err);
            }
        }

        // Filtrar arrays locales: dejamos los que NO pertenecen a la misma ruta que el primero (mantén comportamiento original)
        const firstRuta = currently[0]?.ruta;
        if (state.isReturnSelected) {
            state.selectedSeatsRegreso = state.selectedSeatsRegreso.filter(x => x.ruta !== firstRuta);
        } else {
            state.selectedSeatsIda = state.selectedSeatsIda.filter(x => x.ruta !== firstRuta);
        }

        // Reset UI y contadores
        updateSeatCounters(0, 0, 0);
        validateSeatsUI();
        // Remover clases .selected
        document.querySelectorAll(".seat.selected").forEach((el) => el.classList.remove("selected"));
        if (!hasAnyIdaSeatSelection()) {
            state.timerExpiresAt = null;
        }
        await saveStateToPouch();

        if (!isBack) {
            Swal.fire({ title: "Listo", text: "Todos los puestos han sido liberados.", icon: "success" });
        }
        stopTimerIfNeeded();
    }

    // -----------------------
    // Toggle seat (reserva/des-reserva)
    // -----------------------
    async function execToggleSeatApi(puesto, lineaData, config) {
        const body = {
            numero: puesto.numero,
            empresa: lineaData.empresa,
            fechaViaje: lineaData.fechaViaje,
            hora: lineaData.hora,
            origen: lineaData.codigoOrigen,
            destino: lineaData.codigoDestino,
            ruta: lineaData.ruta,
        };
        config.body = body;

        return execLappizFunction(config);
    }
    async function toggleSeatApi(seatEl, puesto, lineaData) {
        try {
            if (isReservingSeat) return;
            isReservingSeat = true;
            if (!puesto || !lineaData) return;

            const isSelected = seatEl.classList.contains("selected");
            let nameFunction = isSelected ? "desmarcarPuesto" : "marcarPuesto";
            const lappizFunctionId = isSelected
                ? "e0f971b9-7921-4eb9-b7db-5ef3fb23b69c"
                : "1f91634e-a75c-403c-a074-66ee070526e5";

            // Control de cantidad por viaje (si es regreso y se selecciona en regreso)
            let seatsSelected = state.isReturnSelected ? state.selectedSeatsRegreso : state.selectedSeatsIda;
            let selectedArr = seatsSelected?.[state.currentSegmentIndex] || [];
            if (!isSelected && (selectedArr.length >= state.cantidadPasajeros)) {
                Swal.fire({
                    title: "Límite alcanzado",
                    text: `Solo puedes seleccionar ${state.cantidadPasajeros} asientos en este viaje.`,
                    icon: "info",
                });
                return;
            }
            const config = { nameFunction, lappizFunctionId, method: "POST" };
            const response = await execToggleSeatApi(puesto, lineaData, config);
            if (response.error) {
                Swal.fire({ icon: "error", title: "Error", text: response.message || "Error al actualizar el asiento" });
                return;
            }

            // Actualizar UI y arrays locales
            if (isSelected) {
                seatEl.classList.remove("selected");
                seatEl.classList.add("free");
                selectedArr = selectedArr.filter(s => s.numero !== puesto.numero || s.ruta !== lineaData.ruta);
                if (state.isReturnSelected) state.selectedSeatsRegreso[state.currentSegmentIndex] = selectedArr;
                else state.selectedSeatsIda[state.currentSegmentIndex] = selectedArr;
            } else {
                seatEl.classList.remove("free");
                seatEl.classList.add("selected");
                selectedArr.push({
                    ...puesto,
                    empresa: lineaData.empresa,
                    fechaViaje: lineaData.fechaViaje,
                    ruta: lineaData.ruta,
                    hora: lineaData.hora,
                    codigoOrigen: lineaData.codigoOrigen,
                    codigoDestino: lineaData.codigoDestino,
                });
                if (state.isReturnSelected) state.selectedSeatsRegreso[state.currentSegmentIndex] = selectedArr;
                else state.selectedSeatsIda[state.currentSegmentIndex] = selectedArr;
            }

            if (!hasAnyIdaSeatSelection()) {
                state.timerExpiresAt = null;
            }

            // Persistir selección
            await saveStateToPouch();
            // Actualizar contadores
            const capacity = lineaData.capacidadBus || (document.querySelectorAll(".seat").length || 0);
            const taken = parseInt(DOM.seatsTaken?.textContent || "0", 10);
            updateSeatCounters(capacity, taken, selectedArr.length, computeTotalTripFare(state.viajeIda));
            validateSeatsUI();

            // Timer: arrancar si hay seleccionados, parar si no hay ninguno
            startTimerIfNeeded();
            stopTimerIfNeeded();

            //mostrar boton de resumen
            // document.getElementById('resumenCompra').classList.remove('d-none');
        } finally {
            isReservingSeat = false;
        }
    }

    // -----------------------
    // Render de segmento actual (asientos)
    // -----------------------
    async function getPuestoByapi(seg) {
        // Consumir API de puestos (misma URL que tenías)
        const url = `https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getPuestos?empresa=${encodeURIComponent(seg.empresa)}&origen=${encodeURIComponent(seg.codigoOrigen)}&destino=${encodeURIComponent(seg.codigoDestino)}&fechaViaje=${encodeURIComponent(seg.fechaViaje)}&ruta=${encodeURIComponent(seg.ruta)}&hora=${encodeURIComponent(seg.hora)}&ageContact=S`;
        const res = await fetch(await ebWithToken(url));
        const json = await res.json();
        const puestos = Array.isArray(json?.data) ? json.data : [];
        return puestos
    }
    async function loadSegment() {
        try {
            const viajeSeleccionado = state.isReturnSelected ? state.viajeRegreso : state.viajeIda
            const trayectoActual = viajeSeleccionado.lineas?.[state.currentSegmentIndex]?.data || null;
            // Título
            if (DOM.origenDestino) DOM.origenDestino.innerText = `${trayectoActual.descOrigen} | ${trayectoActual.descDestino}`;
            // UI base
            if (!DOM.layout) throw new Error("Elemento #seatLayout no encontrado en DOM.");
            DOM.layout.innerHTML = `<div class="bus-layout" aria-live="polite"></div>`;
            const busLayout = DOM.layout.querySelector(".bus-layout");

            const puestos = await getPuestoByapi(trayectoActual);

            // contadores
            const puestosSeleccionados = state.isReturnSelected ? state.selectedSeatsRegreso : state.selectedSeatsIda;
            const puestosSeleccionadosTrayecto = puestosSeleccionados && puestosSeleccionados.length > 0 ? puestosSeleccionados[state.currentSegmentIndex] : [];
            const ocupadosTotal = puestos.filter(p => p.estadoVenta === "O" && !puestosSeleccionadosTrayecto.some(ps => ps.numero == p.numero)).length;

            const libresTotal = puestos.length - ocupadosTotal;
            updateSeatCounters(puestos.length, ocupadosTotal, puestosSeleccionadosTrayecto.length || 0);

            // Conductor (row fija)
            const driverRow = document.createElement("div");
            driverRow.className = "row-seat";
            const driver = document.createElement("img");
            driver.className = "img-driver";
            driver.src = LOGOS[trayectoActual.empresa];
            driverRow.appendChild(driver);
            busLayout.appendChild(driverRow);

            // Construcción helper para asiento
            function buildSeatNode(puesto) {
                const seat = document.createElement("div");
                if (!puesto) {
                    seat.className = "seat empty";
                    return seat;
                }
                seat.textContent = puesto.numero;
                seat.className = `seat ${puesto.ubicacion ? puesto.ubicacion.toLowerCase() : ''}`;

                // Determinar si está seleccionado localmente (coincidencias por numero y ruta)
                const todosPuestosSeleccionados = state.isReturnSelected ? state.selectedSeatsRegreso : state.selectedSeatsIda
                const selectedArr = todosPuestosSeleccionados && todosPuestosSeleccionados.length > 0 ? todosPuestosSeleccionados[state.currentSegmentIndex] : [];
                const isSelected = selectedArr.some(s => s.numero == puesto.numero && s.ruta == puesto.ruta);

                if (isSelected)
                    seat.classList.add("selected")
                else if (puesto.estadoVenta === "O" && !isSelected)
                    seat.classList.add("taken");
                else
                    seat.classList.add("free");

                // Click handler
                if (isSelected || puesto.estadoVenta !== "O")
                    seat.addEventListener("click", () => toggleSeatApi(seat, puesto, trayectoActual));
                return seat;
            }

            // Agrupar por fila: IV#, IP#, DV#, DP#
            const filas = {};
            puestos.forEach(p => {
                const match = (p.ubicacion || "").match(/\d+/);
                const filaIndex = match ? parseInt(match[0], 10) : 0;
                if (!filas[filaIndex]) filas[filaIndex] = {};
                const key = (p.ubicacion || "").toUpperCase();
                if (key.startsWith("IV")) filas[filaIndex].iv = p;
                if (key.startsWith("IP")) filas[filaIndex].ip = p;
                if (key.startsWith("DV")) filas[filaIndex].dv = p;
                if (key.startsWith("DP")) filas[filaIndex].dp = p;
            });

            // Ordenar filas y renderizar
            Object.keys(filas).sort((a, b) => a - b).forEach(idx => {
                const row = document.createElement("div");
                row.className = "row-seat";
                const f = filas[idx] || {};
                row.appendChild(buildSeatNode(f.iv));
                row.appendChild(buildSeatNode(f.ip));
                const pasillo = document.createElement("div");
                pasillo.className = "seat pasillo";
                row.appendChild(pasillo);
                row.appendChild(buildSeatNode(f.dp));
                row.appendChild(buildSeatNode(f.dv));
                busLayout.appendChild(row);
            });

            // Botones: mostrar/ocultar según segmento
            if (DOM.lastStepBtn && DOM.lastRouteBtn && DOM.selectLinesBtn && DOM.nextRouteBtn) {
                if (state.totalSegments === 1 || state.currentSegmentIndex === 0) {
                    DOM.lastStepBtn.style.display = "block";
                    DOM.lastRouteBtn.style.display = "none";
                } else {
                    DOM.lastStepBtn.style.display = "none";
                    DOM.lastRouteBtn.style.display = "block";
                }

                if (state.currentSegmentIndex === state.totalSegments - 1) {
                    DOM.selectLinesBtn.style.display = "block";
                    DOM.nextRouteBtn.style.display = "none";
                } else {
                    DOM.nextRouteBtn.style.display = "block";
                    DOM.selectLinesBtn.style.display = "none";
                }
            }

            // Validaciones y binding de botones (asegurando no duplicar listeners)
            if (DOM.nextRouteBtn) {
                DOM.nextRouteBtn.replaceWith(DOM.nextRouteBtn.cloneNode(true));
                DOM.nextRouteBtn = document.getElementById("nextRoute");
            }
            if (DOM.lastRouteBtn) {
                DOM.lastRouteBtn.replaceWith(DOM.lastRouteBtn.cloneNode(true));
                DOM.lastRouteBtn = document.getElementById("lastRoute");
            }
            if (DOM.selectLinesBtn) {
                DOM.selectLinesBtn.replaceWith(DOM.selectLinesBtn.cloneNode(true));
                DOM.selectLinesBtn = document.getElementById("selectLines");
            }

            if (DOM.nextRouteBtn) DOM.nextRouteBtn.addEventListener("click", onConfirmSegment);
            if (DOM.lastRouteBtn) DOM.lastRouteBtn.addEventListener("click", () => clearAllSeats(false));
            if (DOM.selectLinesBtn) DOM.selectLinesBtn.addEventListener("click", onConfirmSegment);

            // validar asientos inicial (por si ya hay selecciones previas)
            validateSeatsUI();

            // iniciar timer en caso de que haya asientos seleccionados
            startTimerIfNeeded();
            return puestos;
        } catch (err) {
            console.error("Error al cargar segmento:", err);
            Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los asientos." });
            return [];
        }
    }

    // -----------------------
    // Render de resumen (compra)
    // -----------------------
    function renderResumen() {
        const numPasajeros = state.selectedSeatsIda[0].length;

        const resumenPasajeros = document.getElementById("resumenPasajeros");
        const resumenIda = document
            .getElementById("resumenIda")
            .querySelector(".resumen-detalle");
        const resumenRegresoCard = document.getElementById("resumenRegreso");
        const resumenRegreso = resumenRegresoCard.querySelector(".resumen-detalle");
        const resumenTotales = document.getElementById("totalGeneral");

        // Pasajeros
        resumenPasajeros.innerHTML = `
      <div class="col-12 text-center">
        <p class=h6 mb-0">${state.origen} - ${state.destino}</p>
        <p class="h6 mb-0"><strong>${numPasajeros}</strong> ${numPasajeros === 1 ? "Pasajero" : "Pasajeros"
            }</p>
      </div>
    `;

        // Viaje de Ida
        const totalesIda = calcularTotales(state.viajeIda.lineas);

        resumenIda.innerHTML = `
        <p><span>Costo unitario</span><span>$${(totalesIda.base / state.selectedSeatsIda[0].length).toLocaleString()}</span></p>
        <p><span>Costo base</span><span>$${totalesIda.base.toLocaleString()}</span></p>
        <p><span>Descuentos</span><span class="text-success">- $${totalesIda.descuentos.toLocaleString()}</span></p>
        <p><span>Adicionales</span><span>$${totalesIda.adicionales.toLocaleString()}</span></p>
        <hr>
        <p class="font-weight-bold"><span>Total ida</span><span>$${totalesIda.total.toLocaleString()}</span></p>
    `;
        // Viaje de Regreso (si aplica)
        let totalesRegreso = { total: 0 };
        if (state.fechaRegreso && state.selectedSeatsRegreso.length > 0) {
            resumenRegresoCard.classList.remove("d-none");
            totalesRegreso = calcularTotales(state.viajeRegreso.lineas);
            resumenRegreso.innerHTML = `
            <p><span>Costo unitario</span><span>$${(totalesRegreso.base / state.selectedSeatsIda[0].length).toLocaleString()}</span></p>
            <p><span>Costo base</span><span>$${totalesRegreso.base.toLocaleString()}</span></p>
            <p><span>Descuentos</span><span class="text-success">- $${totalesRegreso.descuentos.toLocaleString()}</span></p>
            <p><span>Adicionales</span><span>$${totalesRegreso.adicionales.toLocaleString()}</span></p>
            <hr>
            <p class="font-weight-bold"><span>Total regreso</span><span>$${totalesRegreso.total.toLocaleString()}</span></p>
        `;
        } else {
            resumenRegresoCard.classList.add("d-none");
        }
        // Totales Generales
        const totalGeneral = totalesIda.total + totalesRegreso.total;
        resumenTotales.textContent = totalGeneral.toLocaleString();
    }

    function calcularTotales(lineas) {
        let base = 0,
            descuentos = 0,
            adicionales = 0,
            valorIva = 0,
            valorImpuestos = 0;
        const numPasajeros = state.numPasajeros || state.selectedSeatsIda?.[0]?.length || 0;
        lineas.forEach((l) => {
            const t = l.data.tarifa;
            const tarifaBase = t.valorTarifa || 0;

            // Base
            base += tarifaBase * numPasajeros;

            // Descuentos
            if (ROL) {
                const desc =
                    ((tarifaBase * (t[ROLES[ROL].porcentajeDescuento] || 0)) / 100) *
                    numPasajeros;
                descuentos += desc;
            }

            // Adicionales (estampilla + impuestos)
            const iva = ((tarifaBase * (t.porcentajeIva || 0)) / 100) * numPasajeros;
            valorIva += iva;
            const imp =
                ((tarifaBase * (t.porcentajeImpuesto || 0)) / 100) * numPasajeros;
            valorImpuestos += imp;
            const estampilla = (t.valorEstampilla || 0) * numPasajeros;
            adicionales += iva + imp + estampilla;
        });

        const total = base - descuentos + adicionales;
        document.getElementById("total-costo").innerHTML = `$${total.toLocaleString()}`;
        return { base, descuentos, adicionales, total, valorIva, valorImpuestos };
    }

    // -----------------------
    // Confirmación de segmento
    // -----------------------
    async function onConfirmSegment() {
        // Asegurarse de que haya seleccionados en este segmento
        const selectedThisSegment = (state.isReturnSelected ? state.selectedSeatsRegreso : state.selectedSeatsIda)?.[state.currentSegmentIndex]?.length || 0;
        if (selectedThisSegment === 0) {
            return Swal.fire({ title: "Selecciona al menos un asiento", text: "Debes elegir tus puestos para continuar.", icon: "warning" });
        }
        //validar el minimo de puestos para los demas segmentos
        if (selectedThisSegment != state.minSeats && (state.currentSegmentIndex != 0 || state.isReturnSelected)) {
            return Swal.fire({ title: "Selecciona los asientos", text: "Debes seleccionar " + state.minSeats + " asientos para continuar.", icon: "warning" });
        }
        // definir el minimo de puestos para los demas segmentos
        state.minSeats = selectedThisSegment;
        state.cantidadPasajeros = selectedThisSegment;
        // Si hay más segmentos, avanzar
        // if (state.currentSegmentIndex < state.totalSegments - 1) {
        //     state.currentSegmentIndex++;
        //     saveStateToPouch();
        //     await loadSegment();
        //     return;
        // }
        if (state.currentSegmentIndex < state.totalSegments - 1) {

            const previousSeats = (state.isReturnSelected
                ? state.selectedSeatsRegreso
                : state.selectedSeatsIda)[state.currentSegmentIndex];
            state.currentSegmentIndex++;
            const trayectoActual = (state.isReturnSelected ? state.viajeRegreso : state.viajeIda)?.lineas?.[state.currentSegmentIndex]?.data || null
            const puestos = await getPuestoByapi(trayectoActual); // carga siguiente segmento

            const result = tryAutoAssignSeats(puestos, previousSeats, trayectoActual);
            if (result.success) {
                let nameFunction = "marcarPuesto";
                const lappizFunctionId = "1f91634e-a75c-403c-a074-66ee070526e5";
                const config = { nameFunction, lappizFunctionId, method: "POST" };
                result.seats.map((puesto) => {
                    execToggleSeatApi(puesto, trayectoActual, config);
                })
                if (state.isReturnSelected) {
                    state.selectedSeatsRegreso[state.currentSegmentIndex] = result.seats;
                } else {
                    state.selectedSeatsIda[state.currentSegmentIndex] = result.seats;
                }

                await saveStateToPouch();

                // UX opcional
                Swal.fire({
                    icon: "success",
                    title: "Asientos asignados automáticamente",
                    text: `Se conservaron los mismos asientos en el trayecto. ${trayectoActual.descOrigen} | ${trayectoActual.descOrigen}`,
                    timer: 1500,
                    showConfirmButton: false
                });
                onConfirmSegment();
                return;
            } else {
                await loadSegment();
                return;
            }
        }

        // Último segmento: si hay fecha regreso y no hay viaje regreso seleccionado y hay lineas para cargar, cargar regreso
        if (!state.isReturnSelected && !state.viajeRegreso && state.fechaRegreso && state.successLoadLinesReturn.length > 0) {
            // Marcar que ahora seleccionaremos regreso
            state.isReturnSelected = true;
            await saveStateToPouch();
            // cargar segmento 0 del regreso
            state.currentSegmentIndex = 0;
            state.totalSegments = 1; // solo un segmento, aun no se a escogido la linea de regreso.
            //await loadSegment();
            goLocation('#/page/lineas/ExpresoBrasilia_Lappiz');
            return;
        }
        await saveStateToPouch();
        const valorCompra = ebValorCompra();
        await ebActualizarCompra({
            estado: "PP",
            estadoProceso: "PT",
            valorCompra: valorCompra || undefined
        });
        goLocation('#/page/pasajeros/ExpresoBrasilia_Lappiz');
        // Swal.fire({ title: "Éxito", text: "Has seleccionado tus asientos en todos los trayectos.", icon: "success" });
    }

    function tryAutoAssignSeats(nextSegmentSeats, selectedSeats, trayectoActual) {
        // nextSegmentSeats: asientos disponibles del siguiente segmento
        // selectedSeats: asientos elegidos en el segmento anterior

        const availableSeatNumbers = new Set(
            nextSegmentSeats
                .filter(s => s.estadoVenta !== "O") // ajusta según tu modelo
                .map(s => String(s.numero))
        );

        const allAvailable = selectedSeats.every(s =>
            availableSeatNumbers.has(String(s.numero))
        );

        if (!allAvailable) {
            return {
                success: false,
                seats: []
            };
        }

        // Mapear los asientos reales del siguiente segmento
        const autoSelected = nextSegmentSeats.filter(s =>
            selectedSeats.some(sel => String(sel.numero) === String(s.numero))
        ).map(s => {
            s.codigoDestino = trayectoActual.codigoDestino;
            s.codigoOrigen = trayectoActual.codigoOrigen;
            s.empresa = trayectoActual.empresa;
            s.fechaViaje = trayectoActual.fechaViaje;
            s.hora = trayectoActual.hora;
            s.ruta = trayectoActual.ruta;
            return s;
        });

        return {
            success: true,
            seats: autoSelected
        };
    }

    // -----------------------
    // Event listeners para limpiar / volver
    // -----------------------
    if (DOM.clearSeatsBtn) {
        DOM.clearSeatsBtn.addEventListener("click", () => clearAllSeats(false));
    }
    if (DOM.lastStepBtn) {
        DOM.lastStepBtn.addEventListener("click", () => {
            clearAllSeats(true);
            goLocation('#/page/lineas/ExpresoBrasilia_Lappiz');
        });
    }

    // -----------------------
    // Inicializar UI
    // -----------------------
    // Coloca timer en 10:00 por defecto en caso de que exista el nodo
    if (DOM.timerValue) DOM.timerValue.textContent = "10:00";

    $("#resumenModal").on("show.bs.modal", () => {
        renderResumen();
    });
    await loadSegment();
    setTimeout(() => {
        $("#resumenCompra").click(() => {
            $("#resumenModal").modal("show");
        });
    }, 1000);
})();
