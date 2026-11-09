(async () => {
    const { type } = obj.query;
    if (!type) return res.status(400).send("El parametro es obligatorio");
    const TextoLegal = await modelo.ExpresoBrasilia_Lappiz_TextoLegal.findOne({ where: { Estado: 'Activo' } });
    const html = !TextoLegal ? `<p>“Declaro que los datos aportados cuando se trata de pasajeros menores de edad son veraces, y en todo caso
        exonero a Expreso Brasilia de la información aquí suministrada”.</p>
      <p>“Al momento de abordar el vehículo se deberá diligenciar un formulario o portar la autorización correspondiente
        para el transporte de menores, en caso de no cumplir con las indicaciones o no portar los documentos requeridos,
        la empresa se reserva el derecho de negarse a cumplir el contrato de transporte”.</p>
      <p>“Al continuar estoy de acuerdo con los términos y condiciones políticas de menores, equipaje, mascotas y la
        política de privacidad”.</p>` : TextoLegal.Contenido;
    return res.status(200).json({
        error: false,
        message: null,
        html,
    })
})()