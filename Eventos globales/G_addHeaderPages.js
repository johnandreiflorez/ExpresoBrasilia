async function G_addHeaderPages() {
    if (document.getElementById('header-expreso-brasilia'))
        return;
    await G_loadScriptAsync("https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js", "cdn_pouch");
    const html = `<header id="header-expreso-brasilia">
    <h5>Expreso Brasilia</h5>
    <small>Viajando con tus sueños</small>
    <button class="btn btn-outline-secondary mt-3 d-none" id="resumenCompra" style="position: fixed; top: 0; right: 15px; padding: 0.5rem; z-index: 1;">Ver compra</button>
    <div id="timer" class="d-none" style="font-size:10px;font-weight:bold;top: 50px;right: 25px;position: fixed;color: black;z-index: 1;">Tiempo: <span id="timerValue">10:00</span></div>
</header>
<div class="modal fade" id="resumenModal" tabindex="-1" role="dialog" aria-hidden="true">
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
    </div>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(180deg, #f5f8fc 0%, #eaf0f8 100%);
  color: #2c2c2c;
  line-height: 1.6;
  min-height: 100vh;
}
  .bg-expreso{
    background: linear-gradient(135deg, #0056a6, #e31b23);
}
header {
  text-align: center;
  padding: 2.2rem 1rem 3rem;
  background: linear-gradient(135deg, #0056a6, #e31b23);
  color: #fff;
  border-bottom-left-radius: 60% 15%;
  border-bottom-right-radius: 60% 15%;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  position: relative;
  overflow: hidden;
}

header::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.18), transparent 70%);
  pointer-events: none;
}

header h5 {
  margin: 0;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 0.6px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

header small {
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 0.3rem;
  display: block;
  font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin-bottom: 0.6rem;
  line-height: 1.3;
  color: #1c2c44;
}
/* TITULOS DE PASOS */
.step h5 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e3a8a;
    /* Azul corporativo */
    margin: 2rem 0 1rem 0;
    /* más espacio arriba y abajo */
    padding-top: 0.5rem;
    /* separación extra del header */
    position: relative;
    display: block;
    text-transform: capitalize;
    letter-spacing: 0.3px;
    text-align: left;
    /* o center si quieres alineación central */
}

.step h5::after {
    content: "";
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #ef4444);
    border-radius: 2px;
    margin-top: 6px;
}

/* SUBTITULOS DE SECCION */
.section-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 1.5rem 0 0.8rem;
    text-align: left;
}
@keyframes fadeSlide {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@media (max-width: 992px) {
    header {
        padding: 1.8rem 1rem 2.2rem;
    }

    header h5 {
        font-size: 1.7rem;
    }

    header small {
        font-size: 0.9rem;
    }

    .step h5 {
        font-size: 1.4rem;
    }

    .section-title {
        font-size: 1.05rem;
    }
}

@media (max-width: 600px) {
    header {
        padding: 1.5rem 1rem 2rem;
    }

    header h5 {
        font-size: 1.4rem;
    }

    header small {
        font-size: 0.8rem;
    }

    .step h5 {
        font-size: 1.2rem;
    }

    .section-title {
        font-size: 1rem;
    }

    .container {
        margin-top: 1.5rem;
    }
}
.container {
    max-width: 1150px;
    margin: -40px auto 2rem;
    padding: 0 1rem;
}
.step {
    display: none;
    /* oculto por defecto */
    height: 100%;
    flex-direction: column;
}

.step.active {
    display: flex;
    animation: fadeSlide 0.6s ease;
}
.step-content {
    flex: 1;
    overflow-y: auto;
    /* solo aquí se hace scroll */
    padding: 1rem;
}

.step-footer {
    position: sticky;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
}
/* ==== BOTONES ==== */
.btn {
    border-radius: 14px;
    font-weight: 600;
    padding: 0.9rem 1.7rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-seat {
    border: 2px solid #cfd8e3;
    padding: 1px 10px;
}

.btn-primary {
    background: linear-gradient(135deg, #0466c8, #023e7d);
    border: none;
    color: #fff;
    box-shadow: 0 4px 12px rgba(4, 102, 200, 0.35);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(4, 102, 200, 0.45);
}

.btn-danger {
    background: linear-gradient(135deg, #e63946, #9d0208);
    border: none;
    color: #fff;
    box-shadow: 0 4px 12px rgba(230, 57, 70, 0.35);
}

.btn-danger:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(230, 57, 70, 0.45);
}
/* Tarjetas del resumen */
.resumen-card {
    border-radius: 10px;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.resumen-card .card-title {
    font-size: 0.95rem;
    font-weight: 600;
}

.resumen-detalle p {
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
}

#resumenTotales {
    text-align: center;
}

/* Hacer todo compacto en móvil */
@media (max-width: 576px) {
    .modal-content {
        border-radius: 12px;
    }

    .modal-header h5 {
        font-size: 1rem;
    }

    .resumen-card {
        padding: 0.25rem;
    }

    .modal-footer {
        flex-direction: column;
        gap: 0.5rem;
    }

    .modal-footer .btn {
        width: 100%;
    }
}
</style>`
    document.querySelector('app-root').insertAdjacentHTML('afterbegin', html);
    setTimeout(() => {
        $("#resumenCompra").click(() => {
            $("#resumenModal").modal("show");
        });
    }, 1000);
}