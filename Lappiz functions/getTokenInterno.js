return (async () => {
    const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : null;
    const cacheado = appset && appset.tokenBrasilia ? String(appset.tokenBrasilia).replace(/^Bearer\s+/i, '').trim() : '';
    let token = cacheado;

    if (!token) {
        const cfg = {
            URL_BASE_EXPRESO: (appset && appset.URL_BASE_EXPRESO) || 'https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS',
            USER_EXPRESO: (appset && appset.USER_EXPRESO) || 'WSAPPWEB',
            PASSWORD_EXPRESO: (appset && appset.PASSWORD_EXPRESO) || 'Brasilia2026*'
        };
        try {
            const respuesta = await axios.post(
                cfg.URL_BASE_EXPRESO + '/auth/login',
                { username: cfg.USER_EXPRESO, password: cfg.PASSWORD_EXPRESO },
                { headers: { 'Content-Type': 'application/json' } }
            );
            token = respuesta.data && respuesta.data.data ? String(respuesta.data.data) : '';
            if (token && appset) appset.tokenBrasilia = token;
        } catch (error) {
            token = '';
        }
    }

    return res.status(200).send({ status: !!token, token: token || null });
})();
