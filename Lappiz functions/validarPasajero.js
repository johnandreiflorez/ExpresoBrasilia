(async () => {
    const { destino, empresa, fechaviaje, hora, idCliente, origen, ruta } = obj.body;
    if (!destino || !empresa || !fechaviaje || !hora || !idCliente || !origen || !ruta) return res.status(400).send("Los parametros son obligatorios");

    const token = (obj.body && obj.body.token) || (obj.query && obj.query.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const r = await servicioExpreso({
        config: { method: 'get', path: `/api/v1/tiquetes/validar-linea-pasajero?destino=${destino}&empresa=${empresa}&fechaviaje=${fechaviaje}&hora=${hora}&idCliente=${idCliente}&origen=${origen}&ruta=${ruta}` },
        token
    }, res);

    if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
    return res.status(200).send(r.data);
})();