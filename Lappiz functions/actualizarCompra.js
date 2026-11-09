(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const transaccion = obj.transaccion || (obj.body && obj.body.transaccion) || (obj.query && obj.query.transaccion) || '';
        const body = Object.assign({}, obj.body || {});
        delete body.token;
        delete body.transaccion;

        const r = await servicioExpreso({
            config: { method: 'patch', path: '/api/v1/compras/update/' + transaccion, data: body },
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
