debugger;
let countdownInterval = null;
let timeLeft = 10 * 60; // 10 minutos en segundos
// Util: carga dinámica de scripts con Promise
function loadScriptAsync(src) {
    return new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = function () { resolve(src); };
        s.onerror = function (e) { reject(new Error('Error loading ' + src)); };
        document.head.appendChild(s);
    });
}

(function initKendoDatePickerInSpanish() {
    // Rutas CDN (ajusta versión si necesitas)
    var cultureUrl = 'https://kendo.cdn.telerik.com/2025.3.1002/js/cultures/kendo.culture.es-CO.min.js';
    var messagesUrl = 'https://kendo.cdn.telerik.com/2025.3.1002/js/messages/kendo.messages.es-ES.min.js';

    // 1) Cargar cultura y aplicar
    loadScriptAsync(cultureUrl)
        .then(function () {
            // Aplica la cultura cargada
            try {
                kendo.culture('es-CO');
            } catch (e) {
                console.warn('kendo.culture failed after loading script:', e);
            }

            // Verificar que la cultura actual sea la esperada
            try {
                console.log('Kendo culture current:', kendo.cultures && kendo.cultures.current && kendo.cultures.current.name);
            } catch (e) { }

            // 2) Cargar mensajes (opcional, para labels como "Hoy")
            return loadScriptAsync(messagesUrl).catch(function (err) {
                // no crítico — continuamos aunque falle
                console.warn('No se cargaron kendo messages:', err);
            });
        })
        .catch(function (err) {
            console.warn('Fallo cargando cultura es-CO desde CDN:', err);
            // fallback: definir una cultura mínima localmente
            fallbackDefineEsCO();
            try { kendo.culture('es-CO'); } catch (e) { console.warn(e); }
            return loadScriptAsync(messagesUrl).catch(function (err2) {
                console.warn('No se cargaron kendo messages (fallback):', err2);
            });
        })

    // Fallback: definición mínima de la cultura es-CO (suficiente para mostrar meses/días y formato)
    function fallbackDefineEsCO() {
        if (kendo && kendo.cultures && !kendo.cultures["es-CO"]) {
            kendo.cultures["es-CO"] = {
                name: "es-CO",
                calendars: {
                    standard: {
                        days: {
                            names: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                            namesAbbr: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
                            namesShort: ["do", "lu", "ma", "mi", "ju", "vi", "sá"]
                        },
                        months: {
                            names: [
                                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
                            ],
                            namesAbbr: [
                                "ene", "feb", "mar", "abr", "may", "jun",
                                "jul", "ago", "sep", "oct", "nov", "dic"
                            ]
                        },
                        patterns: {
                            d: "dd/MM/yyyy",
                            D: "dddd, d 'de' MMMM 'de' yyyy"
                        },
                        firstDay: 1 // lunes como primer día de la semana, opcional
                    }
                }
            };
            console.info('Fallback es-CO culture definida localmente.');
        }
    }

})();
//#region VARIABLES Y CONSTANTES GLOBALES
const logos = {
    EC: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/brasilia.svg",
    UN: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/unitransco.svg",
    EA: "https://testportalapp.expresobrasilia.com/venta-arauca/browser/assets/img/arauca.svg",
};

let payloadGlobal = {}; // para compartir datos entre pasos
const ROLES = {
    12: { porcentajeDescuento: "porcentajeDescAuxiliar" },
    22: { porcentajeDescuento: "porcentajeDescDirector" },
    23: { porcentajeDescuento: "porcentajeDescEspecial" },
};
const ROL = sessionStorage.roleId || "";
let titularEsPasajero = false;
const numberSteps = {
    Inicio: 1,
    ViajesIdaRegreso: 2,
    AsientosIdaRegreso: 3,
    Pasajeros: 4,
    TitularEsPasajero: 5,
    InformacionTitular: 6,
    TitularPasajero: 7,
    ServicioTraslado: 8,
    InformacionTraslado: 9,
    MetodoPago: 10,
    ResumenPago: 11,
    ProcesarPago: 12,
};
let currentStep = numberSteps.Inicio;
let lastStep = numberSteps.Inicio;
const origenesEndpoint =
    "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getOrigenes?empresa=EC";
const destinosEndpoint =
    "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getDestinos?empresa=EC&origen=";
const vigenciaVentaEndpoint =
    "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/vigenciaVenta";
const tiposIdentificacionEndpoint =
    "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacion?empresa=EC&pais=";
const tiposIdentificacionTitularEndpoint =
    "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacionTitular?empresa=EC&portal=S&titular=S";
let currentTripType = "ida"; // "ida" o "regreso"

let selectedSeats = [];
let selectedSeatsIda = [];
let selectedSeatsRegreso = [];
let allLinesOutward = []; // Rutas de ida
let allLinesReturn = []; // Rutas de regreso

let totalSegments = 0;
let globalLineData = {};
let currentSegmentIndex = 0;
let minAvailableSeats = 0;
//#endregion VARIABLES Y CONSTANTES GLOBALES

//#region: FUNCIONES GENERALES
function getAge(birthDate) {
    if (!birthDate) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function showStep(step) {
    document
        .querySelectorAll(".step")
        .forEach((s) => s.classList.remove("active"));
    const newStep = document.getElementById("step" + step);
    newStep.classList.add("active");
    lastStep = currentStep;
    currentStep = step;
    // Lanzar evento personalizado para inicializar dinámicamente
    const event = new Event("showStep");
    newStep.dispatchEvent(event);
}

function getDurationMinutes(line) {
    const salida = toMinutes(line.horaSalida);
    const llegada = toMinutes(line.horaLlegada);
    let dur = llegada - salida;
    if (dur < 0) dur += 24 * 60; // cruza medianoche
    return dur;
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

function toMinutes(horaStr) {
    const { hours, minutes } = parseHora(horaStr);
    return hours * 60 + minutes;
}

function getTimeSlot(horaStr) {
    const { hours } = parseHora(horaStr);

    if (hours >= 7 && hours < 12) return "morning"; // Mañana
    if (hours >= 12 && hours < 19) return "afternoon"; // Tarde
    if (hours >= 19 && hours <= 23) return "night"; // Noche
    return "dawn"; // Madrugada
}

function parseHora(horaStr) {
    // Convierte "0415" en {hours: 4, minutes: 15}
    return {
        hours: parseInt(horaStr.substring(0, 2), 10),
        minutes: parseInt(horaStr.substring(2), 10),
    };
}

function formatTime12h(hhmm) {
    if (!hhmm) return "";
    const h = parseInt(hhmm.substring(0, 2), 10);
    const m = hhmm.substring(2);
    const d = new Date();
    d.setHours(h);
    d.setMinutes(parseInt(m, 10));
    return d.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function formatDateISO(d) {
    const iso = new Date(d);
    const y = iso.getFullYear();
    const m = String(iso.getMonth() + 1).padStart(2, "0");
    const day = String(iso.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

// helper: fecha+hora -> Date
function toDateTime(fecha, hhmm) {
    const { hours, minutes } = parseHora(hhmm);
    const [year, month, day] = fecha.split("-").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

document.querySelectorAll(".next").forEach((btn) => {
    btn.addEventListener("click", () => showStep(currentStep + 1));
});

document.querySelectorAll(".prev").forEach((btn) => {
    btn.addEventListener("click", () => showStep(currentStep - 1));
});

//#endregion FUNCIONES GENERALES FIN

//#region PASO 1: Solicitud de origen - destino - fechas
// ---------- Inicialización Kendo ----------
kendo.jQuery(document).ready(function () {
    // --- DataSource para origen ---
    const btnNextStep1 = document.getElementById("searchRoutes");
    const origenesDS = new kendo.data.DataSource({
        transport: {
            read: {
                url: origenesEndpoint,
                dataType: "json",
            },
        },
        schema: {
            parse: function (response) {
                return response && response.data ? response.data : [];
            },
        },
    });

    // --- DataSource para destino (dinámico según origen) ---
    const destinosDS = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                const origenVal = originCombo.value();
                if (!origenVal) {
                    options.success([]);
                    return;
                }
                kendo.jQuery.ajax({
                    url: destinosEndpoint + encodeURIComponent(origenVal),
                    dataType: "json",
                    success: function (resp) {
                        options.success(resp.data || []);
                    },
                    error: function (err) {
                        options.error(err);
                    },
                });
            },
        },
    });

    // Inicializar ComboBox Origen
    kendo.jQuery("#origin").kendoComboBox({
        dataTextField: "descripcion",
        dataValueField: "codigo",
        dataSource: origenesDS,
        filter: "contains",
        //suggest: true,
        placeholder: "Selecciona origen...",
        minLength: 1,
        autoBind: true,
        noDataTemplate: "No hay coincidencias",
        highlightFirst: true,
    });

    const originCombo = kendo.jQuery("#origin").data("kendoComboBox");

    // Inicializar ComboBox Destino (sin datos iniciales)
    kendo.jQuery("#destination").kendoComboBox({
        dataTextField: "descripcion",
        dataValueField: "codigo",
        dataSource: destinosDS,
        filter: "contains",
        //suggest: true,
        placeholder: "Selecciona destino...",
        minLength: 1,
        autoBind: false,
        noDataTemplate: "No hay coincidencias",
        highlightFirst: true,
    });

    const destCombo = kendo.jQuery("#destination").data("kendoComboBox");

    // --- Al seleccionar origen, recargar destinos ---
    originCombo.bind("select", async function () {
        const origenVal = originCombo.value();
        // const ventaVigente = await checkVentaVigente("EC", origenVal || "", destCombo.value() || ""); // si ya hay destino seleccionado, verificar tambié
        // if (!ventaVigente && origenVal) {
        //     alert("No hay venta vigente para la ruta seleccionada.");
        // }
        destCombo.value("");
        destCombo.text("");
        if (origenVal) {
            destinosDS.read();
        } else {
            destinosDS.data([]);
        }
        btnNextStep1.disabled = !allowContinueStep2();
    });
    destCombo.bind("select", async function () {
        const destVal = destCombo.value();
        const ventaVigente = await checkVentaVigente(
            "EC",
            originCombo.value() || "",
            destVal || ""
        ); // si ya hay destino seleccionado, verificar tambié
        if (!ventaVigente && destVal) {
            Swal.fire({
                text: "No hay venta vigente para la ruta seleccionada.",
                title: "!Upps",
                icon: "warning",
            });
        }
        btnNextStep1.disabled = !allowContinueStep2();
    });

    // --- Botón Intercambiar ---
    kendo.jQuery("#swapBtn").on("click", function () {
        const oVal = originCombo.value();
        //const oText = originCombo.text();
        const dVal = destCombo.value();
        //const dText = destCombo.text();
        originCombo.value(dVal);
        //originCombo.text(dText || "");
        destCombo.value(oVal);
        //destCombo.text(oText || "");
        originCombo.input.removeClass("is-invalid is-valid");
        destCombo.input.removeClass("is-invalid is-valid");
    });

    // ---------- DatePickers ----------
    kendo.jQuery("#datePicker").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(),
        value: new Date(),
        adaptiveMode: "auto",   // activa modo adaptativo/mobile
        inputMode: "numeric"
        //...cultureDatePicker
    });
    const datePicker = kendo.jQuery("#datePicker").data("kendoDatePicker");

    kendo.jQuery("#returnDatePicker").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date(),
        adaptiveMode: "auto",   // activa modo adaptativo/mobile
        inputMode: "numeric"
        //...cultureDatePicker
    });
    const returnDatePicker = kendo
        .jQuery("#returnDatePicker")
        .data("kendoDatePicker");

    // Opciones fecha rápida
    kendo.jQuery("#dateOptions .date-option").on("click", function () {
        const val = kendo.jQuery(this).data("val");
        kendo
            .jQuery("#dateOptions .date-option")
            .removeClass("active btn-primary")
            .addClass("btn-outline-primary");
        kendo
            .jQuery(this)
            .removeClass("btn-outline-primary")
            .addClass("active btn-primary");

        if (val === "today") {
            const d = new Date();
            datePicker.value(d);
            returnDatePicker.min(formatDateISO(d));
            datePicker.enable(false);
        } else if (val === "tomorrow") {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            datePicker.value(d);
            returnDatePicker.min(formatDateISO(d));
            datePicker.enable(false);
        } else {
            datePicker.enable(true);
            datePicker.open();
        }
    });
    kendo.jQuery('#dateOptions .date-option[data-val="today"]').trigger("click");

    kendo.jQuery("#datePicker").on("change", function () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!isValidDateDMY(this.value, today)) {
            datePicker.value(null);      // limpiar
            this.value = "";            // limpiar texto
            kendo.jQuery("#returnGroup").hide(250);
            btnNextStep1.disabled = true;
            return;
        }
        const valueInput = this.value;
        let ida = datePicker.value();
        const dateFromInput = parseDMY(valueInput);
        if (valueInput && !ida)
            datePicker.value(dateFromInput);
        else if (valueInput && ida) {

            // Normalizar ambas fechas (remover horas)
            dateFromInput.setHours(0, 0, 0, 0);
            ida.setHours(0, 0, 0, 0);

            const sameDate = dateFromInput.getTime() === ida.getTime();

            if (!sameDate) {
                // Si NO son la misma fecha → asignar datePicker.value(valueInput)
                datePicker.value(dateFromInput);
            }
        }
        ida = datePicker.value();
        if (ida) {
            //mostrar regreso
            kendo.jQuery("#returnGroup").show(250);
            returnDatePicker.min(formatDateISO(ida));
            const ret = returnDatePicker.value();
            if (ret && ret < ida) {
                const next = new Date(ida);
                next.setDate(next.getDate() + 1);
                returnDatePicker.value(next);
            }
        } else {
            //ocultar regreso
            kendo.jQuery("#returnGroup").hide(250);
            returnDatePicker.value(null);
        }
        btnNextStep1.disabled = !allowContinueStep2();
    });
    kendo.jQuery("#returnDatePicker").on("change", function () {
        if (!isValidDateDMY(this.value, datePicker.value())) {
            returnDatePicker.value(null);      // limpiar
            this.value = "";            // limpiar texto
            return;
        }
        const valueInput = this.value;
        const valueKendo = returnDatePicker.value();
        const dateFromInput = parseDMY(valueInput);
        if (valueInput && valueKendo)
            returnDatePicker.value(dateFromInput);
        else if (valueInput && valueKendo) {

            // Normalizar ambas fechas (remover horas)
            dateFromInput.setHours(0, 0, 0, 0);
            valueKendo.setHours(0, 0, 0, 0);

            const sameDate = dateFromInput.getTime() === valueKendo.getTime();

            if (!sameDate) {
                // Si NO son la misma fecha → asignar datePicker.value(valueInput)
                returnDatePicker.value(dateFromInput);
            }
        }

    });

    // ---------- Validación ----------
    function parseDMY(dateStr) {
        const [d, m, y] = dateStr.split("/").map(Number);
        return new Date(y, m - 1, d);
    }
    function isValidDateDMY(dateStr, minDate) {
        // Regex para formato dd/mm/yyyy
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        const errorDate = () => {
            Swal.fire({
                icon: "error",
                title: "Fecha inválida",
                text: "Por favor ingresa una fecha válida.",
            });
        }
        if (!regex.test(dateStr)) {
            errorDate();
            return false;
        }

        const [day, month, year] = dateStr.split("/").map(Number);

        // Crear fecha real
        const date = new Date(year, month - 1, day);
        const isValid = (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
        if (!isValid) {
            errorDate();
        }
        if (date < minDate) {
            errorDate();
            return false;
        }
        // Validar que coincida con lo ingresado
        return isValid;
    }

    function allowContinueStep2() {
        const originVal = originCombo.value();
        const destVal = destCombo.value();
        const selectedDate = datePicker.value();
        return originVal && destVal && selectedDate;
    }

    async function validateStep1() {
        if (!payloadGlobal.isReturnSelected) {
            const originVal = originCombo.value();
            const destVal = destCombo.value();
            const selectedDate = datePicker.value();
            const returnDate = returnDatePicker.value();
            let valid = true;
            if (!originVal) {
                markComboInvalid(originCombo, true, "Origen es requerido");
                valid = false;
            } else {
                markComboInvalid(originCombo, false);
            }

            if (!destVal) {
                markComboInvalid(destCombo, true, "Destino es requerido");
                valid = false;
            } else {
                markComboInvalid(destCombo, false);
            }

            if (originVal && destVal && originVal === destVal) {
                markComboInvalid(
                    originCombo,
                    true,
                    "Origen y destino no pueden ser iguales"
                );
                markComboInvalid(
                    destCombo,
                    true,
                    "Origen y destino no pueden ser iguales"
                );
                valid = false;
            }

            if (!selectedDate) {
                Swal.fire({ text: "Seleccione la fecha de viaje", icon: "info" });
                valid = false;
            }

            if (!valid) return;

            const payload = {
                origen: originVal,
                destino: destVal,
                fechaIda: formatDateISO(selectedDate),
                fechaRegreso: returnDate ? formatDateISO(returnDate) : null,
            };
            payloadGlobal = { ...payload }; // guardar globalmente
            payloadGlobal.isReturnSelected = false;
            const paramsOutward = {
                agenciaVenta: "X0", // fijo, o de sesión
                fechaViaje: payload.fechaIda,
                origen: payload.origen,
                destino: payload.destino,
            };
            console.log("Buscar rutas con:", payload);
            const successLoadLines = await loadLines(
                "listOutward",
                paramsOutward,
                false
            );
            if (!successLoadLines) {
                includeFilterDirect();
                showStep(numberSteps.Inicio);
                document.getElementById('resumenCompra').classList.add('d-none');
                return;
            }
            showStep(numberSteps.ViajesIdaRegreso); //Mostrar lineas de ida
        }
    }
    btnNextStep1.addEventListener("click", validateStep1);
    // Carga inicial de orígenes
    origenesDS.read();
});

function markComboInvalid(comboWidget, isInvalid, msg) {
    if (!comboWidget) return;
    if (isInvalid) {
        comboWidget.input.addClass("is-invalid");
        let fb = comboWidget.input.next(".invalid-feedback");
        if (!fb.length) {
            comboWidget.input.after(
                '<div class="invalid-feedback">' + (msg || "Campo requerido") + "</div>"
            );
            fb = comboWidget.input.next(".invalid-feedback");
        }
        fb.text(msg || "Campo requerido");
    } else {
        comboWidget.input.removeClass("is-invalid").addClass("is-valid");
        comboWidget.input.next(".invalid-feedback").remove();
    }
}
async function checkVentaVigente(empresa, origen, destino) {
    try {
        const response = await fetch(
            `${vigenciaVentaEndpoint}?empresa=${empresa}&origen=${origen}&destino=${destino}`
        );
        const result = await response.json();
        if (result.error || !result.data) {
            return false;
        } else {
            let maxDaysCalendar = +result.data;
            const datePicker = kendo.jQuery("#datePicker").data("kendoDatePicker");
            const returnDatePicker = kendo
                .jQuery("#returnDatePicker")
                .data("kendoDatePicker");
            datePicker.max(
                maxDaysCalendar
                    ? formatDateISO(
                        new Date(Date.now() + maxDaysCalendar * 24 * 60 * 60 * 1000)
                    )
                    : null
            );
            returnDatePicker.max(
                maxDaysCalendar
                    ? formatDateISO(
                        new Date(Date.now() + maxDaysCalendar * 24 * 60 * 60 * 1000)
                    )
                    : null
            );
            return true;
        }
    } catch (err) {
        console.error("Error verificando vigencia venta:", err);
        return false;
    }
}
//#endregion

//#region PASO 2: Lineas, Filtrado y ordenación de rutas
function applyFilters() {
    const selectedSlots = [];
    document
        .querySelectorAll("#step2 input[type=checkbox]:checked")
        .forEach((cb) => {
            if (cb.id != "directOnly") selectedSlots.push(cb.value);
        });

    const sortOption = document.getElementById("sortRoutes").value;
    let aplicaRegreso = !!payloadGlobal.fechaRegreso;
    let filteredOutward = [...allLinesOutward];
    let filteredReturn = [...allLinesReturn];

    // Filtrado por rango horario
    if (selectedSlots.length > 0) {
        const filterFn = (line) => {
            const slot = getTimeSlot(line.lineas[0].data.horaSalida);
            return selectedSlots.includes(slot);
        };
        filteredOutward = filteredOutward.filter(filterFn);
        if (aplicaRegreso) filteredReturn = filteredReturn.filter(filterFn);
    }

    // Ordenamiento
    const sortFn = (a, b) => {
        switch (sortOption) {
            case "price":
                return (
                    a.lineas[0].data.tarifa.valorTarifa -
                    b.lineas[0].data.tarifa.valorTarifa
                );
            case "duration": {
                const durA = getDurationMinutes(a.lineas[0].data);
                const durB = getDurationMinutes(b.lineas[0].data);
                return durA - durB;
            }
            case "departure": {
                const dtA = toDateTime(
                    a.lineas[0].data.fechaSalida,
                    a.lineas[0].data.horaSalida || a.lineas[0].data.horaSalida
                );
                const dtB = toDateTime(
                    b.lineas[0].data.fechaSalida,
                    b.lineas[0].data.horaSalida || b.lineas[0].data.horaSalida
                );
                return dtA - dtB;
            }

            case "arrival": {
                const dtA = toDateTime(
                    a.lineas[a.lineas.length - 1].data.fechaLlegada,
                    a.lineas[a.lineas.length - 1].data.horaLlegada
                );
                const dtB = toDateTime(
                    b.lineas[b.lineas.length - 1].data.fechaLlegada,
                    b.lineas[b.lineas.length - 1].data.horaLlegada
                );
                return dtA - dtB;
            }
            default:
                return 0;
        }
    };
    filteredOutward.sort(sortFn);

    if (document.getElementById("directOnly").checked) {
        const filterDirect = (line) => !line.conexion && !line.enlace;
        filteredOutward = filteredOutward.filter(filterDirect);
        if (aplicaRegreso) filteredReturn = filteredReturn.filter(filterDirect);
    }

    // Render de nuevo
    if (aplicaRegreso && filteredReturn.length > 0) {
        filteredReturn.sort(sortFn);
        renderLines(
            filteredReturn,
            document.getElementById("listReturn"),
            aplicaRegreso
        );
        kendo.jQuery("#linesReturn").removeClass("d-none");
    }
    renderLines(
        filteredOutward,
        document.getElementById("listOutward"),
        aplicaRegreso
    );
    document.getElementById("filterCard").classList.add("d-none");
}
function resetFilters() {
    document
        .querySelectorAll("#step2 input[type=checkbox]")
        .forEach((cb) => (cb.checked = false));
    document.getElementById("sortRoutes").value = "price";
    let aplicaRegreso = !!payloadGlobal.fechaRegreso;
    renderLines(
        allLinesOutward,
        document.getElementById("listOutward"),
        aplicaRegreso
    );
    if (allLinesReturn.length > 0) {
        renderLines(
            allLinesReturn,
            document.getElementById("listReturn"),
            aplicaRegreso
        );
        kendo.jQuery("#linesReturn").removeClass("d-none");
    }
}
document.getElementById("applyFilters").addEventListener("click", applyFilters);
document.getElementById("clearFilters").addEventListener("click", resetFilters);
function parseDateTime(fecha, hora) {
    // hora: "1730" → "17:30"
    const horaFormateada = hora.replace(/(\d{2})(\d{2})/, "$1:$2");

    return new Date(`${fecha}T${horaFormateada}:00`);
}

function filtrarYOrdenarViajes(viajes) {
    const ahora = new Date();

    return viajes
        .map(v => {
            const linea = v.lineas[0]?.data;
            if (!linea) return null;

            const fechaSalida = linea.fechaSalida; // "2025-11-15"
            const horaSalida = linea.horaSalida;   // "1730"

            const fechaHora = parseDateTime(fechaSalida, horaSalida);

            return {
                ...v,
                _fechaHoraSalida: fechaHora // propiedad temporal para ordenar
            };
        })
        .filter(v => v && v._fechaHoraSalida >= ahora) // excluir viajes pasados
        .sort((a, b) => a._fechaHoraSalida - b._fechaHoraSalida) // ordenar por hora
        .map(v => {
            delete v._fechaHoraSalida;
            return v;
        });
}

function renderLines(trayectos, containerSelector, isReturn) {
    const container = containerSelector;
    container.innerHTML = "";

    if (!trayectos || trayectos.length === 0) {
        container.innerHTML =
            "<div class='text-muted p-3'>No hay rutas disponibles.</div>";
        return;
    }
    //ordenar por hora de salida mas temprano
    trayectos = filtrarYOrdenarViajes(trayectos);
    trayectos.forEach((trayecto, idx) => {
        const lineas = trayecto.lineas.map((l) => l.data);
        const primera = lineas[0];
        const uniqueId = `det-${primera.ruta}-${primera.hora}-${idx}`; // ID único usando índice

        // primera y última línea
        const ultima = lineas[lineas.length - 1];

        const salida = formatTime12h(primera.horaSalida || primera.hora);
        const llegada = formatTime12h(ultima.horaLlegada);
        const duracion = formatDuration(
            Math.round(
                (toDateTime(ultima.fechaLlegada, ultima.horaLlegada) -
                    toDateTime(primera.fechaSalida, primera.horaSalida)) /
                60000
            )
        );

        // sumar tarifas
        let tarifaBase = 0;
        let mejorDesc = 0;
        lineas.forEach((l) => {
            tarifaBase += l.tarifa?.valorTarifa || 0;
            const desc = ROL ? l.tarifa?.[ROLES[ROL].porcentajeDescuento] : 0;
            if (desc > mejorDesc) mejorDesc = desc;
        });
        const tarifaDesc = Math.round(tarifaBase - (tarifaBase * mejorDesc) / 100);

        // card principal
        const item = document.createElement("div");
        item.className = "card mb-3 shadow-sm";

        //<h6 class="mb-0">${primera.infoServicio.descripcion}</h6>
        item.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <img src="${logos[primera.empresa]
            }" alt="logo servicio" class="mr-2" style="height:32px;">
        </div>

        <div class="row">
          <div class="col-6">
            <p class="mb-1"><strong>Salida:</strong> ${salida}</p>
            <p class="mb-1"><strong>Llegada:</strong> ${llegada}</p>
            <p class="mb-1"><strong>Duración:</strong> ${duracion}</p>
          </div>
          <div class="col-6 text-right">
            <p class="mb-1 text-muted">Tarifa base</p>
            <h5 class="mb-1">$${tarifaBase.toLocaleString()}</h5>
            ${mejorDesc
                ? `<p class="mb-1 text-success">Con descuento: <strong>$${tarifaDesc.toLocaleString()}</strong></p>`
                : ""
            }
          </div>
        </div>

        ${lineas.length > 1
                ? `<p class="mb-1"><strong>Rutas:</strong> ${lineas.length}</p>`
                : ""
            }

        <div class="d-flex justify-content-between mt-2">
          <button class="btn btn-primary btn-sm ver-sillas">Ver sillas</button>
          <button class="btn btn-danger btn-sm ver-detalles" data-toggle="collapse" data-target="#${uniqueId}">Ver detalles</button>
        </div>

        <div id="${uniqueId}" class="detalles collapse mt-3">
          ${renderTimeline(lineas)}
        </div>
      </div>
    `;

        // evento ver sillas
        item.querySelector(".ver-sillas").addEventListener("click", () => {
            if (trayecto.conexion) {
                const sinCupos = trayecto.lineas.some(
                    (l) => (l.data.puestosDisponibles || 0) === 0
                );
                if (sinCupos) {
                    Swal.fire({
                        icon: "error",
                        title: "Ruta no disponible",
                        text: "Esta ruta con conexión no se puede seleccionar porque una de sus subrutas no tiene asientos disponibles.",
                    });
                    return; // 🚫 Cancelamos aquí
                }
            }

            // Si pasa la validación, abrimos el modal de sillas
            if (isReturn) {
                openSeatModal(trayecto, "regreso");
                payloadGlobal.viajeRegreso = trayecto;
            } else {
                openSeatModal(trayecto, "ida");
                payloadGlobal.viajeIda = trayecto;
            }
            document.getElementById('resumenCompra').classList.remove('d-none');
        });

        container.appendChild(item);
    });
}

// cronología detallada
function renderTimeline(lineas) {
    let html = `<div class="timeline">`;
    // Cargar la biblioteca de Font Awesome 5.15
    // const fontAwesomeLink = document.createElement('link');
    // fontAwesomeLink.rel = 'stylesheet';
    // fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    // document.head.appendChild(fontAwesomeLink);

    // Mapeo de códigos de amenidades a íconos de Font Awesome
    const amenityIcons = {
        ACP: "fa-tv", // ASIENTO CON PANTALLA
        WIF: "fa-wifi", // WI-FI
        EAB: "fa-headphones", // ENTRETENIMIENTO A BORDO
        TMC: "fa-plug", // TOMACORRIENTE
    };

    lineas.forEach((l, idx) => {
        const salida = formatTime12h(l.horaSalida || l.hora);
        const llegada = formatTime12h(l.horaLlegada);
        const duracion = formatDuration(getDurationMinutes(l));

        // Construir el HTML para las amenidades con íconos
        let amenidadesHtml = "";
        if (l.amenidades && l.amenidades.length > 0) {
            amenidadesHtml = '<div class="amenities-list">';
            l.amenidades.forEach((amenidad) => {
                const iconClass = amenityIcons[amenidad.codigo] || "fa-question-circle";
                amenidadesHtml += `
                    <span class="amenity-badge small">
                        <i class="fas ${iconClass}"></i> ${amenidad.descripcion}
                    </span>
                `;
            });
            amenidadesHtml += "</div>";
        }

        html += `
            <div class="mb-3">
                <div class="d-flex align-items-center mb-2">
                    <img src="${logos[l.empresa]
            }" alt="logo servicio" class="mr-2" style="height:32px;">
                </div>
                <div><strong>Salida:</strong> ${salida} · ${l.descOrigen}</div>
                <div class="small text-muted">${l.ruta} - ${l.hora} · ${l.infoServicio.descripcion
            }</div>
                <div class="small">Vía: ${l.via || "N/A"}</div>
                <div class="small">Duración parcial: ${duracion}</div>
                <div><strong>Llegada:</strong> ${llegada} · ${l.descDestino
            }</div>
                
                <!-- Sección de amenidades agregada aquí -->
                ${amenidadesHtml}
                <hr>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

function preFilterResponseLineas(dataLineas) {
    return dataLineas.filter((currentLinea) => {
        const trayectosNoValidos = !currentLinea.lineas.some(
            (currentTrayecto) =>
                currentTrayecto.error || currentTrayecto.data.puestosDisponibles == 0
        );
        return trayectosNoValidos;
    });
}

function toggleViewListLines() {
    const elementHide = payloadGlobal.isReturnSelected
        ? document.getElementById("listOutward")
        : document.getElementById("listReturn");
    const elementShow = payloadGlobal.isReturnSelected
        ? document.getElementById("listReturn")
        : document.getElementById("listOutward");
    elementHide.classList.add("d-none");
    elementShow.classList.remove("d-none");
    document.getElementById("title-step2").innerText =
        payloadGlobal.isReturnSelected
            ? "Selecciona tu vije de Regreso"
            : "Selecciona tu vije de ida";
}

function includeFilterDirect() {
    const currentListLineValidate = payloadGlobal.isReturnSelected
        ? allLinesReturn
        : allLinesOutward;
    const hasDirect = currentListLineValidate.some((t) => t.enlace);
    const hasConnections = currentListLineValidate.some((t) => t.conexion);

    if (hasDirect || hasConnections) {
        document.getElementById("directFilterGroup").classList.remove("d-none");
    } else {
        document.getElementById("directFilterGroup").classList.add("d-none");
    }
}

async function loadLines(containerId, params, isReturn = false) {
    try {
        toggleViewListLines();
        const nameFunction = `getLineas?agenciaVenta=${params.agenciaVenta}&fechaViaje=${params.fechaViaje}&origen=${params.origen}&destino=${params.destino}&contingencia=N`;
        const lappizFunctionId = "12ff70cf-d04a-41bb-b6ad-e564217339d7";
        const method = "GET";
        const body = {};
        let config = { nameFunction, lappizFunctionId, body, method };
        const response = await execLF(config);
        const data = preFilterResponseLineas(response.data);
        if (data.length == 0) {
            Swal.fire({
                title: "Upss!",
                text: "No se encontrarón viajes disponibles para este destino",
                icon: "error",
            });
            document.getElementById(containerId).innerHTML = "";
            return false;

        }
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        renderLines(data, container, isReturn);
        if (!isReturn) {
            allLinesOutward = data;
        } else {
            allLinesReturn = data;
        }
        return true;
    } catch (err) {
        console.error("Error cargando líneas:", err);
        Swal.fire({
            title: "Upss!",
            text: "No se encontrarón viajes disponibles para este destino",
            icon: "error",
        });
        return false;
    }
}

function backViajeSelect() {
    if (payloadGlobal.isReturnSelected) {
        payloadGlobal.isReturnSelected = false;
        showStep(numberSteps.AsientosIdaRegreso);
        toggleViewListLines(false);
    } else {
        showStep(numberSteps.Inicio);
        document.getElementById('resumenCompra').classList.add('d-none');
    }
}
document.getElementById("lastStep2").addEventListener("click", backViajeSelect);
document.getElementById("filterIcon").addEventListener("click", () => {
    document.getElementById("filterCard").classList.toggle("d-none");
});

//#endregio

//#region --- Paso 3: Selección de asientos ---
async function openSeatModal(lineData, tripType = "ida") {
    globalLineData = lineData;
    currentTripType = tripType;
    minAvailableSeats = Math.min(
        ...lineData.lineas.map((l) => l.data.puestosDisponibles)
    );
    if (minAvailableSeats <= 0) {
        Swal.fire({
            title: "Sin disponibilidad",
            text: "Este trayecto no tiene asientos disponibles en todos los segmentos.",
            icon: "warning",
        });
        return;
    }
    // Estado para recorrer trayectos secuencialmente
    currentSegmentIndex = 0;
    totalSegments = lineData.lineas.length;

    // inicializar con primer trayecto
    await loadSegment(currentSegmentIndex);
    showStep(numberSteps.AsientosIdaRegreso); //MOSTRAR ASIENTOS
}

async function loadSegment(segmentIndex) {
    debugger;
    selectedSeats = [];
    let lineData = globalLineData;
    const seg = lineData.lineas[segmentIndex].data;
    const layoutEl = document.getElementById("seatLayout");
    const titleSeleccionAsientos = document.getElementById("title-step3");
    titleSeleccionAsientos.innerText = `Selecciona tus asientos para el trayecto ${segmentIndex + 1
        } de ${totalSegments}`;
    layoutEl.innerHTML = `
        <div class="bus-layout"></div>
    `;

    const busLayout = layoutEl.querySelector(".bus-layout");

    const url = `https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getPuestos?empresa=${seg.empresa}&origen=${seg.codigoOrigen}&destino=${seg.codigoDestino}&fechaViaje=${seg.fechaViaje}&ruta=${seg.ruta}&hora=${seg.hora}&ageContact=S`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        const puestos = result.data || [];

        const ocupadosTotal = puestos.filter((p) => p.estadoVenta === "O").length;
        const libresTotal = puestos.length - ocupadosTotal;
        updateSeatCounters(libresTotal + ocupadosTotal, ocupadosTotal, 0);

        let seatIndex = 0;

        // 🚍 Conductor primero
        const driverRow = document.createElement("div");
        driverRow.className = "row-seat";
        const driver = document.createElement("div");
        driver.className = "seat driver";
        driver.innerHTML = "&#128663;"; // icono conductor
        driverRow.appendChild(driver);
        busLayout.appendChild(driverRow);
        function buildSeat(puesto, d, tramoIndex) {
            const seat = document.createElement("div");

            if (!puesto) {
                seat.className = "seat empty";
                return seat;
            }

            seat.textContent = puesto.numero;
            seat.className = `seat ${puesto.ubicacion.toLowerCase()}`;

            const isSelected = payloadGlobal.isReturnSelected
                ? selectedSeatsRegreso.some(
                    (selectedSeat) =>
                        selectedSeat.numero == puesto.numero &&
                        d.ruta == selectedSeat.ruta
                )
                : selectedSeatsIda.some(
                    (selectedSeat) =>
                        selectedSeat.numero == puesto.numero &&
                        d.ruta == selectedSeat.ruta
                );
            if (puesto.estadoVenta === "O" && !isSelected) {
                seat.classList.add("taken");
            } else if (puesto.estadoVenta !== "O" || isSelected) {
                if (isSelected) seat.classList.add("selected");
                else seat.classList.add("free");
                seat.addEventListener("click", () => {
                    toggleSeatApi(seat, puesto, d, minAvailableSeats);
                    payloadGlobal.lineas = selectedSeats;

                    const seleccionados =
                        document.querySelectorAll(".seat.selected").length;
                    //updateSeatCounters(libresTotal + ocupadosTotal, ocupadosTotal, seleccionados);
                });
            }

            return seat;
        }

        // Agrupar puestos por fila (cada fila puede tener hasta 4 ubicaciones)
        const filas = {};
        puestos.forEach((p) => {
            // Extraer número de fila desde la ubicación: IV2 → fila 2
            const match = p.ubicacion.match(/\d+/);
            const filaIndex = match ? parseInt(match[0], 10) : 0;

            if (!filas[filaIndex]) filas[filaIndex] = {};
            if (p.ubicacion.startsWith("IV")) filas[filaIndex].iv = p;
            if (p.ubicacion.startsWith("IP")) filas[filaIndex].ip = p;
            if (p.ubicacion.startsWith("DV")) filas[filaIndex].dv = p;
            if (p.ubicacion.startsWith("DP")) filas[filaIndex].dp = p;
        });

        // Renderizar cada fila en orden
        Object.keys(filas)
            .sort((a, b) => a - b)
            .forEach((idx) => {
                const row = document.createElement("div");
                row.className = "row-seat";

                const f = filas[idx];

                // Orden correcto: IV | IP | Pasillo | DP | DV
                row.appendChild(buildSeat(f.iv, seg, currentSegmentIndex));
                row.appendChild(buildSeat(f.ip, seg, currentSegmentIndex));

                const pasillo = document.createElement("div");
                pasillo.className = "seat pasillo";
                row.appendChild(pasillo);

                row.appendChild(buildSeat(f.dp, seg, currentSegmentIndex));
                row.appendChild(buildSeat(f.dv, seg, currentSegmentIndex));

                busLayout.appendChild(row);
            });

        // 🚍 Botón de confirmación
        const finishBtn = document.getElementById("selectLines");
        const lastBtn = document.getElementById("lastStep3");
        const lastRouteBtn = document.getElementById("lastRoute");
        const confirmBtn = document.getElementById("nextRoute");
        if (totalSegments == 1 || segmentIndex == 0) {
            lastBtn.style.display = "block";
            lastRouteBtn.style.display = "none";
        } else {
            lastBtn.style.display = "none";
            lastRouteBtn.style.display = "block";
        }

        if (segmentIndex === totalSegments - 1) {
            finishBtn.style.display = "block";
            confirmBtn.style.display = "none";
        } else {
            confirmBtn.style.display = "block";
            finishBtn.style.display = "none";
        }

        async function validateStep2() {
            if (selectedSeats.length === 0) {
                Swal.fire({
                    title: "Selecciona al menos un asiento",
                    text: "Debes elegir tus puestos para continuar.",
                    icon: "warning",
                });
                return;
            }

            if (segmentIndex < totalSegments - 1) {
                currentSegmentIndex++;
                loadSegment(currentSegmentIndex);
            } else {
                if (payloadGlobal.fechaRegreso) {
                    const paramsReturn = {
                        agenciaVenta: "X0",
                        fechaViaje: payload.fechaRegreso,
                        origen: payload.destino,
                        destino: payload.origen,
                    };
                    const successLoadLines = loadLines("listReturn", paramsReturn, true);
                    if (successLoadLines) {
                        includeFilterDirect();
                        showStep(numberSteps.ViajesIdaRegreso); //MOSTRAR VIAJES REGRESO
                    } else {
                        Swal.fire({
                            title: "Vuelve a intentarlo",
                            text: "Problemas al buscar los viajes de regreso.",
                            icon: "info",
                        });
                    }
                } else {
                    showStep(numberSteps.Pasajeros);
                }
                Swal.fire({
                    title: "Éxito",
                    text: "Has seleccionado tus asientos en todos los trayectos.",
                    icon: "success",
                });
            }
        }
        validateSeats();
        confirmBtn.addEventListener("click", validateStep2);
        lastRouteBtn.addEventListener("click", clearAllSeats);
    } catch (err) {
        console.error("Error al cargar puestos:", err);
        Swal.fire({
            title: "Error",
            text: "No se pudieron cargar los asientos.",
            icon: "error",
        });
    }
}
async function clearAllSeats(isBack = false) {
    debugger;
    const allSeats = payloadGlobal.isReturnSelected
        ? selectedSeatsRegreso
        : selectedSeatsIda;
    selectedSeats = [...allSeats];
    if (selectedSeats.length === 0) {
        //Swal.fire({ title: "Sin puestos seleccionados", text: "No tienes asientos para limpiar.", icon: "info" });
        return;
    }

    // Confirmación

    const confirm = isBack
        ? { isConfirmed: true }
        : await Swal.fire({
            title: "¿Limpiar todos los puestos?",
            text: `Esto liberará todos los asientos seleccionados en ${payloadGlobal.isReturnSelected ? "regreso" : "ida"
                }.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, limpiar",
            cancelButtonText: "Cancelar",
        });

    if (!confirm.isConfirmed) return;

    const nameFunction = "desmarcarPuesto";
    const lappizFunctionId = "e0f971b9-7921-4eb9-b7db-5ef3fb23b69c";
    const method = "POST";
    // Consumir API desmarcar
    for (let s of selectedSeats) {
        try {
            const body = {
                numero: s.numero,
                empresa: s.empresa,
                fechaViaje: s.fechaViaje,
                hora: s.hora,
                origen: s.codigoOrigen,
                destino: s.codigoDestino,
                ruta: s.ruta,
            };
            // Metodo encargado para ejecutar una lappoz function
            let config = { nameFunction, lappizFunctionId, body, method };
            await execLF(config);
        } catch (err) {
            console.error("Error al desmarcar puesto:", err);
        }
    }
    if (payloadGlobal.isReturnSelected)
        selectedSeatsRegreso = allSeats.filter(
            (x) => x.ruta != selectedSeats[0].ruta
        );
    else
        selectedSeatsIda = allSeats.filter((x) => x.ruta != selectedSeats[0].ruta);
    // Resetear variables y contadores
    updateSeatCounters(0, 0, 0);
    validateSeats();
    // Refrescar UI de asientos
    document
        .querySelectorAll(".seat.selected")
        .forEach((el) => el.classList.remove("selected"));
    if (!isBack)
        Swal.fire({
            title: "Listo",
            text: "Todos los puestos han sido liberados.",
            icon: "success",
        });
}
document.getElementById("clearSeats").addEventListener("click", () => {
    clearAllSeats(false);
});

document.getElementById("lastStep3").addEventListener("click", () => {
    clearAllSeats(true);
});

function toggleTimer(swTimer) {
    if (swTimer) {
        Swal.fire({
            icon: "info",
            title: "Importante",
            text: "Tiempo reservado para tu compra: 10 minutos.",
        });
        document.getElementById('timer').classList.remove('d-none');
        countdownInterval = setInterval(() => {
            timeLeft--;

            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');

            document.getElementById("timerValue").textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                document.getElementById("timerValue").textContent = "00:00";

                Swal.fire({
                    icon: "warning",
                    title: "Tiempo agotado",
                    text: "El tiempo para completar tu compra ha terminado.",
                });
                location.reload();
            }
        }, 1000);
    } else {
        document.getElementById('timer').classList.add('d-none');
        clearInterval(countdownInterval);
        timeLeft = 10 * 60;
        document.getElementById("timerValue").textContent = "10:00";
    }
}

async function toggleSeatApi(seatEl, puesto, lineData, minAvailableSeats) {
    const isSelected = seatEl.classList.contains("selected");
    const nameFunction = isSelected ? "desmarcarPuesto" : "marcarPuesto";
    if (!isSelected)
        toggleTimer(true);
    else if (selectedSeatsIda.length == 1)
        toggleTimer(false);
    const lappizFunctionId = isSelected
        ? "e0f971b9-7921-4eb9-b7db-5ef3fb23b69c"
        : "1f91634e-a75c-403c-a074-66ee070526e5";
    const body = {
        numero: puesto.numero,
        empresa: lineData.empresa,
        fechaViaje: lineData.fechaViaje,
        hora: lineData.hora,
        origen: lineData.codigoOrigen,
        destino: lineData.codigoDestino,
        ruta: lineData.ruta,
    };
    // Metodo encargado para ejecutar una lappoz function

    const method = "POST";
    let config = { nameFunction, lappizFunctionId, body, method };
    selectedSeats =
        currentTripType === "ida" ? selectedSeatsIda : selectedSeatsRegreso;
    payloadGlobal.lineas = payloadGlobal.lineas ? payloadGlobal.lineas : [];
    try {
        if (!isSelected) {
            if (selectedSeats.length >= minAvailableSeats) {
                Swal.fire({
                    title: "Límite alcanzado",
                    text: `Solo puedes seleccionar ${minAvailableSeats} asientos en este viaje.`,
                    icon: "info",
                });
                return;
            }
        }
        const response = await execLF(config);
        if (response.error) {
            alert(response.message || "Error al actualizar el asiento");
            return;
        }
        // Actualiza UI
        if (isSelected) {
            seatEl.classList.remove("selected");
            seatEl.classList.add("free");
            selectedSeats = selectedSeats.filter((s) => s.numero !== puesto.numero);
            if (!payloadGlobal.isReturnSelected) selectedSeatsIda = selectedSeats;
            else selectedSeatsRegreso = selectedSeats;
        } else {
            seatEl.classList.remove("free");
            seatEl.classList.add("selected");
            selectedSeats.push({
                ...puesto,
                empresa: lineData.empresa,
                fechaViaje: lineData.fechaViaje,
                ruta: lineData.ruta,
                hora: lineData.hora,
                codigoOrigen: lineData.codigoOrigen,
                codigoDestino: lineData.codigoDestino,
            });
        }
        validateSeats();

        updateSeatCounters(
            lineData.capacidadBus,
            parseInt(document.getElementById("seatsTaken").textContent),
            selectedSeats.length
        );
    } catch (err) {
        console.error(err);
        alert("No se pudo actualizar el asiento");
    }
}

function addSeat(numero) {
    if (currentTripType === "ida") {
        if (!selectedSeatsIda.includes(numero)) selectedSeatsIda.push(numero);
    } else {
        if (!selectedSeatsRegreso.includes(numero))
            selectedSeatsRegreso.push(numero);
    }
}

function removeSeat(numero) {
    if (currentTripType === "ida") {
        selectedSeatsIda = selectedSeatsIda.filter((n) => n !== numero);
    } else {
        selectedSeatsRegreso = selectedSeatsRegreso.filter((n) => n !== numero);
    }
}

function validateSeats() {
    const selectLinesBtn = document.getElementById("selectLines");
    if (!payloadGlobal.isReturnSelected)
        selectLinesBtn.disabled = selectedSeatsIda.length === 0;
    else if (!!payloadGlobal.fechaRegreso)
        selectLinesBtn.disabled =
            selectedSeatsIda.length !== selectedSeatsRegreso.length;
}
function getTotalViaje(tarifaLinea, linea) {
    const tarifaActual =
        linea.data.tarifa.valorTarifa + linea.data.tarifa.valorEstampilla;
    tarifaLinea += tarifaActual * (1 + linea.data.tarifa.porcentajeImpuesto);
    return tarifaLinea;
}
function updateSeatCounters(total, taken, chosen) {
    document.getElementById("seatsFree").textContent = total - taken - chosen;
    document.getElementById("seatsTaken").textContent = taken;
    document.getElementById("seatsChosen").textContent = chosen;

    // Calcular total
    const tarifaIda = payloadGlobal.viajeIda.lineas.reduce(getTotalViaje, 0);
    let tarifa = tarifaIda;
    if (payloadGlobal.isReturnSelected) {
        const tarifaVuelta =
            payloadGlobal.viajeRegreso?.lineas?.reduce(getTotalViaje, 0) || 0;
        tarifa += tarifaVuelta;
    }
    const totalPagar = selectedSeatsIda.length * tarifa;
    document.getElementById("seatsTotal").textContent =
        totalPagar.toLocaleString("es-CO");
}
async function validateStep3() {
    if (!payloadGlobal.isReturnSelected) {
        if (selectedSeatsIda.length <= 0) {
            Swal.fire({ text: "Selecciona un viaje de ida", icon: "info" });
            return;
        }
        payloadGlobal.isReturnSelected = !!payloadGlobal.fechaRegreso;
        if (payloadGlobal.isReturnSelected) {
            const paramsOutward = {
                agenciaVenta: "X0", // fijo, o de sesión
                fechaViaje: payloadGlobal.fechaRegreso,
                origen: payloadGlobal.destino,
                destino: payloadGlobal.origen,
            };
            const successLoadLines = await loadLines(
                "listReturn",
                paramsOutward,
                true
            );
            includeFilterDirect();
            if (!successLoadLines) {
                Swal.fire({
                    text: "No hay viajes de regreso disponibles",
                    icon: "warning",
                });
                buildPassengerForms();
                loadLegalTexts();
                showStep(numberSteps.Pasajeros);
                payloadGlobal.isReturnSelected = false;
                payloadGlobal.fechaRegreso = null;
            }
            showStep(numberSteps.ViajesIdaRegreso); //Mostrar lineas de regreso
            return;
        }
        buildPassengerForms();
        loadLegalTexts();
        showStep(numberSteps.Pasajeros);
    } else {
        if (selectedSeatsRegreso.length <= 0) {
            Swal.fire({ text: "Selecciona un viaje de regreso", icon: "info" });
            return;
        }
        if (selectedSeatsRegreso.length != selectedSeatsIda.length) {
            Swal.fire({
                text: "La cantidad de asientos debe ser igual a la cantidad del viaje de ida",
                icon: "info",
            });
            return;
        }
        buildPassengerForms();
        loadLegalTexts();
        showStep(numberSteps.Pasajeros);
    }
}
document.getElementById("selectLines").addEventListener("click", validateStep3);
//#endregion
//#region  --- Paso 4: Formulario dinámico de pasajeros ---

function buildPassengerForms() {
    const container = $("#passengerForms");
    container.empty();
    let numPassengers = selectedSeatsIda.length;
    if (numPassengers === 0) {
        container.append(
            "<p class='text-danger'>Debe seleccionar al menos un asiento.</p>"
        );
        return;
    }
    const isRoundTrip = !!payloadGlobal.fechaRegreso;
    if (
        isRoundTrip &&
        (selectedSeatsRegreso.length === 0 ||
            selectedSeatsRegreso.length != numPassengers)
    ) {
        container.append(
            `<p class='text-danger'>Debe seleccionar ${numPassengers} ${numPassengers == 1 ? "asiento" : "asientos"
            } de regreso.</p>`
        );
        return;
    }
    if (numPassengers == 1) {
        document.getElementById("copyContactContainer").style.display = "none";
    } else {
        document.getElementById("copyContactContainer").style.display = "block";
    }

    for (let i = 1; i <= numPassengers; i++) {
        const formId = `passenger-${i}`;
        const form = `

        <div class="passenger-card card shadow-sm p-2 mb-2 selectable-passenger d-none" style="cursor: pointer"  id="card-${formId}">
            <h6 class="mb-0">Pasajero ${i}</h6>    
            <div class="summary-view"></div>
        </div>
      <div class="card mb-3 p-3 passenger-form" id="${formId}">
        <h6>Pasajero ${i}<span id="close-${formId}" class="d-none">Ocultar <i class="fa fa-close"></i></span></h6>

        <div class="form-group">
          <label>Nacionalidad<span style="color: red">*</span></label>
          <input required id="nationality-${i}" style="width:100%"  />
        </div>
        
        <div class="form-group">
          <label>Tipo de identificación<span style="color: red">*</span></label>
          <input required id="idType-${i}" style="width:100%" />
        </div>

        <div class="form-group">
          <label>Número de identificación<span style="color: red">*</span></label>
          <input type="number" pattern="^[0-9]+$" class="form-control" id="idNumber-${i}" required />
        </div>

        <div class="form-group">
          <label>Primer nombre<span style="color: red">*</span></label>
          <input type="text" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="first-name-${i}" required />
        </div>

        <div class="form-group">
          <label>Segundo nombre</label>
          <input type="text" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="second-name-${i}"/>
        </div>

        <div class="form-group">
          <label>Primer apellido<span style="color: red">*</span></label>
          <input type="text" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="first-last-name-${i}" required />
        </div>

        <div class="form-group">
          <label>Segundo apellido</label>
          <input type="text" class="form-control" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="second-last-name-${i}"/>
        </div>

        <div class="form-group">
          <label>Fecha de nacimiento<span style="color: red">*</span></label>
          <input required id="birthdate-${i}" style="width:100%" />
        </div>

        <div class="form-group">
          <label>Genero<span style="color: red">*</span></label>
          <input required id="gender-${i}" style="width:100%" />
        </div>

        <div class="form-group">
            <label>Correo electrónico<span style="color: red">*</span></label>
            <input type="email" class="form-control passenger-email" id="email-${i}" required pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$">
            <div class="invalid-feedback">Ingrese un correo válido</div>
        </div>
        <div class="form-group">
            <label>Celular<span style="color: red">*</span></label>
            <div class="d-flex">
            <select class="form-control mr-2" id="indicador-phone-${i}" style="max-width:120px;">
                <option>+57</option>
                <option>+58</option>
                <option>+51</option>
                <option>+593</option>
            </select>
            <input type="tel" class="form-control passenger-phone" id="phone-${i}" required pattern="^[0-9]{10}$" placeholder="10 dígitos">
            </div>
            <div class="invalid-feedback">Ingrese un número de 10 dígitos</div>
        </div>
      </div>
    `;
        container.append(form);

        // Inicializar Kendo Widgets
        kendo.jQuery(`#gender-${i}`).kendoComboBox({
            optionLabel: "Seleccione...",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: [
                { descripcion: "Masculino", codigo: "M" },
                { descripcion: "Femenino", codigo: "F" },
            ],
        });
        kendo.jQuery(`#idType-${i}`).kendoDropDownList({
            optionLabel: "Seleccione...",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: [], // Comienza con un array vacío
            enable: false, // Deshabilitado por defecto
        });

        kendo.jQuery(`#nationality-${i}`).kendoComboBox({
            placeholder: "Seleccione país...",
            filter: "contains",
            dataTextField: "descripcion",
            dataValueField: "codigo",
            dataSource: {
                transport: {
                    read: {
                        url: "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getPaises?empresa=EC",
                        dataType: "json",
                    },
                },
                schema: {
                    data: "data",
                },
            },
            change: (e) => {
                // Obtiene la instancia del dropdown de tipos de identificación
                const tipoIdentificacionDDL = kendo
                    .jQuery(`#idType-${i}`)
                    .data("kendoDropDownList");

                // Obtiene el valor seleccionado del ComboBox de nacionalidad.
                const selectedValue = e.sender.value();

                // Si se seleccionó un valor (no es nulo ni una cadena vacía)
                if (selectedValue) {
                    // Habilita el dropdown de tipos de identificación
                    tipoIdentificacionDDL.enable(true);

                    // Establece el nuevo dataSource para el dropdown de tipos de identificación
                    // Usando la URL del endpoint con el ID de país seleccionado.
                    tipoIdentificacionDDL.setDataSource(
                        new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: tiposIdentificacionEndpoint + selectedValue,
                                    dataType: "json",
                                },
                            },
                            schema: {
                                data: "data",
                            },
                        })
                    );

                    // Obliga al dataSource a leer los nuevos datos.
                    tipoIdentificacionDDL.dataSource.read();
                } else {
                    // Si no se seleccionó nada, deshabilita el dropdown
                    tipoIdentificacionDDL.enable(false);

                    // Limpia los datos del dropdown
                    tipoIdentificacionDDL.value(null);
                    tipoIdentificacionDDL.setDataSource(
                        new kendo.data.DataSource({ data: [] })
                    );
                }
            },
        });

        kendo.jQuery(`#birthdate-${i}`).kendoDatePicker({
            format: "dd/MM/yyyy",
            max: new Date(), // Bloquea fechas futuras
            adaptiveMode: "auto",   // activa modo adaptativo/mobile
            inputMode: "numeric"
            //...cultureDatePicker
        });

        document
            .getElementById(`idNumber-${i}`)
            .addEventListener("blur", (event) => {
                const identificacion = event.target.value;
                validarPasajero(identificacion);
            });

        document
            .getElementById(`close-passenger-${i}`)
            .addEventListener("click", (e) => {
                const index =
                    e.target?.id?.split("-")[e.target?.id?.split("-").length - 1];
                const elementeCard = document.getElementById(`card-passenger-${index}`);
                elementeCard.classList.add("d-none");
                document
                    .getElementById(`passenger-${index}`)
                    .classList.remove("d-none");
            });

        //Dar valores
        if (
            payloadGlobal.data &&
            payloadGlobal.data.tiquetes &&
            payloadGlobal.data.tiquetes.length > 0
        ) {
            const currenPassanger = payloadGlobal.data.tiquetes[i - 1];
            if (currenPassanger) {
                setTimeout(() => {
                    document.getElementById(`idNumber-${i}`).value =
                        currenPassanger.pasajero.numeroIdentificacion;
                    kendo
                        .jQuery(`#nationality-${i}`)
                        .data("kendoComboBox")
                        .value(currenPassanger.pasajero.pais);
                    kendo
                        .jQuery(`#idType-${i}`)
                        .data("kendoDropDownList")
                        .value(currenPassanger.pasajero.tipoIdentificacion);
                    document.getElementById(`first-name-${i}`).value =
                        currenPassanger.pasajero.primerNombre;
                    document.getElementById(`second-name-${i}`).value =
                        currenPassanger.pasajero.segundoNombre;
                    document.getElementById(`first-last-name-${i}`).value =
                        currenPassanger.pasajero.primerApellido;
                    document.getElementById(`second-last-name-${i}`).value =
                        currenPassanger.pasajero.segundoApellido;
                    kendo
                        .jQuery(`#birthdate-${i}`)
                        .data("kendoDatePicker")
                        .value(currenPassanger.pasajero.fechaNacimiento);
                    kendo
                        .jQuery(`#gender-${i}`)
                        .data("kendoComboBox")
                        .value(currenPassanger.pasajero.sexo);
                    document.getElementById(`phone-${i}`).value =
                        currenPassanger.pasajero.celular;
                    document.getElementById(`email-${i}`).value =
                        currenPassanger.pasajero.email;
                }, 200);
            }
        }
    }
    enableLiveValidation();
    container.on("click", ".passenger-card", function () {
        const elementeForm = this.nextElementSibling;
        this.classList.add("d-none");
        elementeForm.classList.remove("d-none");
    });
}

function enableLiveValidation() {
    document.querySelectorAll("#step4 input, #step4 select").forEach((field) => {
        field.addEventListener("input", () => validateField(field));
        field.addEventListener("change", () => validateField(field));
        field.addEventListener("blur", () => {
            toggleViewCardPassager(field);
        });
    });
}
function isValidFieldByPasseger(i) {
    return (
        !!document.getElementById(`idNumber-${i}`).value &&
        !!kendo.jQuery(`#nationality-${i}`).data("kendoComboBox").value() &&
        !!kendo.jQuery(`#idType-${i}`).data("kendoDropDownList").value() &&
        !!document.getElementById(`first-name-${i}`).value &&
        !!document.getElementById(`first-last-name-${i}`).value &&
        !!kendo.jQuery(`#birthdate-${i}`).data("kendoDatePicker").value() &&
        !!kendo.jQuery(`#gender-${i}`).data("kendoComboBox").value() &&
        !!document.getElementById(`phone-${i}`).value &&
        !!document.getElementById(`email-${i}`).value
    );
}
function getPassengerSummary(i) {
    const nombre = `${$("#first-name-" + i).val()} ${$(
        "#first-last-name-" + i
    ).val()}`;
    const id = $("#idNumber-" + i).val();
    return `
        <h6 class="mb-1">${nombre}</h6>
        <p class="mb-0 text-muted">ID: ${id}</p>
        <small class="text-primary">Toca para editar</small>
    `;
}
function toggleViewCardPassager(field) {
    const i = field?.id?.split("-")[field?.id?.split("-").length - 1];
    const showCardPasseger = isValidFieldByPasseger(i);
    const elementeCard = document.getElementById(`card-passenger-${i}`);
    if (showCardPasseger) {
        elementeCard.classList.remove("d-none");
        document.getElementById(`passenger-${i}`).classList.add("d-none");
        document.getElementById(`close-passenger-${i}`).classList.remove("d-none");
        const resumen = getPassengerSummary(i);
        elementeCard.getElementsByClassName("summary-view")[0].innerHTML = resumen;
        if (i == 0 && document.getElementById("copyContact").checked)
            setEmailPhoneOtherPassenger();
    }
    // else {
    //     elementeCard.classList.add('d-none');
    //     document.getElementById(`passenger-${i}`).classList.remove('d-none');
    // }
}
function validateAllField() {
    let isValidForm = true;
    document.querySelectorAll("#step4 input, #step4 select").forEach((field) => {
        isValidForm = field.checkValidity();
        isValidForm = isValidForm && field.required && field.value
        if (!isValidForm) return;
    });
    return isValidForm;
}

function validateField(field) {
    if (field.checkValidity()) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
    } else {
        field.classList.remove("is-valid");
        field.classList.add("is-invalid");
    }

    document.getElementById("addPassangers").disabled = !validateAllField();
}

// Cargar textos legales dinámicos
async function loadLegalTexts() {
    try {
        let nameFunction = "getTexto?type=politicas";
        let lappizFunctionId = "4ca92059-3b1b-4708-94f9-67c4215a5b75";
        let method = "GET";
        let body = {};
        let config = { nameFunction, lappizFunctionId, body, method };
        const response = await execLF(config);

        if (!response.error && response.html) {
            $("#legalTexts").html(response.html || "");
        }
    } catch (error) { }
}
// Botón para copiar contacto del primer pasajero al resto
function setEmailPhoneOtherPassenger() {
    const firstEmail = document.querySelector(".passenger-email")?.value;
    const firstPhone = document.querySelector(".passenger-phone")?.value;

    if (firstEmail && firstPhone) {
        document.querySelectorAll(".passenger-email").forEach((input, idx) => {
            if (idx > 0 && !input.value) input.value = firstEmail;
        });
        document.querySelectorAll(".passenger-phone").forEach((input, idx) => {
            if (idx > 0 && !input.value) input.value = firstPhone;
        });
    }
}
document.getElementById("copyContact").addEventListener("change", (e) => {
    if (e.target.checked) {
        setEmailPhoneOtherPassenger();
    }
});
function setEventBlurIdentificationPassager(element) {
    element.addEventListener("blur", (event) => {
        if (event.target.matches(".passenger-id")) {
            console.log("Evento blur detectado en el campo de identificación."); // Agregado para depuración
            const identificacion = event.target.value;
            validarPasajero(identificacion);
        }
    });
}
/**
 * Valida la identificación de un pasajero contra el servicio web.
 * @param {string} identificacion - El número de identificación del pasajero.
 */
async function validarPasajero(identificacion) {
    if (!identificacion) return;
    const cantidadPasajeros = selectedSeatsIda.length;
    let contadorCoincidencia = 0;
    for (let i = 1; i <= cantidadPasajeros; i++) {
        if (document.getElementById(`idNumber-${i}`).value == identificacion)
            contadorCoincidencia++;
        if (contadorCoincidencia == 2) {
            document.getElementById(`idNumber-${i}`).value = "";
            break;
        }
    }
    if (contadorCoincidencia == 2) {
        Swal.fire({
            title: "Pasajero registrado",
            text: `No puedes relacionar una persona a dos asientos.`,
            icon: "warning",
        });
        return;
    }

    // Obtener los datos necesarios para el endpoint.
    // Usamos el estado global, pero validamos su existencia.
    // empresa: d.empresa, fechaViaje: d.fechaViaje, ruta: d.ruta, hora: d.hora, codigoOrigen: d.codigoOrigen, codigoDestino: d.codigoDestino
    const lappizFunctionId = `9c9c5ef1-f72d-442f-8270-06042c002df5`;
    const nameFunction = "validarPasajero";
    const method = "POST";
    for (const linea of payloadGlobal.lineas) {
        const { codigoOrigen, codigoDestino, fechaViaje, hora, ruta, empresa } =
            linea;

        if (
            !codigoOrigen ||
            !codigoDestino ||
            !fechaViaje ||
            !hora ||
            !ruta ||
            !empresa
        ) {
            console.error(
                "Faltan datos en el objeto payloadGlobal para la validación del pasajero."
            );
            // Opcional: mostrar un mensaje al usuario para que complete los datos del viaje.
            return;
        }

        const body = {
            destino: codigoDestino,
            empresa: empresa,
            fechaviaje: fechaViaje,
            hora: hora,
            idCliente: identificacion,
            origen: codigoOrigen,
            ruta: ruta,
        };
        // Metodo encargado para ejecutar una lappoz function
        let config = { nameFunction, lappizFunctionId, body, method };
        try {
            const data = await execLF(config);
            if (data.data && data.data.nombrePasajero && data.data.puesto) {
                const mensaje = `¡Atención! El pasajero ${data.data.nombrePasajero} ya se encuentra registrado en el puesto ${data.data.puesto} para la misma ruta.`;
                Swal.fire({
                    title: "Pasajero Registrado",
                    text: mensaje,
                    icon: "warning",
                });
            }
        } catch (error) {
            console.error("Error al validar el pasajero:", error);
            Swal.fire({
                title: "Error de Conexión",
                text: "No se pudo validar el pasajero. Intenta de nuevo.",
                icon: "warning",
            });
        }
    }
}
/**
 * Valida que haya al menos un pasajero mayor de edad.
 * @returns {boolean} - true si hay un mayor de edad, false en caso contrario.
 */
function validatePassengerAges() {
    const birthDates = document.querySelectorAll('input[id^="birthdate-"]');
    const today = new Date();
    let hasAdult = false;
    birthDates.forEach((input) => {
        const kendoDatePicker = kendo.jQuery(input).data("kendoDatePicker");
        const birthDate = kendoDatePicker.value();

        if (birthDate && !hasAdult) {
            const age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            const d = today.getDate() - birthDate.getDate();

            if (age > 18 || (age === 18 && (m > 0 || (m === 0 && d >= 0)))) {
                hasAdult = true;
                return;
            }
            hasAdult = false;
        }
    });

    if (!hasAdult) {
        Swal.fire({
            title: "Atención",
            text: "La venta de tiquetes para menores de edad debe estar asociada a un pasajero mayor de edad. Por favor, asegúrate de que al menos un pasajero sea mayor de 18 años.",
            icon: "warning",
            confirmButtonText: "Entendido",
        });
        showStep(numberSteps.Pasajeros);
    }
    addPassagerPayload();
}
function addPassagerPayload() {
    const tiquetes = [];
    let numPassengers = selectedSeatsIda.length;
    const titularPago = {
        numeroIdentificacion: payloadGlobal.titularPago?.numeroIdentificacion || "",
        nombre: payloadGlobal.titularPago
            ? payloadGlobal.titularPago.primerNombre
                ? `${payloadGlobal.titularPago?.primerNombre} ${payloadGlobal.titularPago.primerApellido}`
                : payloadGlobal.titularPago.razonSocial
            : "",
    };
    while (numPassengers > 0) {
        const pasajero = {
            numeroIdentificacion: document.getElementById(`idNumber-${numPassengers}`)
                .value,
            pais: kendo
                .jQuery(`#nationality-${numPassengers}`)
                .data("kendoComboBox")
                .value(),
            tipoIdentificacion: kendo
                .jQuery(`#idType-${numPassengers}`)
                .data("kendoDropDownList")
                .value(),
            primerNombre: document.getElementById(`first-name-${numPassengers}`)
                .value,
            segundoNombre: document.getElementById(`second-name-${numPassengers}`)
                .value,
            primerApellido: document.getElementById(
                `first-last-name-${numPassengers}`
            ).value,
            segundoApellido: document.getElementById(
                `second-last-name-${numPassengers}`
            ).value,
            nombreCompleto: `${document.getElementById(`first-name-${numPassengers}`).value
                } ${document.getElementById(`second-name-${numPassengers}`).value
                    ? document.getElementById(`second-name-${numPassengers}`).value + " "
                    : ""
                }${document.getElementById(`first-last-name-${numPassengers}`).value}${document.getElementById(`second-last-name-${numPassengers}`).value
                    ? " " +
                    document.getElementById(`second-last-name-${numPassengers}`).value
                    : ""
                }`, // nuevo
            fechaNacimiento: formatDateISO(
                kendo
                    .jQuery(`#birthdate-${numPassengers}`)
                    .data("kendoDatePicker")
                    .value()
            ),
            sexo: kendo
                .jQuery(`#gender-${numPassengers}`)
                .data("kendoComboBox")
                .value(),
            celular: document.getElementById(`phone-${numPassengers}`).value,
            email: document.getElementById(`email-${numPassengers}`).value,
            edad: getAge(
                kendo
                    .jQuery(`#birthdate-${numPassengers}`)
                    .data("kendoDatePicker")
                    .value()
            ),
            empresa: "EC",
            departamento: "",
            ciudad: "",
            tipoPasajero: "A",
        };
        const ida = {
            tipoLinea: payloadGlobal.viajeIda.tipoLinea,
            tiquetes: getTiqueteTrayecto(numPassengers, "ida"),
        };
        const vuelta = {
            tipoLinea: payloadGlobal.fechaRegreso
                ? payloadGlobal.viajeRegreso.tipoLinea
                : "",
            tiquetes: payloadGlobal.fechaRegreso
                ? getTiqueteTrayecto(numPassengers, "vuelta")
                : [],
        };
        const nuevoTiquete = {
            pasajero,
            ida,
            vuelta,
            titularPago,
        };
        tiquetes.push(nuevoTiquete);
        numPassengers--;
    }
    payloadGlobal.data = { tiquetes, tipoFacturacion: "PS", viajeroGaviota: "S" };
}

function getTiqueteTrayecto(index, propositoViaje) {
    const tiquetes = [];
    const currenLinePorccess =
        payloadGlobal[propositoViaje == "ida" ? "viajeIda" : "viajeRegreso"].lineas;
    const seatsByTrayect =
        propositoViaje == "ida" ? selectedSeatsIda : selectedSeatsRegreso;
    const datosAgrupados = agruparPorRuta(
        currenLinePorccess,
        seatsByTrayect,
        index
    );
    datosAgrupados.forEach((linea) => {
        linea.data.forEach((currentTrayecto) => {
            console.log(currentTrayecto);
            if (currentTrayecto) {
                const newLinea = {
                    //"codClaseTDC1": "", //BORRADO
                    //"tipoTDC1": "", //BORRADO
                    //"codClase2": "", //BORRADO
                    //"codClaseTDC2": "", //BORRADO
                    //"tipoTDC2": "", //BORRADO
                    //"refTransferencia": "", //BORRADO
                    //"numeroAutorizacionPago": "12412414", //BORRADO
                    //"numeroLlamadaGenesis": "124124444", //BORRADO
                    //"metodoPagoPayu": 1, //BORRADO
                    //"voucher1": "", //BORRADO
                    //"numeroContrato": "", //BORRADO
                    //"numeroOrden": "", //BORRADO
                    //"identificacionCredito": "" //BORRADO
                    //"voucher2": "", //BORRADO
                    //"adic": 0, // BORRADO
                    //"impresora": "", //BORRADO
                    //"porcAdm": 0, //BORRADO
                    //"vlrPago2": 0,//BORRADO
                    //"valorSeguro": 0,//BORRADO
                    //"tipoPasajero": "A",//BORRADO
                    //"tiqueteNino": false,//BORRADO
                    ageAbordaje: "12", // que es?
                    terminalDatafono: "", //NUEVO
                    llaveTransaccionDatafono: "", //NUEVO
                    numeroBus: currentTrayecto.numeroBus,
                    placa: currentTrayecto.placa,
                    ageVenta: "20",
                    codDestino: currentTrayecto.codigoDestino,
                    empresa: currentTrayecto.empresa,
                    empresaUsuario: currentTrayecto.empresa,
                    fechaReal: currentTrayecto.fechaViaje,
                    fechaVenta: new Date()
                        .toISOString()
                        .replace("T", " ")
                        .replace("Z", ""), //2025-08-28 00:00:00.000",
                    fechaSalida: currentTrayecto.fechaSalida,
                    fechaViaje: currentTrayecto.fechaViaje,
                    fuente: "TIQ", // que es?
                    hora: currentTrayecto.hora,
                    horaReal: currentTrayecto.hora,
                    puesto: currentTrayecto.numero, //validar
                    ruta: currentTrayecto.ruta,
                    rutaReal: currentTrayecto.ruta,
                    tarifaEspecial: false,
                    ageTarifaEspecial: "", // que es?
                    tipoServicio: "54", // que es?
                    tipoVenta: "TNO", // que es?
                    usuario: "JCAUSAD1",
                    valorEstampilla: currentTrayecto.tarifa.valorEstampilla,
                    valorLista: currentTrayecto.tarifa.valorTarifa,
                    valorPagado:
                        currentTrayecto.tarifa.valorTarifa +
                        currentTrayecto.tarifa.valorEstampilla,
                    vlrPago1: currentTrayecto.tarifa.valorTarifa,
                    codigoFormato: "",
                    valorDescuento: 0,
                    codClaseEstampilla: "",
                    codigoConvenio: "",
                    consecutivo: 1,
                    taquilla: "T0",
                    fechaTurno: formatDateISO(new Date()), //"2025-08-28 00:00:00.000",
                    codigoTurno: "00",
                    consecutivoTurno: 1,
                    tipoTurno: "P",
                    codClase1: "PV",
                    ideSolicitante: "1140885430",
                };
                tiquetes.push(newLinea);
            }
        });
    });
    return tiquetes;
}

const agruparPorRuta = (datos, datosSillas, index) => {
    const grupos = datos
        .map((newItem) => {
            return newItem.data;
        })
        .reduce((acumulador, item) => {
            if (!acumulador[item.ruta]) {
                acumulador[item.ruta] = {
                    ruta: item.ruta,
                    data: [],
                };
            }
            const sillasSeleccionadasRuta = datosSillas.filter((silla) => silla.ruta);
            if (sillasSeleccionadasRuta[index - 1]) {
                acumulador[item.ruta].data.push({
                    ...item,
                    ...sillasSeleccionadasRuta[index - 1],
                });
            }
            return acumulador;
        }, {});
    return Object.values(grupos);
};
document.getElementById("lastStep4").addEventListener("click", async () => {
    const sw = await Swal.fire({
        text: `¿Esta seguro que quieres devolverte?\nse pueden perder los datos diligenciados`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, volver",
        cancelButtonText: "Cancelar",
    });
    if (!sw) return;
    await loadSegment(currentSegmentIndex);
    selectedSeats = payloadGlobal.isReturnSelected
        ? selectedSeatsRegreso
        : selectedSeatsIda;
    showStep(numberSteps.AsientosIdaRegreso); //MOSTRAR ASIENTOS
});
document.querySelector("#step5").addEventListener("showStep", validatePassengerAges);
document.getElementById("lastStep5").addEventListener("click", () => {
    showStep(numberSteps.Pasajeros);
});

document.getElementById("lastStep6").addEventListener("click", () => {
    showStep(numberSteps.TitularEsPasajero);
});
//#region LISTA DE PASAJEROS
function renderTitularSelection() {
    const container = document.getElementById("listPassangers");
    container.innerHTML = "";

    if (!payloadGlobal?.data?.tiquetes?.length) {
        container.innerHTML =
            "<p class='text-muted'>No hay pasajeros registrados.</p>";
        return;
    }

    payloadGlobal.data.tiquetes.forEach((t, index) => {
        const pasajero = t.pasajero;
        const nombreCompleto = `${pasajero.primerNombre || ""} ${pasajero.segundoNombre || ""
            } ${pasajero.primerApellido || ""} ${pasajero.segundoApellido || ""
            }`.trim();

        const card = document.createElement("div");
        card.className = "card shadow-sm p-2 mb-2 selectable-passenger";
        card.style.cursor = "pointer";
        card.dataset.index = index;
        card.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">${nombreCompleto}</h6>
              <p class="mb-0 text-muted">ID: ${pasajero.numeroIdentificacion}</p>
            </div>
            <div class="radio-indicator"></div>
          </div>
        `;

        card.addEventListener("click", () => selectTitular(index));
        container.appendChild(card);
    });
}
function selectTitular(index) {
    const cards = document.querySelectorAll(".selectable-passenger");
    cards.forEach((c) => c.classList.remove("active"));

    const selectedCard = document.querySelector(
        `.selectable-passenger[data-index='${index}']`
    );
    if (selectedCard) {
        selectedCard.classList.add("active");
    }

    // Guardamos el titularPago en payloadGlobal
    const pasajero = payloadGlobal.data.tiquetes[index].pasajero;
    payloadGlobal.titularPago = {
        ...pasajero,
        nombre: `${pasajero.primerNombre} ${pasajero.primerApellido}`,
    };
    payloadGlobal.data.tiquetes.map((currentTiquet) => {
        currentTiquet.titularPago = {
            numeroIdentificacion: payloadGlobal.titularPago.numeroIdentificacion,
            nombre: payloadGlobal.titularPago.nombre,
        };
        return currentTiquet;
    });
}
document.getElementById("titularSeleccionado").addEventListener("click", () => {
    titularEsPasajero = true;
});

document.getElementById("lastStep7").addEventListener("click", () => {
    showStep(numberSteps.TitularEsPasajero);
});

//#endregion
//#region Titular de factura
document
    .getElementById("btnTitularEsPasajero")
    .addEventListener("click", () => {
        renderTitularSelection();
        showStep(numberSteps.TitularPasajero); // aquí saltas directo al formulario de pasajeros
    });

document
    .getElementById("btnTitularNoPasajero")
    .addEventListener("click", () => {
        showStep(numberSteps.InformacionTitular);
    });
const origenesTIT = new kendo.data.DataSource({
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
const tipoIdSelect = kendo
    .jQuery("#titularTipoId")
    .kendoComboBox({
        dataTextField: "descripcion",
        dataValueField: "codigo",
        dataSource: origenesTIT,
        filter: "contains",
        //suggest: true,
        placeholder: "Selecciona...",
        minLength: 1,
        autoBind: true,
        noDataTemplate: "No hay coincidencias",
        highlightFirst: true,
        change: (e) => {
            if (e.sender.value() === "NT") {
                digContainer.classList.remove("d-none");
                razonSocialContainer.classList.remove("d-none");
                personaNaturalFields.classList.add("d-none");
            } else {
                digContainer.classList.add("d-none");
                razonSocialContainer.classList.add("d-none");
                personaNaturalFields.classList.remove("d-none");
            }
        },
    })
    .data("kendoComboBox");
const digContainer = document.getElementById("digContainer");
const razonSocialContainer = document.getElementById("razonSocialContainer");
const personaNaturalFields = document.getElementById("personaNaturalFields");

// Autocompletar DIG a partir del número de identificación
document.getElementById("titularNumeroId").addEventListener("input", (e) => {
    if (tipoIdSelect.value() === "NT") {
        document.getElementById("titularDig").value = calculateDV(e.target.value);
    }
});
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

// Submit del formulario de titular
document.getElementById("titularForm").addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
        title: "Éxito",
        text: "Datos del titular registrados correctamente.",
        icon: "success",
    });
    titularEsPasajero = false;
    payloadGlobal.titularPago = {
        tipoIdentificacion: tipoIdSelect.value(),
        numeroIdentificacion: document.getElementById("titularNumeroId").value,
        digitoVerificacion: document.getElementById("titularDig").value || null,
        razonSocial: document.getElementById("titularRazonSocial").value || null,
        primerNombre: document.getElementById("titularNombre1").value || null,
        segundoNombre: document.getElementById("titularNombre2").value || null,
        primerApellido: document.getElementById("titularApellido1").value || null,
        segundoApellido: document.getElementById("titularApellido2").value || null,
        email: document.getElementById("titularCorreo").value,
    };
    payloadGlobal.data.tiquetes.map((currentTiquet) => {
        currentTiquet.titularPago = {
            numeroIdentificacion: payloadGlobal.titularPago.nombre,
            nombre: payloadGlobal.titularPago.nombre,
        };
        return currentTiquet;
    });
    showStep(numberSteps.ServicioTraslado);
});

//#endregion

//#endregion

// --- Paso 5: Traslado opcional ---
let transferAdded = false;
let transferPricePerPassenger = 15000; // costo base por pasajero
let transferTotal = 0;

document.getElementById("noTransfer").addEventListener("click", () => {
    transferAdded = false;
    showStep(numberSteps.ResumenPago); // ir a resumen/pago
});

document.getElementById("yesTransfer").addEventListener("click", () => {
    document.getElementById("transferForm").classList.add("show");
});

document.getElementById("lastStep8").addEventListener("click", () => {
    let lastView = titularEsPasajero
        ? numberSteps.TitularPasajero
        : numberSteps.InformacionTitular;
    showStep(lastView);
});

// Calcular costo dinámico traslado
document
    .getElementById("transferPassengers")
    .addEventListener("input", updateTransferCost);
function updateTransferCost() {
    const passengers =
        parseInt(document.getElementById("transferPassengers").value) || 0;
    transferTotal = passengers * transferPricePerPassenger;
    document.getElementById("transferCost").textContent =
        transferTotal.toLocaleString();
}

// Confirmar traslado
document.getElementById("confirmTransfer").addEventListener("click", () => {
    transferAdded = true;
    updateTransferCost();
    showStep(numberSteps.ResumenPago);
});

document.getElementById("lastStep9").addEventListener("click", () => {
    showStep(numberSteps.ServicioTraslado);
});

// --- Paso 6: Resumen y cálculo de pago ---
function updateSummary() {
    const totalesIda = calcularTotales(payloadGlobal.viajeIda.lineas);
    payloadGlobal.precioTicket = totalesIda.total;
    payloadGlobal.precioBaseTicket = totalesIda.base;
    payloadGlobal.descuentoTicket = totalesIda.descuentos;
    payloadGlobal.valorAdicionales = totalesIda.adicionales;
    payloadGlobal.valorIva = totalesIda.valorIva;
    payloadGlobal.valorImpuestos = totalesIda.valorImpuestos;
    if (payloadGlobal.fechaRegreso) {
        const totalesVuelta = calcularTotales(payloadGlobal.viajeRegreso.lineas);
        payloadGlobal.precioTicket += totalesVuelta.total;
        payloadGlobal.precioBaseTicket += totalesVuelta.base;
        payloadGlobal.descuentoTicket += totalesVuelta.descuentos;
        payloadGlobal.valorAdicionales += totalesVuelta.adicionales;
        payloadGlobal.valorIva += totalesVuelta.valorIva;
        payloadGlobal.valorImpuestos += totalesVuelta.valorImpuestos;
    }
    const passengers = selectedSeatsIda.length;
    const ticketsTotal = payloadGlobal.precioBaseTicket;
    const discount = payloadGlobal.descuentoTicket * passengers || 0;

    // Extras simulados
    const baggage = passengers * payloadGlobal.valorAdicionales;
    const taxes = payloadGlobal.valorImpuestos;

    // Traslado (si aplica)
    let transfer = 0;
    if (transferAdded) {
        transfer = transferTotal;
        document.getElementById("summaryTransferRow").classList.remove("d-none");
    } else {
        document.getElementById("summaryTransferRow").classList.add("d-none");
    }

    // Total
    const total = ticketsTotal - discount + baggage + taxes + transfer;
    payloadGlobal.totalPagar = payloadGlobal.precioTicket + transfer;
    // Pintar valores
    document.getElementById("summaryPassengers").textContent = passengers;
    document.getElementById("summaryTickets").textContent =
        ticketsTotal.toLocaleString();
    document.getElementById("summaryDiscount").textContent =
        discount.toLocaleString();
    document.getElementById("summaryTransfer").textContent =
        transfer.toLocaleString();
    document.getElementById("extraBaggage").textContent =
        baggage.toLocaleString();
    // document.getElementById('extraInsurance').textContent = insurance.toLocaleString();
    // document.getElementById('extraNetwork').textContent = network.toLocaleString();
    document.getElementById("extraTaxes").textContent = taxes.toLocaleString();
    document.getElementById("summaryTotal").textContent = total.toLocaleString();
}

// Generar resumen al entrar al paso 5
document
    .querySelector(`#step${numberSteps.ResumenPago}`)
    .addEventListener("showStep", updateSummary);
document
    .querySelector(`#step${numberSteps.ResumenPago} .next`)
    .addEventListener("click", () => {
        showStep(numberSteps.MetodoPago);
    });
function simulatePayment() {
    showStep(numberSteps.ProcesarPago);
    // Mostrar spinner
    document.getElementById("paymentStatus").classList.remove("d-none");
    document.getElementById("paymentApproved").classList.add("d-none");
    document.getElementById("paymentRejected").classList.add("d-none");

    // Simular procesamiento de 2 segundos
    setTimeout(() => {
        document.getElementById("paymentStatus").classList.add("d-none");
        const success = Math.random() > 0.3; // 70% aprobado, 30% rechazado
        if (success) {
            // Mostrar aprobado
            document.getElementById("paymentApproved").classList.remove("d-none");
            // Generar QR dinámico con asientos y total
            const qrData = `Tiquete Brasilia\nAsientos: ${selectedSeatsIda?.join(
                ", "
            )}\nTotal: $${document.getElementById("summaryTotal").textContent}`;
            document.getElementById(
                "ticketQr"
            ).src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                qrData
            )}`;
        } else {
            // Mostrar rechazado
            document.getElementById("paymentRejected").classList.remove("d-none");
        }
    }, 2000);
}

// Reintentar pago
document.getElementById("retryPayment").addEventListener("click", () => {
    showStep(numberSteps.ResumenPago);
});

document.getElementById("btnPayuSubmit").addEventListener("click", async () => {
    try {
        // 🚨 Estos valores deberían venir calculados antes (del resumen)
        const total = normalizeAmount(payloadGlobal.totalPagar || 10000);
        const email = payloadGlobal.titularPago?.email || "test@test.com";
        const reference = "ORD-" + Date.now();
        let nameFunction = "generateSignature";
        let lappizFunctionId = "d5856670-bd74-49f0-8ef8-786580c6aefe";
        let method = "POST";
        let body = {
            referenceCode: reference,
            amount: total,
            currency: "COP",
            data: payloadGlobal,
        };
        let config = { nameFunction, lappizFunctionId, body, method };
        const { signature } = await execLF(config);
        // Rellenar formulario
        document.getElementById("payuReference").value = reference;
        document.getElementById("payuAmount").value = total;
        document.getElementById("payuTax").value = payloadGlobal.valorImpuestos;
        document.getElementById("payuBuyerEmail").value = email;
        document.getElementById("payuSignature").value = signature;

        // Enviar a PayU
        document.getElementById("payuForm").submit();
    } catch (err) {
        console.error("Error al preparar pago:", err);
        Swal.fire("Error", "No se pudo iniciar el pago con PayU", "error");
    }
});

//#region RESUMEN MODAL
// Función helper para calcular totales
function calcularTotales(lineas) {
    let base = 0,
        descuentos = 0,
        adicionales = 0,
        valorIva = 0,
        valorImpuestos = 0;
    const numPasajeros = selectedSeatsIda.length;
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
    return { base, descuentos, adicionales, total, valorIva, valorImpuestos };
}
function renderResumen() {
    const numPasajeros = selectedSeatsIda.length;

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
        <p class="h6 mb-0"><strong>${numPasajeros}</strong> ${numPasajeros === 1 ? "Pasajero" : "Pasajeros"
        }</p>
      </div>
    `;

    // Viaje de Ida
    const totalesIda = calcularTotales(payloadGlobal.viajeIda.lineas);
    resumenIda.innerHTML = `
        <p><span>Costo base</span><span>$${totalesIda.base.toLocaleString()}</span></p>
        <p><span>Descuentos</span><span class="text-success">- $${totalesIda.descuentos.toLocaleString()}</span></p>
        <p><span>Adicionales</span><span>$${totalesIda.adicionales.toLocaleString()}</span></p>
        <hr>
        <p class="font-weight-bold"><span>Total ida</span><span>$${totalesIda.total.toLocaleString()}</span></p>
    `;

    // Viaje de Regreso (si aplica)
    let totalesRegreso = { total: 0 };
    if (payloadGlobal.fechaRegreso && selectedSeatsRegreso.length > 0) {
        resumenRegresoCard.classList.remove("d-none");
        totalesRegreso = calcularTotales(payloadGlobal.viajeRegreso.lineas);
        resumenRegreso.innerHTML = `
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

$("#resumenCompra").click(() => {
    $("#resumenModal").modal("show");
});
//Recalcular cada vez que se abre el modal
$("#resumenModal").on("show.bs.modal", () => {
    renderResumen();
});
//#endregion

/* === Interceptor global de peticiones + loader visual ===
   Pegar al inicio de venta.js (antes de cualquier fetch / kendo/jQuery.ajax)
*/
(function () {
    // IDs y clases
    const LOADER_ID = "vb-global-loader";
    const STYLE_ID = "vb-global-loader-style";
    const HIDDEN_CL = "vb-hidden";

    // Inyectar estilos (si no existen)
    if (!document.getElementById(STYLE_ID)) {
        const css = `
      /* Loader pequeño y discreto en esquina */
      #${LOADER_ID} {
        position: fixed;
        top: 12px;
        right: 12px;
        z-index: 2147483647; /* muy arriba */
        background: rgba(255,255,255,0.95);
        border: 1px solid rgba(0,0,0,0.08);
        padding: 8px 12px;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        font-size: 0.95rem;
        color: #333;
        gap: 8px;
      }
      #${LOADER_ID} .vb-loader-text { white-space: nowrap; }
      .${HIDDEN_CL} { display: none !important; }
      /* Ajustes para dispositivos pequeños */
      @media (max-width: 420px) {
        #${LOADER_ID} { font-size: .85rem; padding: 6px 8px; top: 8px; right: 8px; }
        #${LOADER_ID} .spinner-border { width: 1rem; height: 1rem; }
      }
    `;
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    // Crear elemento loader si no existe
    let loader = document.getElementById(LOADER_ID);
    if (!loader) {
        loader = document.createElement("div");
        loader.id = LOADER_ID;
        loader.className = HIDDEN_CL;
        // Usamos spinner de Bootstrap si está cargado, si no se verá el texto al menos.
        loader.innerHTML = `
      <div class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></div>
      <div class="vb-loader-text">Obteniendo información…</div>
    `;
        document.body.appendChild(loader);
    }

    // Contador de peticiones pendientes y debounce para evitar parpadeos
    let pending = 0;
    let showTimer = null;
    const SHOW_DELAY_MS = 120; // evita que peticiones muy rápidas generen flash

    function scheduleShow() {
        pending++;
        // Si ya se está mostrando, nada más
        if (loader.classList.contains(HIDDEN_CL) && !showTimer) {
            showTimer = setTimeout(() => {
                loader.classList.remove(HIDDEN_CL);
                showTimer = null;
            }, SHOW_DELAY_MS);
        }
    }

    function scheduleHide() {
        pending = Math.max(0, pending - 1);
        // si quedan pendientes, no ocultar
        if (pending > 0) return;
        // si aún no se mostró (timer pendiente), cancelarlo
        if (showTimer) {
            clearTimeout(showTimer);
            showTimer = null;
            loader.classList.add(HIDDEN_CL);
            return;
        }
        // ocultar inmediatamente
        loader.classList.add(HIDDEN_CL);
    }

    /***** Interceptar fetch *****/
    if (window.fetch) {
        const _fetch = window.fetch.bind(window);
        window.fetch = async function (input, init) {
            scheduleShow();
            try {
                const resp = await _fetch(input, init);
                return resp;
            } catch (err) {
                // re-lanzamos el error para que el código que lo llamó lo maneje
                throw err;
            } finally {
                scheduleHide();
            }
        };
    }

    /***** Interceptar jQuery/Kendo Ajax *****/
    // Kendo usa jQuery.ajax internamente. Aprovechamos los eventos globales de jQuery.
    if (window.jQuery) {
        // Cuando arranque cualquier petición ajax de jQuery
        jQuery(document).ajaxStart(function () {
            scheduleShow();
        });
        // Cuando terminen todas las peticiones de jQuery
        jQuery(document).ajaxStop(function () {
            scheduleHide();
        });
    }

    // Fallback: interceptar XMLHttpRequest si hay código que no usa jQuery ni fetch
    (function () {
        const _open = window.XMLHttpRequest && window.XMLHttpRequest.prototype.open;
        if (!_open) return;
        const _send = window.XMLHttpRequest.prototype.send;
        window.XMLHttpRequest.prototype.send = function () {
            // Solo interceptamos si la instancia no es la de jQuery (evitado por ajaxStart/ajaxStop),
            // pero aun así es útil para otros usos.
            scheduleShow();
            this.addEventListener(
                "loadend",
                function () {
                    scheduleHide();
                },
                { once: true }
            );
            return _send.apply(this, arguments);
        };
    })();
})();

window.addEventListener("popstate", function (event) {
    event.preventDefault();
    event.returnValue = "";
    if (currentStep > 1) {
        showStep(lastStep);
        console.log(event);
        if (event.state) {
            console.log(
                "El usuario usó el botón de Atrás/Adelante o history.back()."
            );
            console.log("Estado restaurado:", event.state);
        } else {
            // Esto podría significar que volviste al estado inicial de la página
            console.log("Volviendo al estado inicial o a una URL sin estado.");
        }
    } else {
        event.preventDefault();
        event.returnValue = "";
    }
});
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
