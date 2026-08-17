console.log("PASO 1: Inicio de compra. Seleccion de origen y destino.");
(async () => {
    // ---------------------------
    // Config y servicios
    // ---------------------------
    await G_addHeaderPages();
    const pouchService = new G_PouchService();
    const compraActiva = await pouchService.obtenerCompraActiva();
    if (!compraActiva) await pouchService.limpiarExpiradas();
    let isDefaultDate = true;

    const { origen: initialOrigen, destino: initialDestino, fechaIda, fechaRegreso } = compraActiva || {};

    const API = {
        origenes: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getOrigenes?empresa=EC",
        destinos: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getDestinos?empresa=EC&origen=",
        vigencia: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/vigenciaVenta"
    };

    // ---------------------------
    // Utilidades pequeñas (Clean)
    // ---------------------------
    const formatDateISO = d => {
        const date = new Date(d);
        return date.toISOString().slice(0, 10);
    };

    const parseDMY = str => {
        const [d, m, y] = str.split("/").map(Number);
        return new Date(y, m - 1, d);
    };

    const parseDateTime = (fecha, hora) => {
        const h = hora.replace(/(\d{2})(\d{2})/, "$1:$2");
        return new Date(`${fecha}T${h}:00`);
    };

    const swal = (title = "", text = "", icon = "info") => Swal.fire({ title, text, icon });

    const markComboInvalid = (combo, invalid, msg = "Campo requerido") => {
        if (!combo) return;
        combo.input.toggleClass("is-invalid", invalid);
        combo.input.toggleClass("is-valid", !invalid);
        const fb = combo.input.next(".invalid-feedback");
        if (invalid) {
            if (!fb.length) combo.input.after(`<div class="invalid-feedback">${msg}</div>`);
            else fb.text(msg);
        } else {
            fb.remove();
        }
    };

    function waitDataSourceChange(dataSource) {
        // Devuelve una promesa que se resuelve la próxima vez que el DataSource dispare "change".
        return new Promise(resolve => {
            const onChange = () => {
                dataSource.unbind("change", onChange);
                resolve();
            };
            dataSource.bind("change", onChange);
        });
    }

    // ---------------------------
    // Verificación vigencia venta (sin alterar)
    // ---------------------------
    async function checkVentaVigente(empresa, origen, destino) {
        try {
            const response = await fetch(`${API.vigencia}?empresa=${empresa}&origen=${origen}&destino=${destino}`);
            const result = await response.json();
            if (result.error || !result.data) return false;

            const maxDaysCalendar = +result.data;
            const datePicker = kendo.jQuery("#datePicker").data("kendoDatePicker");
            const returnDatePicker = kendo.jQuery("#returnDatePicker").data("kendoDatePicker");

            const maxDate = maxDaysCalendar
                ? formatDateISO(new Date(Date.now() + maxDaysCalendar * 24 * 60 * 60 * 1000))
                : null;

            datePicker.max(maxDate);
            returnDatePicker.max(maxDate);

            return true;
        } catch (err) {
            console.error("Error verificando vigencia venta:", err);
            return false;
        }
    }

    // ---------------------------
    // Document ready → UI init
    // ---------------------------
    kendo.jQuery(document).ready(async () => {
        document.getElementById('resumenCompra').classList.add('d-none');
        const btnNextStep1 = document.getElementById("searchRoutes");
        // ---------------------------
        // DataSources
        // ---------------------------
        const origenesDS = new kendo.data.DataSource({
            transport: {
                read: { url: API.origenes, dataType: "json" }
            },
            schema: { parse: res => (res && res.data ? res.data : []) }
        });

        const destinosDS = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    const origenVal = originCombo.value();
                    if (!origenVal) {
                        options.success([]);
                        return;
                    }
                    kendo.jQuery.ajax({
                        url: API.destinos + encodeURIComponent(origenVal),
                        dataType: "json",
                        success: function (resp) {
                            options.success(resp.data || []);
                        },
                        error: function (err) {
                            options.error(err);
                        }
                    });
                }
            }
        });

        // ---------------------------
        // Combo Origen
        // ---------------------------
        kendo.jQuery("#origin").kendoComboBox({
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: origenesDS,
            filter: "contains",
            placeholder: "Selecciona origen...",
            minLength: 1,
            autoBind: true,
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true
        });
        const originCombo = kendo.jQuery("#origin").data("kendoComboBox");

        // ---------------------------
        // Combo Destino
        // ---------------------------
        kendo.jQuery("#destination").kendoComboBox({
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: destinosDS,
            filter: "contains",
            placeholder: "Selecciona destino...",
            minLength: 1,
            autoBind: false, // importante: no autoBind para que no intente cargar sin origen
            noDataTemplate: "No hay coincidencias",
            highlightFirst: true
        });
        const destCombo = kendo.jQuery("#destination").data("kendoComboBox");

        // ---------------------------
        // Helper para actualizar estado del botón
        // ---------------------------
        const allowContinueStep2 = () => !!(originCombo.value() && destCombo.value() && (isDefaultDate || kendo.jQuery("#datePicker").data("kendoDatePicker").value()));
        const updateSearchButton = () => { btnNextStep1.disabled = !allowContinueStep2(); };

        // ---------------------------
        // Eventos de combos
        // ---------------------------
        originCombo.bind("select", async () => {
            // cuando cambie el origen: limpiar destino, forzar lectura y actualizar botón
            destCombo.value("");
            destCombo.text("");
            if (originCombo.value()) {
                // Forzamos lectura del DataSource destinos y esperamos a que cargue
                const wait = waitDataSourceChange(destinosDS);
                destinosDS.read();
                await wait;
            } else {
                destinosDS.data([]);
            }
            setTimeout(() => updateSearchButton(), 100);
        });

        destCombo.bind("select", async () => {
            const destVal = destCombo.value();
            if (destVal) {
                const vigente = await checkVentaVigente("EC", originCombo.value() || "", destVal || "");
                if (!vigente) {
                    Swal.fire({ text: "No hay venta vigente para la ruta seleccionada.", title: "!Upps", icon: "warning" });
                }
            }
            if (returnDatePicker.value()) {
                const vigente = await checkVentaVigente("EC", destVal || "", originCombo.value() || "");
                if (!vigente) {
                    Swal.fire({ text: "No hay venta vigente para la ruta de regreso.", title: "!Upps", icon: "warning" });
                }
            }
            setTimeout(() => updateSearchButton(), 100);
        });

        // ---------------------------
        // Swap button
        // ---------------------------
        kendo.jQuery("#swapBtn").on("click", async () => {
            const oVal = originCombo.value();
            const dVal = destCombo.value();
            originCombo.value(dVal);
            destCombo.value(oVal);

            // si se cambió origen, recargar destinos apropiadamente
            if (originCombo.value()) {
                await readAndWait(destinosDS);
            }
            if (originCombo.value() && destCombo.value()) {
                const vigente = await checkVentaVigente("EC", originCombo.value() || "", destCombo.value() || "");
                if (!vigente) {
                    Swal.fire({ text: "No hay venta vigente para la ruta seleccionada.", title: "!Upps", icon: "warning" });
                    originCombo.value(oVal);
                    destCombo.value(dVal);
                }
            }
            originCombo.input.removeClass("is-invalid is-valid");
            destCombo.input.removeClass("is-invalid is-valid");
            updateSearchButton();
        });

        // ---------------------------
        // DatePickers (sin cambiar validación)
        // ---------------------------
        kendo.jQuery("#datePicker").kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(),
            value: new Date(),
            adaptiveMode: "auto",
            inputMode: "numeric"
        });
        const datePicker = kendo.jQuery("#datePicker").data("kendoDatePicker");

        kendo.jQuery("#returnDatePicker").kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date(),
            adaptiveMode: "auto",
            inputMode: "numeric"
        });
        const returnDatePicker = kendo.jQuery("#returnDatePicker").data("kendoDatePicker");

        // Opciones rápidas (hoy / mañana / otra)
        kendo.jQuery("#dateOptions .date-option").on("click", function () {
            const val = kendo.jQuery(this).data("val");
            kendo.jQuery("#dateOptions .date-option").removeClass("active btn-primary").addClass("btn-outline-primary");
            kendo.jQuery(this).removeClass("btn-outline-primary").addClass("active btn-primary");

            if (val === "today") {
                const d = new Date();
                datePicker.value(d);
                returnDatePicker.min(formatDateISO(d));
                datePicker.enable(false);
            } else if (val === "tomorrow") {
                isDefaultDate = false;
                const d = new Date();
                d.setDate(d.getDate() + 1);
                datePicker.value(d);
                returnDatePicker.min(formatDateISO(d));
                datePicker.enable(false);
            } else {
                isDefaultDate = false;
                datePicker.enable(true);
                datePicker.open();
            }
            updateSearchButton();
        });
        kendo.jQuery('#dateOptions .date-option[data-val="today"]').trigger("click");

        // Validaciones cambio fecha (manteniendo comportamiento)
        kendo.jQuery("#datePicker").on("change", async function () {
            const today = new Date(); today.setHours(0, 0, 0, 0);
            if (!isValidDateDMY(this.value, today)) {
                datePicker.value(null);
                this.value = "";
                kendo.jQuery("#returnGroup").hide(250);
                updateSearchButton();
                return;
            }

            const inputDate = parseDMY(this.value);
            datePicker.value(inputDate);

            kendo.jQuery("#returnGroup").show(250);
            returnDatePicker.min(formatDateISO(inputDate));

            const ret = returnDatePicker.value();
            if (ret && ret < inputDate) {
                const next = new Date(inputDate); next.setDate(next.getDate() + 1);
                returnDatePicker.value(next);
            }
            const vigente = await checkVentaVigente("EC", originCombo.value() || "", destCombo.value() || "");
            if (!vigente) {
                Swal.fire({ text: "No hay venta vigente para la ruta de regreso.", title: "!Upps", icon: "warning" });
            }

            updateSearchButton();
        });

        kendo.jQuery("#returnDatePicker").on("change", async function () {
            if (!isValidDateDMY(this.value, datePicker.value())) {
                returnDatePicker.value(null);
                this.value = "";
                return;
            }
            returnDatePicker.value(parseDMY(this.value));
            const vigente = await checkVentaVigente("EC", destCombo.value() || "", originCombo.value() || "");
            if (!vigente) {
                Swal.fire({ text: "No hay venta vigente para la ruta de regreso.", title: "!Upps", icon: "warning" });
            }
        });

        // ---------------------------
        // Validación auxiliar (mismos checks)
        // ---------------------------
        function isValidDateDMY(dateStr, minDate) {
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            if (!regex.test(dateStr)) { swal("Fecha inválida", "Por favor ingresa una fecha válida.", "error"); return false; }

            const [day, month, year] = dateStr.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            const valid = (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day);
            if (!valid) { swal("Fecha inválida", "Por favor ingresa una fecha válida.", "error"); return false; }
            if (date < minDate) { swal("Fecha inválida", "Por favor ingresa una fecha válida.", "error"); return false; }
            return true;
        }

        // ---------------------------
        // Acción buscar rutas (idéntica lógica)
        // ---------------------------
        async function validateStep1() {
            btnNextStep1.disabled = true;
            const originVal = originCombo.value();
            const destVal = destCombo.value();
            const selectedDate = datePicker.value();
            const returnDate = returnDatePicker.value();

            let valid = true;
            if (!originVal) { markComboInvalid(originCombo, true, "Origen es requerido"); valid = false; } else markComboInvalid(originCombo, false);
            if (!destVal) { markComboInvalid(destCombo, true, "Destino es requerido"); valid = false; } else markComboInvalid(destCombo, false);

            if (originVal && destVal && originVal === destVal) {
                markComboInvalid(originCombo, true, "Origen y destino no pueden ser iguales");
                markComboInvalid(destCombo, true, "Origen y destino no pueden ser iguales");
                valid = false;
            }

            if (!selectedDate) { Swal.fire({ text: "Seleccione la fecha de viaje", icon: "info" }); valid = false; }

            if (!valid) { btnNextStep1.disabled = true; return; }

            const payload = {
                origen: originVal,
                destino: destVal,
                fechaIda: formatDateISO(selectedDate),
                fechaRegreso: returnDate ? formatDateISO(returnDate) : null,
                isReturnSelected: false,
                selectedSeatsRegreso: [],
                selectedSeatsIda: [],
                currentSegmentIndex: 0,
                totalSegments: 1,
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
            }

            console.log("Buscar rutas con:", payload);
            const successLoadLines = await getLines(paramsOutward);
            const successLoadLinesReturn = payload.fechaRegreso ? await getLines(paramsReturn) : [];
            const validReturn = !!payload.fechaRegreso && successLoadLinesReturn.length > 0;
            if (successLoadLines && successLoadLines.length > 0) {
                if (payload.fechaRegreso && !validReturn) {
                    Swal.fire({ title: "Upss!", text: "No se encontrarón viajes disponibles para el regreso", icon: "error" });
                    return;
                }
                pouchService.guardarCompra({ ...payload, successLoadLines, successLoadLinesReturn });
                goLocation('#/page/lineas/ExpresoBrasilia_Lappiz');
            } else {
                Swal.fire({ title: "Upss!", text: "No se encontrarón viajes disponibles para este destino", icon: "error" });
            }
        }
        btnNextStep1.addEventListener("click", validateStep1);

        // ---------------------------
        // Carga inicial de orígenes y asignación de valores iniciales (FIX)
        // ---------------------------
        // PASOS:
        // 1) leer origenesDS, esperar que cargue
        // 2) si hay initialOrigen -> setearlo en originCombo
        // 3) si hay initialDestino -> forzar read() de destinosDS y esperar a que cargue, luego asignar valor a destCombo
        // 4) actualizar botón de búsqueda

        // helper que lee y espera el cambio
        function readAndWait(ds) {
            const p = waitDataSourceChange(ds);
            ds.read();
            return p;
        }

        // Ejecutar carga inicial y asignaciones seguras
        await readAndWait(origenesDS);          // carga orígenes primero
        if (initialOrigen) {
            originCombo.value(initialOrigen);
            // disparar select manualmente para que recargue destinos (si tu app depende de ese evento)
            originCombo.trigger("select");
        }
        // Si tenemos initialDestino necesitamos esperar a que destinosDS cargue para setear el texto
        if (initialDestino) {
            // forzamos lectura de destinos (el transporte usa originCombo.value())
            await readAndWait(destinosDS);
            // ahora sí asignamos el value al combo destino: como data ya está, Kendo mostrará texto
            destCombo.value(initialDestino);
        }

        updateSearchButton();
        if (datePicker.value()) {
            datePicker.trigger("change");
        }
    }); // document.ready

    // ---------------------------
    // Funciones de línea / filtrado (idénticas)
    // ---------------------------
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
            currentLinea.lineas.some(currentTrayecto => !(currentTrayecto.error || currentTrayecto.data.puestosDisponibles == 0))
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
})();