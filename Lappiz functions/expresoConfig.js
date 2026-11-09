(async () => {
    const appset = (typeof _appsettings !== 'undefined' && _appsettings) ? _appsettings : {};
    return {
        URL_BASE_EXPRESO: appset.URL_BASE_EXPRESO || 'https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS',
        USER_EXPRESO: appset.USER_EXPRESO || 'WSAPPWEB',
        PASSWORD_EXPRESO: appset.PASSWORD_EXPRESO || 'Brasilia2026*',
        AUTH_BASIC_EXPRESO: appset.AUTH_BASIC_EXPRESO || 'Basic V1NBUFBXRUI6QnJhc2lsaWEyMDI2Kg=='
    };
})();