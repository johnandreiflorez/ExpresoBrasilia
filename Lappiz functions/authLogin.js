(async () => {
    try {
        const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : {};
        const cfg = {
            URL_BASE_EXPRESO: appset.URL_BASE_EXPRESO || 'https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS',
            USER_EXPRESO: appset.USER_EXPRESO || 'WSAPPWEB',
            PASSWORD_EXPRESO: appset.PASSWORD_EXPRESO || 'Brasilia2026*'
        };
        const data = (obj.body && obj.body.username && obj.body.password)
            ? obj.body
            : { username: cfg.USER_EXPRESO, password: cfg.PASSWORD_EXPRESO };
        const response = await axios.post(cfg.URL_BASE_EXPRESO + '/auth/login', data, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        res.json({
            error: true,
            message: error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
        });
    }
})();
