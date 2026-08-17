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
    <style>
        /* ==== RESET & FUENTE ==== */
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

        .container {
            margin-top: 2rem;
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

        /* ==== CONTENEDORES ==== */
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

        .btn {
            border-radius: 14px;
            font-weight: 600;
            padding: 0.9rem 1.7rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }


        .btn-primary {
            background: linear-gradient(135deg, #0466c8, #023e7d);
            border: none;
            color: #fff;
            box-shadow: 0 4px 12px rgba(4, 102, 200, 0.35);
        }
    </style>
</head>

<body>
    <header>
        <h5>Expreso Brasilia</h5>
        <small>Viajando con tus sueños</small>
    </header>
    <div class="container py-3">
        <div class="step flex-column active" id="step12">
            <div class="step-content flex-grow-1">
                <h5>Resumen de tu pago</h5>
                <p><strong>Referencia:</strong> ${referenceCode || "N/A"}</p>
                <p><strong>Monto:</strong> ${TX_VALUE || "0"} ${currency || "COP"}</p>
                <p class="${transactionState === "4" ? "exitoso" : transactionState === "6" ? "error" : "pendiente"}">${message}
                </p>
            </div>
            <div class="step-footer py-2 text-right">
                <a href="https://runtimetest.lappiz.io/#/page/destino/ExpresoBrasilia_Lappiz" class="btn btn-primary mt-3">Volver al inicio</a>
            </div>
        </div>
    </div>
</body>

</html>
  `);