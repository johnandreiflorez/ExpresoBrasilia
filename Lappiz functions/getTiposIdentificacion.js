(async () => {
    const { empresa, pais } = obj.query;
    if (!empresa || !pais) return res.status(400).send("Los parametros son obligatorios");

    const token = (obj.query && obj.query.token) || (obj.body && obj.body.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const r = await servicioExpreso({
        config: { method: 'get', path: `/api/v1/tiquetes/getTiposIdentificacion?empresa=${empresa}&pais=${pais}` },
        token
    }, res);

    if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
    if (r.data && r.data.data) return res.status(200).send(r.data);
    return res.status(200).send({ data: [] });
})();