(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const body = Object.assign({}, obj.body || {});
        delete body.token;

        const r = await servicioExpreso({
            config: { method: 'post', path: '/api/v1/compras/pasajero/create', data: body },
            token
        }, res);

        if (r.error && !r.data) {
            return res.json({ error: true, message: r.message });
        }
        res.json(r.data);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
})();
