(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const transaccion = obj.transaccion || (obj.body && obj.body.transaccion) || (obj.query && obj.query.transaccion) || '';
        const referencia = obj.referencia || (obj.body && obj.body.referencia) || (obj.query && obj.query.referencia) || '';

        const r = await servicioExpreso({
            config: {
                method: 'get',
                path: '/api/v1/pagos/' + transaccion + '/estado?referencia=' + encodeURIComponent(referencia)
            },
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
