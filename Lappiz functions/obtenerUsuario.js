(async () => {
    try {
        const token = (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || (obj.body && obj.body.token) || (obj.query && obj.query.token) || '';
        const r = await servicioExpreso({ config: { method: 'get', path: '/api/v1/tiquetes/obtener-transaccion' }, token }, res);
        if (r.error && !r.data) {
            return res.json({ error: true, message: r.message });
        }
        const data = r.data && r.data.data ? r.data.data : {};
        res.json({
            error: false,
            message: null,
            data: data.usuario || null,
            llaveTransaccion: data.llaveTransaccion || null,
            stVariablesDTO: data.stVariablesDTO || null
        });
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
})();
