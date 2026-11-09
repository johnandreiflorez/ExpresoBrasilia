(async () => {
    // -----------------------
    // InicializaciÃ³n y estado
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

    function normalizeAmount(amount) {
        let num = parseFloat(amount);

        if (Number.isNaN(num)) {
            throw new Error(`El valor amount no es numÃ©rico: ${amount}`);
        }

        // Convertir a string con 2 decimales para analizar
        let [entero, dec] = num.toFixed(2).split(".");
        dec = dec || "00";

        const d1 = parseInt(dec[0]); // primer decimal
        const d2 = parseInt(dec[1]); // segundo decimal

        // Caso especial: exacto .00 â†’ dejar como .0
        if (d1 === 0 && d2 === 0) {
            return `${entero}.0`;
        }

        // Aplicar round half to even
        if (d2 === 5) {
            if (d1 % 2 === 0) {
                // primer decimal par â†’ redondea hacia abajo
                return `${entero}.${d1}`;
            } else {
                // primer decimal impar â†’ redondea hacia arriba
                return `${entero}.${d1 + 1}`;
            }
        } else {
            // Redondeo normal a 1 decimal
            return (Math.round(num * 10) / 10).toFixed(1);
        }
    }

    document.getElementById('btnBack').addEventListener('click', () => {
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
    });

})();
