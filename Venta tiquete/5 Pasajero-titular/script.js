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
    document.getElementById("btnTitularEsPasajero").addEventListener("click", () => {
        pouch.guardarCompra({ ...compra, titularEsPasajero: true })
        goLocation('#/page/listaPasajeros/ExpresoBrasilia_Lappiz');
    });
    document.getElementById("btnTitularNoPasajero").addEventListener("click", () => {
        pouch.guardarCompra({ ...compra, titularEsPasajero: false })
        goLocation('#/page/titular/ExpresoBrasilia_Lappiz');
    });

    document.getElementById("lastStep5").addEventListener('click', () => {
        goLocation('#/page/pasajeros/ExpresoBrasilia_Lappiz');
    })
})();