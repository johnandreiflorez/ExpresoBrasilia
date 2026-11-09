const {empresa, origen } = obj.query;
if(!empresa || !origen) return res.status(400).send("Los parametros son obligatorios");

const token = (obj.query && obj.query.token) || (obj.body && obj.body.token) || (obj.headers && (obj.headers.authorization || obj.headers.Authorization)) || '';

const r = await servicioExpreso({
    config: { method: 'get', path: `/api/v1/tiquetes/getDestinos?empresa=${empresa}&origen=${origen}` },
    token
}, res);

if (r.error) return res.status(400).send(r.data || { error: true, message: r.message });
return res.status(200).send(r.data);
