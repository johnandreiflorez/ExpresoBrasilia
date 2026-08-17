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
    renderTitularSelection();
    document.getElementById("titularSeleccionado").disabled = true;
    function renderTitularSelection() {
        const container = document.getElementById("listPassangers");
        container.innerHTML = "";

        if (!compra?.data?.tiquetes?.length) {
            container.innerHTML =
                "<p class='text-muted'>No hay pasajeros registrados.</p>";
            return;
        }

        compra.data.tiquetes.forEach((t, index) => {
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

        // Guardamos el titularPago en compra
        const pasajero = compra.data.tiquetes[index].pasajero;
        compra.titularPago = {
            ...pasajero,
            nombre: `${pasajero.primerNombre} ${pasajero.primerApellido}`,
        };
        compra.data.tiquetes.map((currentTiquet) => {
            currentTiquet.titularPago = {
                numeroIdentificacion: compra.titularPago.numeroIdentificacion,
                nombre: compra.titularPago.nombre,
            };
            return currentTiquet;
        });
        document.getElementById("titularSeleccionado").disabled = false;
    }
    document.getElementById("titularSeleccionado").addEventListener("click", async () => {
        await pouch.guardarCompra(compra);
        goLocation("#/page/textoLegal/ExpresoBrasilia_Lappiz");
    });

    document.getElementById("lastStep7").addEventListener("click", () => {
        goLocation('#/page/estitular/ExpresoBrasilia_Lappiz');
    });
})();