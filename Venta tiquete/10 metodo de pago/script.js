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

    document.getElementById("btnPayuSubmit").addEventListener("click", async () => {
        try {
            // 🚨 Estos valores deberían venir calculados antes (del resumen)
            const total = normalizeAmount(compra.totalPagar || 10000);
            const email = compra.titularPago?.email || "test@test.com";
            const reference = "ORD-" + Date.now();
            let nameFunction = "generateSignature";
            let lappizFunctionId = "d5856670-bd74-49f0-8ef8-786580c6aefe";
            let method = "POST";
            let body = {
                referenceCode: reference,
                amount: total,
                currency: "COP",
                data: compra,
            };
            let config = { nameFunction, lappizFunctionId, body, method };
            const { signature } = await execLF(config);
            // Rellenar formulario
            document.getElementById("payuReference").value = reference;
            document.getElementById("payuAmount").value = total;
            document.getElementById("payuTax").value = compra.valorImpuestos;
            document.getElementById("payuBuyerEmail").value = email;
            document.getElementById("payuSignature").value = signature;
            // Guardar compra
            compra.tipo = "pago";
            await pouch.guardarCompra(compra);
            try {
                await pouch.destruir();
            } catch (err) {
                console.error("Error destruyendo pouchDB:", err);
            }
            // Enviar a PayU
            document.getElementById("payuForm").submit();
        } catch (err) {
            console.error("Error al preparar pago:", err);
            Swal.fire("Error", "No se pudo iniciar el pago con PayU", "error");
        }
    });
    document.getElementById("btnBack").addEventListener("click", () => {
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
    });

})();