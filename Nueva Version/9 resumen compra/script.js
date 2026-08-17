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
        await pouch.limpiarExpiradas()
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        //document.getElementById('resumenCompra').classList.add('d-none');
    }
    const ROLES = {
        12: { porcentajeDescuento: "porcentajeDescAuxiliar" },
        22: { porcentajeDescuento: "porcentajeDescDirector" },
        23: { porcentajeDescuento: "porcentajeDescEspecial" },
    };
    const ROL = sessionStorage.roleId || "";
    updateSummary();
    function calcularTotales(lineas) {
        let base = 0,
            descuentos = 0,
            adicionales = 0,
            valorIva = 0,
            valorImpuestos = 0;
        const numPasajeros = compra.cantidadPasajeros;
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
    function updateSummary() {
        const totalesIda = calcularTotales(compra.viajeIda.lineas);
        compra.precioTicket = totalesIda.total;
        compra.precioBaseTicket = totalesIda.base;
        compra.descuentoTicket = totalesIda.descuentos;
        compra.valorAdicionales = totalesIda.adicionales;
        compra.valorIva = totalesIda.valorIva;
        compra.valorImpuestos = totalesIda.valorImpuestos;
        if (compra.fechaRegreso) {
            const totalesVuelta = calcularTotales(compra.viajeRegreso.lineas);
            compra.precioTicket += totalesVuelta.total;
            compra.precioBaseTicket += totalesVuelta.base;
            compra.descuentoTicket += totalesVuelta.descuentos;
            compra.valorAdicionales += totalesVuelta.adicionales;
            compra.valorIva += totalesVuelta.valorIva;
            compra.valorImpuestos += totalesVuelta.valorImpuestos;
        }
        const passengers = compra.cantidadPasajeros;
        const ticketsTotal = compra.precioBaseTicket;
        const discount = compra.descuentoTicket * passengers || 0;

        // Extras simulados
        const baggage = passengers * compra.valorAdicionales;
        const taxes = compra.valorImpuestos;

        // Traslado (si aplica)
        let transfer = 0;
        // if (transferAdded) {
        //     transfer = transferTotal;
        //     document.getElementById("summaryTransferRow").classList.remove("d-none");
        // } else {
        //     document.getElementById("summaryTransferRow").classList.add("d-none");
        // }

        // Total
        const total = ticketsTotal - discount + baggage + taxes + transfer;
        compra.totalPagar = compra.precioTicket + transfer;
        // Pintar valores
        document.getElementById("summaryTicketsUnitary").textContent = (ticketsTotal / passengers).toLocaleString();
        document.getElementById("destinoOrigen").textContent = compra.origen + " - " + compra.destino;
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
        pouch.guardarCompra(compra);
    }
    document.getElementById("nextStep").addEventListener("click", () => {
        goLocation('#/page/metodoPago/ExpresoBrasilia_Lappiz');
    });
    document.getElementById("lastStep").addEventListener("click", () => {
        goLocation('#/page/textoLegal/ExpresoBrasilia_Lappiz');
    });
})();