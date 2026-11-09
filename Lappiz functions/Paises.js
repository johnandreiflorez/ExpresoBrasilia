(async ()=>{
    try {
        const data = await modelo.ExpresoBrasilia_Lappiz_Paises.findAll();
        return res.status(200).send(data)
    } catch (e) {
        return res.status(200).send([])
    }
})()