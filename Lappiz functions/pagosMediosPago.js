(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const r = await servicioExpreso({ config: { method: 'get', path: '/api/v1/pagos/medios-pago' }, token }, res);
        if (r.error && !r.data) {
            return res.json({ error: true, message: r.message, data: [] });
        }
        res.json(r.data);
    } catch (error) {
        res.json({ error: true, message: error.message, data: [] });
    }
})();
