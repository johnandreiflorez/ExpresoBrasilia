(async () => {
    const { codEmpresa, codAgencia, codDestino, fecha, ruta, hora, codPromocion, codConvenio, fechaNacimiento, posicion, valorLista, valorListaConexion, valorTarifaDesconexion, valorTarifaConexion, cortesia } = obj.body;

    const token = (obj.body && obj.body.token) || (obj.query && obj.query.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

    const path = `/api/v1/tarifa-pax?codEmpresa=${codEmpresa || ''}&codAgencia=${codAgencia || ''}&codDestino=${codDestino || ''}&fecha=${fecha || ''}&ruta=${ruta || ''}&hora=${hora}&codPromocion=${codPromocion || ''}&codConvenio=${codConvenio || ''}&fechaNacimiento=${fechaNacimiento || ''}&posicion=${posicion || ''}&valorLista=${valorLista || ''}&valorListaConexion=${valorListaConexion || ''}&valorTarifaDesconexion=${valorTarifaDesconexion || ''}&valorTarifaConexion=${valorTarifaConexion || ''}&cortesia=${cortesia || ''}`;

    const r = await servicioExpreso({
        config: { method: 'get', path },
        token
    }, res);

    if (r.error) return res.status(500).send(r.message || 'Error consultando tarifa');
    return res.status(200).send(r.data);
})();