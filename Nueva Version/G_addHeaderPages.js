async function G_addHeaderPages() {
    if (document.getElementById('header-expreso-brasilia'))
        return;
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    const htmlHeader = `
    <section class="hero" id="header-expreso-brasilia">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="hero-logo">UNITRANSCO</h1>
        </div>
    </section>`;

    document.querySelector('body').insertAdjacentHTML('afterbegin', htmlHeader);
    G_addMenuPages();
    G_addStylePages();
    G_addModalResumen();
}

function G_addMenuPages() {
    if (document.getElementById('menu-expreso-brasilia'))
        return;
    const htmlMenu = `<nav id="menu-expreso-brasilia" class="bottom-nav">
        <button class="nav-item active">
            <i class="fas fa-home"></i>
            <span>Servicio</span>
        </button>
        <button class="nav-item">
            <i class="fas fa-search"></i>
            <span>Servicio</span>
        </button>
        <button class="nav-item">
            <i class="fas fa-file-alt"></i>
            <span>Servicio</span>
        </button>
        <button class="nav-item">
            <i class="fas fa-calendar-alt"></i>
            <span>Servicio</span>
        </button>
    </nav>`;
    document.querySelector('body').insertAdjacentHTML('beforeend', htmlMenu);
}

function G_addStylePages() {
    if (document.getElementById('style-expreso-brasilia'))
        return;
    const styleGlobal = `<style id="style-expreso-brasilia">
body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #f2f2f2;
}

#app-shell {
    min-height: 100vh;
    position: relative;
}

.hero {
    height: 320px;
    background: url('https://static.expresobrasilia.com/wp-content/uploads/2024/06/banner-3-1.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 32, 60, 0.65);
}

.hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-logo {
    color: white;
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: 3px;
}

.main-card {
    position: relative;
    margin-top: -60px;
    background: #ffffff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 2rem 1.5rem 6rem 1.5rem;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
    min-height: calc(100vh - 260px);
}

.card-content {
    max-width: 500px;
    margin: 0 auto;
}

.main-card h2 {
    font-size: 1.5rem;
    color: #163b63;
    margin-bottom: 0.5rem;
}

.main-card p {
    color: #666;
    margin-bottom: 1.5rem;
}

.form-control {
    background: #f1f3f6;
    border: none;
    border-radius: 18px;
    padding: 1rem;
    font-size: 1rem;
    margin-bottom: 1.2rem;
}
.k-dropdown-wrap{
border: none !important;
}

.k-combobox:focus{
    background: #f1f3f6;
}
.k-input{
    border-radius: 25px !important; 
    background: #f1f3f6;
}
.k-combobox>.k-state-focused{
    border-radius: 25px !important;
}
.form-control:focus{
    border-radius: 25px !important;
    background: #f1f3f6;
}
    
.k-combobox .k-select{
    background: #f1f3f6;
    border: none;
    border-radius: 0px 25px 25px 0px !important; 
}
.k-input-button.k-button.k-icon-button {
    border: none;
    background: #f1f3f6;
}

label {
    font-weight: 600;
    color: #1c355e;
    margin-bottom: 0.5rem;
    display: block;
}

.btn-primary {
    width: 100% !important;
    border-radius: 40px !important;
    padding: 7px !important;
    font-size: 1.2rem !important;
    font-weight: 600 !important;
    background: #163b63 !important;
    border: none !important;
    color: #fff !important;
    margin-top: 20px !important;
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f8f8f8;
    display: flex;
    justify-content: space-around;
    padding: 0.8rem 0;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
}

.nav-item {
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #bbb;
    font-size: 0.8rem;
}

.nav-item i {
    font-size: 1.4rem;
    margin-bottom: 5px;
}

.nav-item.active {
    color: #163b63;
    font-weight: 600;
}
button.nav-item.active {
    background-color: #f8f8f8 !important;
}</style>`;
    document.querySelector('head').insertAdjacentHTML('beforeend', styleGlobal);

}
function G_addModalResumen() {
    if (document.getElementById('resumenModal'))
        return;
    const htmlModalResumen = `<div class="modal fade" id="resumenModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content shadow-lg rounded-lg">

            <!-- Header -->
            <div class="modal-header bg-expreso text-white">
                <h5 class="modal-title font-weight-bold">Resumen de tu compra</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Body -->
            <div class="modal-body px-3 py-2">
                <div id="resumenLayout" class="d-flex flex-column gap-3">

                    <!-- Pasajeros -->
                    <div id="resumenPasajeros" class="card resumen-card">
                        <div class="card-body p-2">
                            <h6 class="card-title text-primary mb-2">
                                <i class="fas fa-user-friends mr-1"></i> Pasajeros
                            </h6>
                            <ul class="list-group list-group-flush small">
                                <!-- Cantidad y nombres de pasajeros -->
                            </ul>
                        </div>
                    </div>

                    <!-- Ida -->
                    <div id="resumenIda" class="card resumen-card">
                        <div class="card-body p-2">
                            <h6 class="card-title text-success mb-2">
                                <i class="fas fa-arrow-right mr-1"></i> Viaje de ida
                            </h6>
                            <div class="small resumen-detalle">
                                <!-- Costo individual, sub total, descuentos, costos adicionales, total a pagar -->
                            </div>
                        </div>
                    </div>

                    <!-- Regreso -->
                    <div id="resumenRegreso" class="card resumen-card d-none">
                        <div class="card-body p-2">
                            <h6 class="card-title text-info mb-2">
                                <i class="fas fa-arrow-left mr-1"></i> Viaje de regreso
                            </h6>
                            <div class="small resumen-detalle">
                                <!-- Costo individual, sub total, descuentos, costos adicionales, total a pagar -->
                            </div>
                        </div>
                    </div>

                    <!-- Totales -->
                    <div id="resumenTotales" class="card resumen-card border-0 bg-light">
                        <div class="card-body p-3">
                            <h5 class="mb-2 font-weight-bold">Total a pagar</h5>
                            <p class="h4 text-primary font-weight-bold mb-0">
                                $ <span id="totalGeneral">0</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>`;
    document.querySelector('body').insertAdjacentHTML('beforeend', htmlModalResumen);
    setTimeout(() => {
        $("#resumenCompra").click(() => {
            $("#resumenModal").modal("show");
        });
    }, 1000);
}