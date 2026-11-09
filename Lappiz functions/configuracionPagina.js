(async () => {
    const { empresa } = obj.query || {};
    if (!empresa) {
        return res.status(400).send({
            error: true,
            message: "El parámetro empresa es obligatorio."
        });
    }

    const token = (obj.query && obj.query.token) ||
        (obj.body && obj.body.token) ||
        (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) ||
        "";

    const response = await servicioExpreso({
        config: {
            method: "get",
            path: `/api/v1/configuracion-pagina/all-configuracion/${encodeURIComponent(empresa)}`
        },
        token
    }, res);

    if (response.error) {
        return res.status(500).send({
            error: true,
            message: response.message || "Error consultando la configuración de la página."
        });
    }
    return res.status(200).send(response.data);
})();
