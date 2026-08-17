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
    const tiposIdentificacionTitularEndpoint = "https://txtest.lappiz.io/ExpresoBrasilia_Lappiz.api/api/functions/getTiposIdentificacionTitular?empresa=EC&portal=S&titular=S";

    const digContainer = document.getElementById("digContainer");
    const razonSocialContainer = document.getElementById("razonSocialContainer");
    const personaNaturalFields = document.getElementById("personaNaturalFields");

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
    const tipoIdSelect = kendo.jQuery("#titularTipoId").kendoComboBox({
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
    }).data("kendoComboBox");

    // Autocompletar DIG a partir del número de identificación
    document.getElementById("titularNumeroId").addEventListener("input", (e) => {
        if (tipoIdSelect.value() === "NT") {
            document.getElementById("titularDig").value = calculateDV(e.target.value);
        }
    });

    //Validar documento para autocompletar información
    document.getElementById("titularNumeroId").addEventListener("change", async (e) => {
        const value = e.target.value;
        if (!value) {
            Swal.fire({
                title: "Datos obligatorios",
                text: "El documento de identificación es requerido.",
                icon: "success",
            });
            return;
        }
        try {
            let nameFunction = "obtenerPasajero?numDocumento=" + value;
            let lappizFunctionId = "ed4e119c-e5df-451b-9773-999319b575c6";
            let method = "GET";
            let body = {};
            let config = { nameFunction, lappizFunctionId, body, method };
            const response = await execLF(config);
            if (response.status)
                fillData(response.data);
        } catch (error) { }
    });
    if (compra.titularPago) {
        fillData(compra.titularPago);
        document.getElementById("titularNumeroId").value = compra.titularPago.numeroIdentificacion;
        document.getElementById("titularDig").value = compra.titularPago.digitoVerificacion;
        tipoIdSelect.value(compra.titularPago.tipoIdentificacion);
        tipoIdSelect.trigger("change");
    }

    function fillData(data) {
        //DATOS DE LA API
        //("id.empresa","id.numeroIdentificacion","primerNombre","segundoNombre","primerApellido","segundoApellido","nombreCompleto","pais","descripcionPais","email","telefono","celular","direccion","sexo","fechaNacimiento","lector", "tipoIdentificacion", "descripcionTipoIdentificacion")
        document.getElementById("titularRazonSocial").value = data?.razonSocial || data.nombreCompleto || "";
        document.getElementById("titularNombre1").value = data.primerNombre || "";
        document.getElementById("titularNombre2").value = data.segundoNombre || "";
        document.getElementById("titularApellido1").value = data.primerApellido || "";
        document.getElementById("titularApellido2").value = data.segundoApellido || "";
        document.getElementById("titularCorreo").value = data.email || "";
    }

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
    document.getElementById("submintTitular").addEventListener("click", async (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Éxito",
            text: "Datos del titular registrados correctamente.",
            icon: "success",
        });
        compra.titularPago = {
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
        compra.data.tiquetes.map((currentTiquet) => {
            currentTiquet.titularPago = {
                numeroIdentificacion: compra.titularPago.numeroIdentificacion,
                nombre: compra.titularPago.primerNombre + " " + compra.titularPago.primerApellido,
            };
            return currentTiquet;
        });
        await pouch.guardarCompra({ ...compra });
        goLocation("#/page/resumenCompra/ExpresoBrasilia_Lappiz");
    });

    document.getElementById("lastStep6").addEventListener("click", () => {
        goLocation("#/page/estitular/ExpresoBrasilia_Lappiz");
    })
})();