  const { transactionState, referenceCode, TX_VALUE, currency } = obj.query;

  let message = "";
  if (transactionState === "4") message = "✅ Tu pago fue aprobado.";
  else if (transactionState === "6") message = "❌ Tu pago fue rechazado.";
  else if (transactionState === "7") message = "⏳ Tu pago está pendiente.";
  else message = "⚠️ Estado desconocido.";

  res.send(`
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado de pago</title>
    <style id="style-expreso-brasilia">
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
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
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
            box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
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
        }
    </style>
</head>

<body>
    <section class="hero" id="header-expreso-brasilia">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1 class="hero-logo">UNITRANSCO</h1>
        </div>
    </section>
    <div id="main-card" style="position: relative;
    margin-top: -60px;
    background: #ffffff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 2rem 1.5rem 6rem 1.5rem;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
    min-height: calc(100vh - 260px);">
        <div class="app-content">
            <h5>Resumen de tu pago</h5>
            <p><strong>Referencia:</strong> ${referenceCode || "N/A"}</p>
            <p><strong>Monto:</strong> ${TX_VALUE || "0"} ${currency || "COP"}</p>
            <p class="${
                transactionState === " 4" ? "exitoso" : transactionState==="6" ? "error" : "pendiente" }">${message}
            </p>

            <div class="step-footer py-2 text-right">
                <a href="https://runtimetest.lappiz.io/#/page/traslado/ExpresoBrasilia_Lappiz" class="btn btn-primary mt-3">Volver al inicio</a>
            </div>
        </div>
    </div>
    <nav id="menu-expreso-brasilia" class="bottom-nav">
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
    </nav>
</body>

</html>
  `);