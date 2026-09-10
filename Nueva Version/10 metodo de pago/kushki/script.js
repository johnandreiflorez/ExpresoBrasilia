const PUBLIC_KEY = "fc746c9c632e4163a7565514ca34a2e5";
(async () => {
    // -----------------------
    // Inicialización y estado
    // -----------------------
    G_deleteHeaderPages();
    G_addStylePages();
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    await G_loadScriptAsync("https://cdn.kushkipagos.com/kushki-checkout.js", "cdn_kushki");
    const pouch = new G_PouchService();
    const compra = await pouch.obtenerCompraActiva();
    if (!compra) {
        await pouch.limpiarExpiradas()
        goLocation('#/page/destino/ExpresoBrasilia_Lappiz');
        //document.getElementById('resumenCompra').classList.add('d-none');
    }
    let amount = {
        subtotalIva: compra.valorImpuestos || 0, // define el valor 0 cuando la Tx no tiene impuestos
        iva: compra.valorImpuestos || 0, // define el valor 0 cuando la Tx no tiene impuestos
        subtotalIva0: +normalizeAmount(compra.totalPagar || 100), // Define el valor total de la Tx en caso de que no tenga impuestos, de lo contrario configura 0
    }
    var kushki = new KushkiCheckout({
        kformId: "x1de9DNBb",
        form: "my-form",
        publicMerchantId: PUBLIC_KEY,// Reemplaza esto por tucredencial pública
        inTestEnvironment: true,
        amount
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
    document.getElementById("btnBack").addEventListener("click", () => {
        goLocation('#/page/resumen/ExpresoBrasilia_Lappiz');
    });

    const paymentCards = document.querySelectorAll('.payment-card');

    paymentCards.forEach(card => {

        card.addEventListener('click', () => {

            paymentCards.forEach(item => {
                item.classList.remove('selected');
            });

            card.classList.add('selected');

            const selectedPayment = card.dataset.payment;

            console.log('Método seleccionado:', selectedPayment);

            // Aquí puedes ejecutar tu lógica
            // realizarPago(selectedPayment);
        });

    });
    function getSelectedPayment() {
        return document
            .querySelector('.payment-card.selected')
            ?.dataset.payment;
    }

    console.log(getSelectedPayment());
})();