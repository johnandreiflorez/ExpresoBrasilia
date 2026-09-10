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
    loadLegalTexts();
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
    document.getElementById("btnCancelar").addEventListener("click", () => {
        if (compra.titularEsPasajero)
            goLocation("#/page/pasajeros/ExpresoBrasilia_Lappiz");
        else
            goLocation('#/page/titular/ExpresoBrasilia_Lappiz');
    });
    document.getElementById("btnAceptar").addEventListener("click", () => {
        goLocation("#/page/resumenCompra/ExpresoBrasilia_Lappiz");
    });
})();