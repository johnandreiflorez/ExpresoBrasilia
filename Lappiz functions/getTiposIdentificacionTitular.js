(async () => {
    const { empresa, portal, titular } = obj.query;
    if (!empresa || !portal || !titular) return res.status(400).send("Los parametros son obligatorios");

    const token = (obj.query && obj.query.token) || (obj.body && obj.body.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const r = await servicioExpreso({
        config: {
            method: 'get',
            url: `https://testportalapp.expresobrasilia.com/BrasiliaFacturacionWS/api/v1/clientes/consultar-tipos-identificacion?empresa=${empresa}&portal=${portal}&titular=${titular}`
        },
        token
    }, res);

    if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
    if (r.data && r.data.data) return res.status(200).send(r.data);
    return res.status(200).send({ data: [] });
})();