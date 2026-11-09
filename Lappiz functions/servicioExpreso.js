return (async () => {
    const opciones = req || {};
    const conf = opciones.config || {};
    const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : null;

    const cfg = {
        URL_BASE_EXPRESO: (appset && appset.URL_BASE_EXPRESO) || 'https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS',
        USER_EXPRESO: (appset && appset.USER_EXPRESO) || 'WSAPPWEB',
        PASSWORD_EXPRESO: (appset && appset.PASSWORD_EXPRESO) || 'Brasilia2026*',
        AUTH_BASIC_EXPRESO: (appset && appset.AUTH_BASIC_EXPRESO) || 'Basic QlJBU0lMSUFfUFJVRUJBUzpCcmFzaWxpYS4yMDI0Kg=='
    };

    async function obtenerToken(forzar) {
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
            return '';
        }
    }

    async function ejecutar(auth) {
        const headers = Object.assign({ 'Content-Type': 'application/json' }, conf.headers || {});
        headers.Authorization = auth;
        const config = Object.assign({}, conf, {
            headers: headers,
            url: conf.url || (cfg.URL_BASE_EXPRESO + (conf.path || ''))
        });
        delete config.path;
        console.log('servicioExpreso ejecutar config:', config);
        return await axios.request(config);
    }

    let token = await obtenerToken(!!opciones.forzarToken);
    let auth = token ? ('Bearer ' + token) : (opciones.basicAuth || cfg.AUTH_BASIC_EXPRESO);

    try {
        const response = await ejecutar(auth);
        return { error: false, status: response.status, data: response.data, message: null };
    } catch (error) {
        const status = error.response ? error.response.status : 0;
        const data = error.response ? error.response.data : null;
        const message = (data && data.message) || error.message;

        if (status === 401 && !opciones._reintento401) {
            const tokenNuevo = await obtenerToken(true);
            if (tokenNuevo && tokenNuevo !== token) {
                try {
                    const response = await ejecutar('Bearer ' + tokenNuevo);
                    return { error: false, status: response.status, data: response.data, message: null };
                } catch (error2) {
                    const status2 = error2.response ? error2.response.status : 0;
                    const data2 = error2.response ? error2.response.data : null;
                    return { error: true, status: status2, data: data2, message: (data2 && data2.message) || error2.message };
                }
            }
        }

        return { error: true, status: status, data: data, message: message };
    }
})();
