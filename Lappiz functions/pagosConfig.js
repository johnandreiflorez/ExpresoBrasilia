(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const codigo = obj.codigo || (obj.body && obj.body.codigo) || (obj.query && obj.query.codigo) || '';
        const requestedAmount = obj.requestedAmount || (obj.body && obj.body.requestedAmount) || (obj.query && obj.query.requestedAmount) || '';

        const r = await servicioExpreso({
            config: {
                method: 'get',
                path: '/api/v1/pagos/' + codigo + '/config?requestedAmount=' + encodeURIComponent(requestedAmount)
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
