(async () => {
    const { empresa } = obj.query;
    if (!empresa) return res.status(400).send("El parametro 'empresa' es obligatorio");

    const token = (obj.query && obj.query.token) || (obj.body && obj.body.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const r = await servicioExpreso({
        config: { method: 'get', path: `/api/v1/tiquetes/getPaises?empresa=${empresa}` },
        token
    }, res);

    if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
    return res.status(200).send(r.data);
})();