console.log("Iniciar con la informacón de los pasajeros");
(async () => {
    // -----------------------
    // Inicialización y estado
    // -----------------------
    G_deleteHeaderPages();
    G_addStylePages();
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    const pouch = new G_PouchService();
    const compra = await pouch.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas();
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        //document.getElementById('resumenCompra').classList.add('d-none');
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
        conSeguro: !!compra.conSeguro,
        valorSeguroPerPassenger: Number(compra.valorSeguroPerPassenger) || 0,
        valorSeguroTotal: Number(compra.valorSeguroTotal) || 0,
        data: compra.data || null,
    };
    const titularPago = {
        numeroIdentificacion: "",
        nombre: "",
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
        let numPassengers = state.cantidadPasajeros;

        if (numPassengers === 0) {
            container.append("<p class='text-danger'>Debe seleccionar al menos un asiento.</p>");
            return;
        }

        // Regla de negocio: en ida y vuelta deben estar seleccionados los asientos de regreso
        const isRoundTrip = !!state.fechaRegreso;
        if (
            isRoundTrip &&
            (state.selectedSeatsRegreso?.[0]?.length === 0 ||
                state.selectedSeatsRegreso?.[0]?.length !== numPassengers)
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

        // Extraer asientos seleccionados para mostrarlos en la tarjeta resumen
        const getSeatsText = (idx) => {
            if (state.selectedSeatsIda && state.selectedSeatsIda.length > 0) {
                const seats = state.selectedSeatsIda.map(s => s[idx - 1]?.numero).filter(Boolean);
                return seats.map(s => `<span class="seat-badge">${s}</span>`).join(' ');
            }
            return `<span class="seat-badge">--</span>`;
        };

        for (let i = 1; i <= numPassengers; i++) {
            const formId = `passenger-${i}`;
            const isFirst = (i === 1);

            const form = `
    <!-- TARJETA COLAPSADA (ESTILO EXACTO MOCKUP) -->
    <div class="passenger-card-summary card p-3 mb-3 d-none ${isFirst ? 'is-titular-card' : ''}" id="card-${formId}" style="cursor: pointer;">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center gap-2">
                ${isFirst ? '<span class="titular-badge">Titular</span>' : '<span class="titular-badge d-none">Titular</span>'}
                <strong class="passenger-name-title pl-2" id="summary-name-${i}">Pasajero ${i}</strong>
            </div>
            <div class="d-flex align-items-center gap-1 text-muted font-weight-bold">
                <small>P${i}</small>
                <i class="fa fa-chevron-down ms-1" style="font-size: 0.8rem;"></i>
            </div>
        </div>
        <div class="d-flex align-items-center gap-3 text-muted summary-info-row" style="gap: 0.75rem;">
            <div class="d-flex align-items-center gap-1" style="gap: 0.25rem;">
                <img style="height: 20px;" src="https://runtimetest.lappiz.io/assets/images/Expreso/pasajero.svg" alt="Pasajeros">
                <span id="summary-type-${i}">Adulto: 1</span>
            </div>
            <div class="d-flex align-items-center gap-1" style="gap: 0.25rem;">
                <img style="height: 20px;" src="https://runtimetest.lappiz.io/assets/images/Expreso/asiento.svg" alt="Asiento">
                <span>Asiento:</span>
                <div class="d-inline-flex gap-1" id="summary-seats-${i}">
                    ${getSeatsText(i)}
                </div>
            </div>
        </div>
    </div>

    <!-- FORMULARIO VERTICAL (ESTILO EXACTO MOCKUP) -->
    <div class="passenger-form-card mb-3" id="${formId}">
        <div class="form-field-pill mb-2">
            <input name="usr-doc-${i}" type="number" autocomplete="new-user-document" class="custom-pill-input" id="idNumber-${i}" placeholder="No. de identificación" required />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input required id="nationality-${i}" class="custom-pill-kendo" placeholder="País del documento" />
        </div>

        <div class="form-field-pill mb-2">
            <input required id="idType-${i}" class="custom-pill-kendo" placeholder="Tipo de documento" />
        </div>

        <div class="form-field-pill mb-2">
            <input type="text" autocomplete="new-user-document" class="custom-pill-input" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="first-name-${i}" placeholder="Primer nombre" required />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input type="text" autocomplete="new-user-document" class="custom-pill-input" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="second-name-${i}" placeholder="Segundo nombre" />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input type="text" autocomplete="new-user-document" class="custom-pill-input" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="first-last-name-${i}" placeholder="Primer apellido" required />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input type="text" autocomplete="new-user-document" class="custom-pill-input" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,20}$" id="second-last-name-${i}" placeholder="Segundo apellido" />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input required id="birthdate-${i}" class="custom-pill-kendo" placeholder="Fecha de nacimiento" />
        </div>

        <div class="form-field-pill mb-2">
            <input type="text" readonly class="custom-pill-input readonly-input" id="age-${i}" placeholder="Edad" />
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="form-field-pill mb-2">
            <input required id="gender-${i}" class="custom-pill-kendo" placeholder="Sexo" />
        </div>

        <div class="form-field-pill mb-2">
            <input type="email" class="custom-pill-input passenger-email" id="email-${i}" placeholder="Email" required pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$">
            <i class="fa fa-times-circle clear-icon"></i>
        </div>

        <div class="row g-2 mb-2">
           <div class="col-5">
        <div class="form-field-pill">
            <input required id="indicador-phone-${i}" class="custom-pill-kendo" />
        </div>
    </div>
            <div class="col-7">
                <div class="form-field-pill">
                    <input type="tel" class="custom-pill-input passenger-phone" id="phone-${i}" placeholder="Celular" required pattern="^[0-9]{10}$">
                </div>
            </div>
        </div>
    </div>
    `;
            container.append(form);

            // Inicializadores Kendo Widgets con placeholders integrados
            kendo.jQuery(`#gender-${i}`).kendoComboBox({
                placeholder: "Sexo",
                dataTextField: "descripcion",
                dataValueField: "codigo",
                dataSource: [
                    { descripcion: "Masculino", codigo: "M" },
                    { descripcion: "Femenino", codigo: "F" },
                ],
                change: () => {
                    const field = document.getElementById(`gender-${i}`);
                    validateField(field);
                    toggleViewCardPassager(field);
                },
            });

            kendo.jQuery(`#idType-${i}`).kendoDropDownList({
                optionLabel: "Tipo de documento",
                dataTextField: "descripcion",
                dataValueField: "codigo",
                dataSource: [],
                enable: false,
                change: () => {
                    const field = document.getElementById(`idType-${i}`);
                    validateField(field);
                    toggleViewCardPassager(field);
                },
            });

            kendo.jQuery(`#nationality-${i}`).kendoComboBox({
                placeholder: "Pais del documento",
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
                    schema: { data: "data" },
                },
                change: (e) => {
                    const selectedValue = e.sender.value();
                    updateIdTypeForNationality(i, selectedValue);
                    const field = document.getElementById(`nationality-${i}`);
                    validateField(field);
                    toggleViewCardPassager(field);
                },
            });

            kendo.jQuery(`#birthdate-${i}`).kendoDatePicker({
                format: "dd/MM/yyyy",
                max: new Date(),
                adaptiveMode: "auto",
                placeholder: "Fecha de nacimiento",
                change: () => {
                    const field = document.getElementById(`birthdate-${i}`);
                    const dateVal = kendo.jQuery(`#birthdate-${i}`).data("kendoDatePicker").value();
                    if (dateVal) {
                        const calculatedAge = getAge(dateVal);
                        document.getElementById(`age-${i}`).value = calculatedAge >= 0 ? `${calculatedAge} años` : "";
                    }
                    validateField(field);
                    toggleViewCardPassager(field);
                }
            });

            kendo.jQuery(`#indicador-phone-${i}`).kendoDropDownList({
                dataSource: dataPaises,
                dataTextField: "Indicativo",
                dataValueField: "Indicativo",
                placeholder: "Código de país",
                template: '<div class="d-flex align-items-center gap-1"><img src="#: LinkBandera?.split("|")[2] #" alt="bandera" style="width:18px; height:12px; object-fit:cover;"> <span>#: Indicativo #</span></div>',
                valueTemplate: '<div class="d-flex align-items-center gap-1"><img src="#: LinkBandera?.split("|")[2] #" alt="bandera" style="width:18px; height:12px; object-fit:cover;"> <span>#: Indicativo #</span></div>',
                change: () => {
                    const field = document.getElementById(`indicador-phone-${i}`);
                    validateField(field);
                    toggleViewCardPassager(field);
                },
            });

            // Restaurar datos del pasajero si ya fueron guardados en una sesión anterior
            if (state.data && state.data.tiquetes && state.data.tiquetes.length > 0) {
                const currenPassanger = state.data.tiquetes[i - 1];
                if (currenPassanger) {
                    setTimeout(() => {
                        document.getElementById(`idNumber-${i}`).value =
                            currenPassanger.pasajero.numeroIdentificacion;
                        kendo
                            .jQuery(`#nationality-${i}`)
                            .data("kendoComboBox")
                            .value(currenPassanger.pasajero.pais);
                        updateIdTypeForNationality(i, currenPassanger.pasajero.pais);
                        applyIdTypeValue(i, currenPassanger.pasajero.tipoIdentificacion);
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
                        const ageEl = document.getElementById(`age-${i}`);
                        if (ageEl && currenPassanger.pasajero.fechaNacimiento) {
                            const restoredAge = getAge(new Date(currenPassanger.pasajero.fechaNacimiento));
                            ageEl.value = restoredAge >= 0 ? `${restoredAge} años` : "";
                        }
                        kendo
                            .jQuery(`#gender-${i}`)
                            .data("kendoComboBox")
                            .value(currenPassanger.pasajero.sexo);
                        document.getElementById(`phone-${i}`).value =
                            currenPassanger.pasajero.celular;
                        document.getElementById(`email-${i}`).value =
                            currenPassanger.pasajero.email;
                        togglePassengerViewIfComplete(i);
                        validateAllField();
                    }, 200);
                }
            }
            document.getElementById(`idNumber-${i}`).addEventListener("blur", (event) => {
                const identificacion = event.target.value;
                validarPasajero(identificacion, i);
                if (identificacion) {
                    fetchAndFillPassenger(identificacion, i);
                }
            });
        }

        enableLiveValidation();
        validateAllField();

        container.on("click", ".passenger-card-summary", function () {
            const elementeForm = this.nextElementSibling;
            this.classList.add("d-none");
            elementeForm.classList.remove("d-none");
        });
    }

    // Carga el DropDownList de tipos de documento según el país seleccionado
    function updateIdTypeForNationality(i, codigoPais) {
        const tipoIdentificacionDDL = kendo.jQuery(`#idType-${i}`).data("kendoDropDownList");
        if (!tipoIdentificacionDDL) return;
        if (codigoPais) {
            tipoIdentificacionDDL.enable(true);
            tipoIdentificacionDDL.setDataSource(
                new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: tiposIdentificacionEndpoint + codigoPais,
                            dataType: "json",
                        },
                    },
                    schema: { data: "data" },
                })
            );
            tipoIdentificacionDDL.dataSource.read();
        } else {
            tipoIdentificacionDDL.enable(false);
            tipoIdentificacionDDL.value(null);
            tipoIdentificacionDDL.setDataSource(new kendo.data.DataSource({ data: [] }));
        }
    }

    // Asigna el tipo de documento cuando el dataSource ya está cargado (async/i18n)
    function applyIdTypeValue(i, codigo) {
        if (!codigo) return;
        const widget = kendo.jQuery(`#idType-${i}`).data("kendoDropDownList");
        if (!widget) return;
        let intentos = 0;
        const intentar = () => {
            if (intentos > 30) return;
            intentos++;
            if (widget.dataSource.data().length > 0) {
                widget.value(codigo);
                const field = document.getElementById(`idType-${i}`);
                if (field) {
                    validateField(field);
                    toggleViewCardPassager(field);
                }
                validateAllField();
            } else {
                setTimeout(intentar, 120);
            }
        };
        intentar();
    }

    // Marca como titular al primer adulto (>=18) registrado; sin adultos, no hay titular
    function updateTitular() {
        let titularIndex = null;
        for (let i = 1; i <= state.cantidadPasajeros; i++) {
            const birthWidget = kendo.jQuery(`#birthdate-${i}`).data("kendoDatePicker");
            const birthDate = birthWidget ? birthWidget.value() : null;
            if (birthDate && getAge(birthDate) >= 18) {
                titularIndex = i;
                break;
            }
        }
        for (let i = 1; i <= state.cantidadPasajeros; i++) {
            const card = document.getElementById(`card-passenger-${i}`);
            if (!card) continue;
            card.classList.toggle("is-titular-card", i === titularIndex);
            const badge = card.querySelector(".titular-badge");
            if (badge) badge.classList.toggle("d-none", i !== titularIndex);
        }
        if (titularIndex) {
            titularPago.numeroIdentificacion = document.getElementById(`idNumber-${titularIndex}`)?.value || "";
            titularPago.nombre = `${document.getElementById(`first-name-${titularIndex}`)?.value || ""} ${document.getElementById(`first-last-name-${titularIndex}`)?.value || ""}`.trim();
        } else {
            titularPago.numeroIdentificacion = "";
            titularPago.nombre = "";
        }
    }

    function togglePassengerViewIfComplete(i) {
        if (!i) return;
        const elementeCard = document.getElementById(`card-passenger-${i}`);
        const elementeForm = document.getElementById(`passenger-${i}`);
        if (!elementeCard || !elementeForm) return;

        const showCardPasseger = isPassengerFormComplete(i);
        if (showCardPasseger) {
            elementeCard.classList.remove("d-none");
            elementeForm.classList.add("d-none");

            // Actualizar datos del header colapsado tipo mockup
            const fullName = `${$("#first-name-" + i).val()} ${$("#first-last-name-" + i).val()}`.trim();
            if (fullName) {
                $(`#summary-name-${i}`).text(fullName);
            }

            // Etiqueta Adulto/Menor según la fecha de nacimiento
            const birthWidget = kendo.jQuery(`#birthdate-${i}`).data("kendoDatePicker");
            const birthDate = birthWidget ? birthWidget.value() : null;
            const computedAge = birthDate ? getAge(birthDate) : null;
            const summaryType = document.getElementById(`summary-type-${i}`);
            if (summaryType) {
                summaryType.textContent = computedAge === null ? "Pasajero" : computedAge >= 18 ? "Adulto" : "Menor";
            }
            updateTitular();
        } else {
            elementeCard.classList.add("d-none");
            elementeForm.classList.remove("d-none");
        }
    }

    async function getTaxByAge(curretnDate, index) {

        if (!curretnDate) return;
        //llamar api para obtener tarifa
        const viaje = state.viajeIda;
        const lineas = viaje.lineas || [];
        let nameFunction = 'Tarifa';
        let lappizFunctionId = '159aed1f-241a-4260-8e4b-e09d5fd335e9';
        let method = 'POST';
        //lineas.forEach(linea => {
        // Metodo encargado para ejecutar una lappoz function
        const currentDataLinea = lineas[0].data || null;
        if (!currentDataLinea) return;
        let body = {
            "codEmpresa": currentDataLinea.empresa,
            "codDestino": currentDataLinea.codigoDestino,
            "fecha": currentDataLinea.fechaViaje,
            "codPromocion": null,
            "codConvenio": null,
            "ruta": currentDataLinea.ruta,
            "hora": currentDataLinea.hora,
            "fechaNacimiento": formatDateISO(curretnDate),
            "valorLista": currentDataLinea.tarifa.valorTarifa,
            "codAgencia": '', // Que se debe poner acá??
            "posicion": 1, // Esto es el numero del asieto seleccionado? si no es asi que es?
            "valorListaConexion": 0, // Como calculo este valor?
            "valorTarifaDesconexion": 0, // Como calculo este valor?
            "valorTarifaConexion": 0,// Como calculo este valor?
            "cortesia": 'N'
        }
        let config = { nameFunction, lappizFunctionId, body, method }
        const response = await execLF(config);
        if (response.error == true) {
            Swal.fire({
                title: "Problemas al obtener la tarifa",
                text: response.message,
                icon: "warning",
            });
            return;
        }
        return response.data;
        //});
        // if(state.fechaRegreso && state.isReturnSelected)
        //     getTaxByAge(curretnDate, index, true);
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
        document.querySelectorAll("#passengerForms input, #passengerForms select").forEach((field) => {
            const validateAndToggle = () => {
                validateField(field);
                toggleViewCardPassager(field);
            };
            field.addEventListener("input", validateAndToggle);
            field.addEventListener("change", validateAndToggle);
            field.addEventListener("blur", validateAndToggle);
        });
    }
    function isPassengerFormComplete(i) {
        const form = document.getElementById(`passenger-${i}`);
        if (!form) return false;

        const getKendoValue = (selector, widget) => {
            const instance = kendo.jQuery(selector).data(widget);
            return instance ? instance.value() : null;
        };

        const fields = {
            nationality: getKendoValue(`#nationality-${i}`, 'kendoComboBox'),
            idType: getKendoValue(`#idType-${i}`, 'kendoDropDownList'),
            birthdate: getKendoValue(`#birthdate-${i}`, 'kendoDatePicker'),
            gender: getKendoValue(`#gender-${i}`, 'kendoComboBox'),
            indicadorPhone: getKendoValue(`#indicador-phone-${i}`, 'kendoDropDownList'),
            phone: document.getElementById(`phone-${i}`)?.value,
            email: document.getElementById(`email-${i}`)?.value,
            idNumber: document.getElementById(`idNumber-${i}`)?.value,
            firstName: document.getElementById(`first-name-${i}`)?.value,
            firstLastName: document.getElementById(`first-last-name-${i}`)?.value,
        };

        const allRequiredHaveValue = Object.values(fields).every((value) => {
            return value !== undefined && value !== null && String(value).trim() !== "";
        });

        if (!allRequiredHaveValue) return false;

        const requiredFields = Array.from(form.querySelectorAll("input[required], select[required]"));
        const allValid = requiredFields.every((field) => field.checkValidity());
        return allValid;
    }

    function toggleViewCardPassager(field) {
        const i = field?.id?.split("-")[field?.id?.split("-").length - 1];
        togglePassengerViewIfComplete(i);
    }

    function validateAllField() {
        updateTitular();
        let isValidForm = true;
        for (let i = 1; i <= state.cantidadPasajeros; i++) {
            if (!isPassengerFormComplete(i)) {
                isValidForm = false;
                break;
            }
        }
        document.getElementById("addPassangers").disabled = !isValidForm;
        toggleExtrasVisibility(isValidForm);
        return isValidForm;
    }

    function toggleExtrasVisibility(show) {
        const insuranceSection = document.getElementById("insuranceSection");
        const legalSection = document.getElementById("legalSection");
        const continueBtn = document.getElementById("continueToPaymentBtn");
        if (insuranceSection) insuranceSection.classList.toggle("d-none", !show);
        if (legalSection) legalSection.classList.toggle("d-none", !show);
        if (continueBtn) continueBtn.disabled = !show;
    }

    function validateField(field) {
        if (field.checkValidity()) {
            field.classList.remove("is-invalid");
            field.classList.add("is-valid");
            toggleViewCardPassager(field);
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
        const firstPhoneIndicator = kendo.jQuery("#indicador-phone-1").data("kendoDropDownList")?.value();

        if (firstEmail && firstPhone) {
            document.querySelectorAll(".passenger-email").forEach((input, idx) => {
                if (idx > 0 && !input.value) input.value = firstEmail;
            });
            document.querySelectorAll(".passenger-phone").forEach((input, idx) => {
                if (idx > 0 && !input.value) input.value = firstPhone;
            });
            if (firstPhoneIndicator) {
                for (let idx = 2; idx <= state.cantidadPasajeros; idx++) {
                    const indicadorWidget = kendo.jQuery(`#indicador-phone-${idx}`).data("kendoDropDownList");
                    if (indicadorWidget && !indicadorWidget.value()) {
                        indicadorWidget.value(firstPhoneIndicator);
                    }
                }
            }

            document.querySelectorAll(".passenger-card-summary").forEach((card) => {
                const index = card.id.split("-").pop();
                togglePassengerViewIfComplete(index);
            });
            document.querySelectorAll(".passenger-email, .passenger-phone").forEach((field) => {
                validateField(field);
            });
            for (let idx = 2; idx <= state.cantidadPasajeros; idx++) {
                const indicatorField = document.getElementById(`indicador-phone-${idx}`);
                if (indicatorField) validateField(indicatorField);
            }
            document.getElementById("addPassangers").disabled = !validateAllField();
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
    async function validarPasajero(identificacion, currentIndex = null) {
        if (!identificacion) return;
        const cantidadPasajeros = state.cantidadPasajeros;
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
                linea.data || {};

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
     * Consulta el endpoint obtenerPasajero y completa el formulario del pasajero.
     * @param {string} identificacion
     * @param {number} index
     */
    async function fetchAndFillPassenger(identificacion, index) {
        if (!identificacion || !index) return;
        try {
            const url = `https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/obtenerPasajero/${identificacion}`;
            const res = await fetch(url);
            if (!res.ok) {
                console.warn('obtenerPasajero response not ok', res.status);
                return;
            }
            const json = await res.json();
            if (json.error) {
                console.log('obtenerPasajero: no data for', identificacion);
                return;
            }
            const d = json.data || {};

            // Rellenar campos simples
            const idEl = document.getElementById(`idNumber-${index}`);
            if (idEl) idEl.value = d.numeroIdentificacion || identificacion;

            const firstNameEl = document.getElementById(`first-name-${index}`);
            if (firstNameEl) firstNameEl.value = d.primerNombre || "";

            const secondNameEl = document.getElementById(`second-name-${index}`);
            if (secondNameEl) secondNameEl.value = d.segundoNombre || "";

            const firstLastEl = document.getElementById(`first-last-name-${index}`);
            if (firstLastEl) firstLastEl.value = d.primerApellido || "";

            const secondLastEl = document.getElementById(`second-last-name-${index}`);
            if (secondLastEl) secondLastEl.value = d.segundoApellido || "";

            const emailEl = document.getElementById(`email-${index}`);
            if (emailEl) emailEl.value = d.email || "";

            const phoneEl = document.getElementById(`phone-${index}`);
            if (phoneEl) phoneEl.value = d.celular || d.telefono || "";

            // Widgets Kendo
            const nationalityWidget = kendo.jQuery(`#nationality-${index}`).data("kendoComboBox");
            if (nationalityWidget && d.pais) {
                nationalityWidget.value(d.pais);
                updateIdTypeForNationality(index, d.pais);
            }

            const idTypeWidget = kendo.jQuery(`#idType-${index}`).data("kendoDropDownList");
            if (idTypeWidget && d.tipoIdentificacion) {
                applyIdTypeValue(index, d.tipoIdentificacion);
            }

            const birthWidget = kendo.jQuery(`#birthdate-${index}`).data("kendoDatePicker");
            if (birthWidget && d.fechaNacimiento) {
                const fecha = new Date(d.fechaNacimiento);
                birthWidget.value(fecha);
                const ageEl = document.getElementById(`age-${index}`);
                if (ageEl) {
                    const calculatedAge = getAge(fecha);
                    ageEl.value = calculatedAge >= 0 ? `${calculatedAge} años` : "";
                }
            }

            const genderWidget = kendo.jQuery(`#gender-${index}`).data("kendoComboBox");
            if (genderWidget && d.sexo) genderWidget.value(d.sexo);

            const indicadorWidget = kendo.jQuery(`#indicador-phone-${index}`).data("kendoDropDownList");
            if (indicadorWidget && d.prefijoTelefonico) {
                // intentar con y sin el +
                indicadorWidget.value(d.prefijoTelefonico);
                if (!indicadorWidget.value()) indicadorWidget.value(d.prefijoTelefonico.replace('+', ''));
            }

            // Validar todos los campos para actualizar estados y colapsado
            [
                idEl,
                firstNameEl,
                secondNameEl,
                firstLastEl,
                secondLastEl,
                emailEl,
                phoneEl,
                document.getElementById(`nationality-${index}`),
                document.getElementById(`birthdate-${index}`),
                document.getElementById(`gender-${index}`),
                document.getElementById(`indicador-phone-${index}`),
            ].forEach((f) => {
                if (f) validateField(f);
            });

            // Esperar carga asíncrona del tipo de documento y disparar colapso
            setTimeout(() => {
                validateField(document.getElementById(`idType-${index}`));
                togglePassengerViewIfComplete(index);
                validateAllField();
            }, 400);
        } catch (err) {
            console.error('Error fetching passenger data', err);
        }
    }
    /**
     * Valida que haya al menos un pasajero mayor de edad.
     * @returns {boolean} - true si hay un mayor de edad, false en caso contrario.
     */
    async function validatePassengerAges() {
        const birthDates = document.querySelectorAll('input[id^="birthdate-"]');
        const today = new Date();
        let hasAdult = true;
        let letterAutorizationRequired = false;
        let i = 0;
        for (const input of birthDates) {
            const kendoDatePicker = kendo.jQuery(input).data("kendoDatePicker");
            const birthDate = kendoDatePicker.value();
            const responseTaxAge = await getTaxByAge(birthDate, i);
            const age = getAge(birthDate);
            if (age >= 18 && titularPago.nombre == "") {
                titularPago.numeroIdentificacion = document.getElementById(`idNumber-${i + 1}`).value;
                titularPago.nombre = `${document.getElementById(`first-name-${i + 1}`).value} ${document.getElementById(`first-last-name-${i + 1}`).value}`;
            }
            if (responseTaxAge?.presentarDocumentoTaquilla == true) {
                letterAutorizationRequired = true;
            }

            if (responseTaxAge?.aplicaCustodio == 'S') {
                hasAdult = false;
                continue;
            }
            hasAdult = true;
            i++;
        };

        if (!hasAdult) {
            Swal.fire({
                title: "Atención",
                text: "La venta de tiquetes para menores de edad debe estar asociada a un pasajero mayor de edad. Por favor, asegúrate de que al menos un pasajero sea mayor de 18 años.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
            return;
        }
        if (letterAutorizationRequired) {
            Swal.fire({
                title: "Atención",
                text: "El menor debe presentar formato de permiso de padres en taquilla, antes del abordaje",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
        }
        addPassagerPayload();
        return true;
    }
    function addPassagerPayload() {
        const tiquetes = [];
        let numPassengers = state.cantidadPasajeros;
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

        pouch.guardarCompra({ ...state, titularEsPasajero: !!titularPago.nombre });
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
        //const currentAge = getAge(kendo.jQuery(`#birthdate-${numPassengers}`).data("kendoDatePicker").value())
        datosAgrupados.forEach((linea) => {
            linea.data.forEach((currentTrayecto) => {
                console.log(currentTrayecto);
                if (currentTrayecto) {
                    //const tarifa_pax = getTaxByAge(currentAge, currentTrayecto.numero, currentTrayecto)
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
                        valorSeguro: state.conSeguro ? state.valorSeguroPerPassenger : 0,
                        //"tipoPasajero": "A",//BORRADO
                        //"tiqueteNino": false,//BORRADO
                        ageAbordaje: "12", // que es?
                        terminalDatafono: "", //NUEVO
                        llaveTransaccionDatafono: "", //NUEVO
                        ageVenta: "20",
                        fuente: "TIQ", // que es?
                        tarifaEspecial: false,
                        ageTarifaEspecial: "", // que es?
                        tipoServicio: "54", // que es?
                        tipoVenta: "TNO", // que es?
                        usuario: "JCAUSAD1",
                        codigoFormato: "",
                        valorDescuento: 0,
                        codClaseEstampilla: "",
                        codigoConvenio: "",
                        consecutivo: 1,
                        taquilla: "T0",
                        codigoTurno: "00",
                        consecutivoTurno: 1,
                        tipoTurno: "P",
                        codClase1: "PV",
                        ideSolicitante: "1140885430",
                        numeroBus: currentTrayecto.numeroBus,
                        placa: currentTrayecto.placa,
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
                        hora: currentTrayecto.hora,
                        horaReal: currentTrayecto.hora,
                        puesto: currentTrayecto.numero, //validar
                        ruta: currentTrayecto.ruta,
                        rutaReal: currentTrayecto.ruta,
                        valorEstampilla: currentTrayecto.tarifa.valorEstampilla,
                        valorLista: currentTrayecto.tarifa.valorTarifa,
                        valorPagado:
                            currentTrayecto.tarifa.valorTarifa +
                            currentTrayecto.tarifa.valorEstampilla,
                        vlrPago1: currentTrayecto.tarifa.valorTarifa,
                        fechaTurno: formatDateISO(new Date()), //"2025-08-28 00:00:00.000",
                    };
                    tiquetes.push(newLinea);
                }
            });
        });
        return tiquetes;
    }

    const agruparPorRuta = (datos, datosSillas, index) => {
        const grupos = {}
        datosSillas.forEach(puestosTrayectos => {
            const puesto = puestosTrayectos[index - 1];
            grupos[puesto.ruta] = grupos[puesto.ruta] ? grupos[puesto.ruta] : {
                ruta: puesto.ruta,
                data: []
            };
            const trayecto = datos.filter(trayectoActual => trayectoActual.data.ruta == puesto.ruta);
            grupos[puesto.ruta].data.push({ ...puesto, ...trayecto[0].data });
        });

        return Object.values(grupos);
    };

    async function loadLegalTexts() {
        try {
            const nameFunction = "getTexto?type=politicas";
            const lappizFunctionId = "4ca92059-3b1b-4708-94f9-67c4215a5b75";
            const body = {};
            const config = { nameFunction, lappizFunctionId, body, method: "GET" };
            const response = await execLF(config);
            if (!response.error && response.html) {
                $("#legalTexts").html(response.html || "");
            }
        } catch (error) { }
    }

    async function getInsuranceValuePerPassenger(birthDate) {
        if (!birthDate) return 0;
        const viaje = state.viajeIda;
        const lineas = viaje.lineas || [];
        const currentDataLinea = lineas[0]?.data || null;
        if (!currentDataLinea) return 0;
        try {
            const body = {
                codEmpresa: currentDataLinea.empresa,
                codDestino: currentDataLinea.codigoDestino,
                fecha: currentDataLinea.fechaViaje,
                codPromocion: null,
                codConvenio: null,
                ruta: currentDataLinea.ruta,
                hora: currentDataLinea.hora,
                fechaNacimiento: formatDateISO(birthDate),
                valorLista: currentDataLinea.tarifa.valorTarifa,
                codAgencia: "",
                posicion: 1,
                valorListaConexion: 0,
                valorTarifaDesconexion: 0,
                valorTarifaConexion: 0,
                cortesia: "N",
            };
            const config = {
                nameFunction: "Tarifa",
                lappizFunctionId: "159aed1f-241a-4260-8e4b-e09d5fd335e9",
                body,
                method: "POST",
            };
            const response = await execLF(config);
            if (response.error) return 0;
            const valor =
                response.data?.valorSeguro ??
                response.data?.seguro ??
                response.data?.valorSeguroViajero ??
                response.data?.tarifa?.valorSeguro ??
                0;
            return Number(valor) || 0;
        } catch (err) {
            console.error("Error consultando el valor del seguro", err);
            return 0;
        }
    }

    async function onInsuranceToggle() {
        const checked = document.getElementById("travelInsuranceSwitch").checked;
        const amountEl = document.getElementById("insurancePerPassenger");
        let total = 0;
        let unitario = 0;
        if (checked) {
            for (let i = 1; i <= state.cantidadPasajeros; i++) {
                const birthWidget = kendo.jQuery(`#birthdate-${i}`).data("kendoDatePicker");
                const birthDate = birthWidget ? birthWidget.value() : null;
                total += await getInsuranceValuePerPassenger(birthDate);
            }
            unitario = state.cantidadPasajeros
                ? Math.round(total / state.cantidadPasajeros)
                : 0;
            if (amountEl) amountEl.textContent = "$" + unitario.toLocaleString();
        } else {
            if (amountEl) amountEl.textContent = "$0";
        }
        state.conSeguro = checked;
        state.valorSeguroPerPassenger = checked ? unitario : 0;
        state.valorSeguroTotal = checked ? total : 0;
        await pouch.guardarCompra({ ...state });
    }

    function clearPassengerForms() {
        for (let i = 1; i <= state.cantidadPasajeros; i++) {
            ["idNumber", "first-name", "second-name", "first-last-name", "second-last-name", "phone", "email", "age"].forEach((prefix) => {
                const el = document.getElementById(`${prefix}-${i}`);
                if (el) {
                    el.value = "";
                    el.classList.remove("is-valid", "is-invalid");
                }
            });
            const setNull = (selector, widget) => {
                const w = kendo.jQuery(selector).data(widget);
                if (w) w.value(null);
            };
            setNull(`#nationality-${i}`, "kendoComboBox");
            setNull(`#gender-${i}`, "kendoComboBox");
            setNull(`#birthdate-${i}`, "kendoDatePicker");
            setNull(`#indicador-phone-${i}`, "kendoDropDownList");
            const idTypeDDL = kendo.jQuery(`#idType-${i}`).data("kendoDropDownList");
            if (idTypeDDL) {
                idTypeDDL.value(null);
                idTypeDDL.enable(false);
                idTypeDDL.setDataSource(new kendo.data.DataSource({ data: [] }));
            }
            const card = document.getElementById(`card-passenger-${i}`);
            const form = document.getElementById(`passenger-${i}`);
            if (card) card.classList.add("d-none");
            if (form) form.classList.remove("d-none");
        }
        const insuranceSwitch = document.getElementById("travelInsuranceSwitch");
        if (insuranceSwitch) insuranceSwitch.checked = false;
        const amountEl = document.getElementById("insurancePerPassenger");
        if (amountEl) amountEl.textContent = "$0";
        state.conSeguro = false;
        state.valorSeguroPerPassenger = 0;
        state.valorSeguroTotal = 0;
        state.data = null;
        titularPago.numeroIdentificacion = "";
        titularPago.nombre = "";
        pouch.guardarCompra({ ...state });
        updateTitular();
        validateAllField();
    }

    document.getElementById("closeModalBtn").addEventListener("click", async () => {
        const sw = await Swal.fire({
            text: `¿Esta seguro que quieres devolverte?\nse pueden perder los datos diligenciados`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, volver",
            cancelButtonText: "Cancelar",
        });
        if (!sw.isConfirmed) return;
        goLocation('#/page/sillas/ExpresoBrasilia_Lappiz');
    });

    document.getElementById("clearPassengersBtn").addEventListener("click", clearPassengerForms);

    document.getElementById("addPassangers").addEventListener("click", async () => {
        const saved = await validatePassengerAges();
        if (saved) {
            Swal.fire({
                title: "Guardado",
                text: "Los cambios se guardaron correctamente.",
                icon: "success",
                confirmButtonText: "Entendido",
            });
        }
    });

    document.getElementById("travelInsuranceSwitch").addEventListener("change", onInsuranceToggle);

    document.getElementById("continueToPaymentBtn").addEventListener("click", () => {
        if (!validateAllField()) {
            Swal.fire({
                title: "Atención",
                text: "Completa la información de todos los pasajeros antes de continuar a pago.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
            return;
        }
        addPassagerPayload();
        goLocation('#/page/metodoPago/ExpresoBrasilia_Lappiz');
    });

    if (state.conSeguro && state.valorSeguroPerPassenger > 0) {
        const insuranceSwitch = document.getElementById("travelInsuranceSwitch");
        const amountEl = document.getElementById("insurancePerPassenger");
        if (insuranceSwitch) insuranceSwitch.checked = true;
        if (amountEl) amountEl.textContent = "$" + state.valorSeguroPerPassenger.toLocaleString();
    }
    loadLegalTexts();
})();