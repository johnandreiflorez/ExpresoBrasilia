(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const codigo = obj.codigo || (obj.body && obj.body.codigo) || (obj.query && obj.query.codigo) || '';
        const body = {
            transaccion: obj.transaccion || (obj.body && obj.body.transaccion),
            telefono: obj.telefono || (obj.body && obj.body.telefono),
            redirectUrl: obj.redirectUrl || (obj.body && obj.body.redirectUrl)
        };

        const r = await servicioExpreso({
            config: {
                method: 'post',
                path: '/api/v1/pagos/' + codigo + '/iniciar',
                data: body
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
