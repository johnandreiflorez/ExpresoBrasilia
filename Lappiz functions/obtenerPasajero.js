(async ()=>{
    try{
        const {numDocumento} = obj.query;
        const token = (obj.query && obj.query.token) || (obj.body && obj.body.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

        const r = await servicioExpreso({
            config: { method: 'get', path: `/api/v1/pasajeros/EC/${numDocumento}` },
            token
        }, res);

        if (r.error) {
            return res.status(200).send({status: false, message: 'Error al consultar usuario', error: r.message});
        }
        return res.status(200).send({status: true, data: r.data && r.data.data});
    }catch(error) {
        return res.status(200).send({status: false, message: 'Error al consultar usuario', error: error.message});
    }
})();
