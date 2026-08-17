(async () => {
    // -----------------------
    // Inicialización y estado
    // -----------------------
    await G_addHeaderPages();
    const pouch = new G_PouchService();
    const compra = await pouch.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas()
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        document.getElementById('resumenCompra').classList.add('d-none');
    }
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
        totalSegments: Number(compra.totalSegments || (compra.viajeIda?.lineas?.length || 1)),
        selectedSeatsIda: Array.isArray(compra.selectedSeatsIda) ? [...compra.selectedSeatsIda] : [],
        selectedSeatsRegreso: Array.isArray(compra.selectedSeatsRegreso) ? [...compra.selectedSeatsRegreso] : [],
    };
    const tiposIdentificacionEndpoint = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacion?empresa=EC&pais=";
    // Metodo encargado para ejecutar una lappoz function
    let nameFunction = 'Paises';
    let lappizFunctionId = '5e011a16-1643-48ed-bbbd-5a3853a62ba8';
    let body = null
    let method = 'GET'
    let config = { nameFunction, lappizFunctionId, body, method }
    const dataPaises = await execLF(config);

    buildPassengerForms();

    function buildPassengerForms() {
        const container = $("#passengerForms");
        container.empty();
        let numPassengers = state.selectedSeatsIda.length;
        if (numPassengers === 0) {
            container.append(
                "<p class='text-danger'>Debe seleccionar al menos un asiento.</p>"
            );
            return;
        }
        const isRoundTrip = !!state.fechaRegreso;
        if (
            isRoundTrip &&
            (state.selectedSeatsRegreso.length === 0 ||
                state.selectedSeatsRegreso.length != numPassengers)
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
            <input required id="indicador-phone-${i}" style="width:30%" />
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

            kendo.jQuery(`#indicador-phone-${i}`).kendoDropDownList({
                dataSource: dataPaises,
                dataTextField: "text",
                dataValueField: "value",
                placeholder: "Seleccione",
                template: '<img src="#: LinkBandera?.split("|")[2] #" alt="Bandera" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle;"><span>#: Indicativo #</span>',
                valueTemplate: '<img src="#: LinkBandera?.split("|")[2] #" alt="Bandera" style="width: 20px; height: 15px; margin-right: 5px; vertical-align: middle;"><span>#: Indicativo #</span>',
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
                state.data &&
                state.data.tiquetes &&
                state.data.tiquetes.length > 0
            ) {
                const currenPassanger = state.data.tiquetes[i - 1];
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

    //#region: FUNCIONES GENERALES
    function formatDateISO(d) {
        const iso = new Date(d);
        const y = iso.getFullYear();
        const m = String(iso.getMonth() + 1).padStart(2, "0");
        const day = String(iso.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }
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
    //#endregion
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
        const cantidadPasajeros = state.selectedSeatsIda.length;
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
        const lineas = state.fechaRegreso ? [...state.viajeIda.lineas, ...state.viajeRegreso.lineas] : [...state.viajeIda.lineas];
        for (const linea of lineas) {
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
                    "Faltan datos en el objeto state para la validación del pasajero."
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
            //showStep(numberSteps.Pasajeros);
        }
        addPassagerPayload();
        goLocation("#/page/estitular/ExpresoBrasilia_Lappiz");
    }
    function addPassagerPayload() {
        const tiquetes = [];
        let numPassengers = state.selectedSeatsIda.length;
        const titularPago = {
            numeroIdentificacion: state.titularPago?.numeroIdentificacion || "",
            nombre: state.titularPago
                ? state.titularPago.primerNombre
                    ? `${state.titularPago?.primerNombre} ${state.titularPago.primerApellido}`
                    : state.titularPago.razonSocial
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
                tipoLinea: state.viajeIda.tipoLinea,
                tiquetes: getTiqueteTrayecto(numPassengers, "ida"),
            };
            const vuelta = {
                tipoLinea: state.fechaRegreso
                    ? state.viajeRegreso.tipoLinea
                    : "",
                tiquetes: state.fechaRegreso
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
        state.data = { tiquetes, tipoFacturacion: "PS", viajeroGaviota: "S" };
        pouch.guardarCompra({ ...state });
    }

    function getTiqueteTrayecto(index, propositoViaje) {
        const tiquetes = [];
        const currenLinePorccess =
            state[propositoViaje == "ida" ? "viajeIda" : "viajeRegreso"].lineas;
        const seatsByTrayect =
            propositoViaje == "ida" ? state.selectedSeatsIda : state.selectedSeatsRegreso;
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
        goLocation('#/page/sillas/ExpresoBrasilia_Lappiz');
    });
    document.getElementById("addPassangers").addEventListener("click", validatePassengerAges)
})();