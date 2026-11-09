const {numero } = obj.query;
if(!numero) return res.status(400).send("Los parametros son obligatorios");
console.log('prueba'+numero);
const usuario = 'WSAPPWEB';
const contrasena = 'Brasilia2026*';
const token = Buffer.from(usuario + ':' + contrasena).toString('base64');
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://testportalapp.expresobrasilia.com/BrasiliaTiquetesWS/api/v1/tiquetes/getTiquete?numeroIdentificacion=${numero}&fechaInicio=2018-01-01`,
  headers: {
      'Authorization': `Basic ${token}`,
      'Accept': 'application/json'
 }
};


axios.request(config)
.then((response) => {
    console.log(response);
  return res.status(200).send(response.data);
})
.catch((error) => {
  return res.status(400).send(error);
});