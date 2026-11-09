return (async () => {
    const opciones = req || {};
    const forzar = !!opciones.forzar;
    const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : null;
    const cacheado = appset && appset.tokenBrasilia ? String(appset.tokenBrasilia).replace(/^Bearer\s+/i, '').trim() : '';

    if (!forzar) {
        if (opciones.token) {
            const tokenFront = String(opciones.token).replace(/^Bearer\s+/i, '').trim();
            if (tokenFront) {
                if (appset) appset.tokenBrasilia = tokenFront;
                return tokenFront;
            }
        }
        if (cacheado) return cacheado;
    }

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
        const token = respuesta.data && respuesta.data.data ? String(respuesta.data.data) : '';
        if (!token) throw new Error('El login no devolvio token');
        if (appset) appset.tokenBrasilia = token;
        return token;
    } catch (error) {
        if (cacheado) return cacheado;
        throw error;
    }
})();
