(async () => {
    const { numero, empresa, fechaViaje, hora, origen, destino, ruta } = obj.body;
    if (!numero || !empresa || !fechaViaje || !hora || !origen || !destino || !ruta) return res.status(400).send("Los parametros son obligatorios");

    const token = (obj.body && obj.body.token) || (obj.query && obj.query.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const body = Object.assign({}, obj.body);
    delete body.parameters;
    delete body.token;

    const r = await servicioExpreso({
        config: { method: 'post', path: `/api/v1/tiquetes/marcarPuesto`, data: body },
        token
    }, res);

    if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
    return res.status(200).send(r.data);

})();