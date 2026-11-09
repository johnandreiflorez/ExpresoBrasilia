(async () => {
    try {
        const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : {};
        const urlBase = appset.URL_BASE_EXPRESO || 'https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS';
        const transaccion = obj.transaccion || (obj.body && obj.body.transaccion) || (obj.query && obj.query.transaccion) || '';

        const config = {
            method: 'get',
            url: urlBase + '/api/v1/pagos/' + transaccion + '/subscribe',
            headers: {
                'Accept': 'text/event-stream',
                'Content-Type': 'text/event-stream'
            },
            responseType: 'stream'
        };

        const response = await axios.request(config);
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        response.data.pipe(res);
    } catch (error) {
        res.json({
            error: true,
            message: error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        });
    }
})();
