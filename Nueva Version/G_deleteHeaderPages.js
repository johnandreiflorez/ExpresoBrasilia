function G_deleteHeaderPages() {
    const idBody = 'app-shell'
    const idMenu = 'menu-expreso-brasilia'
    const idHeader = 'header-expreso-brasilia'
    const idStyleGlobal = 'style-expreso-brasilia'
    if (document.getElementById(idHeader)) {
        document.getElementById(idHeader).remove();
    }
    if (document.getElementById(idMenu)) {
        document.getElementById(idMenu).remove();
    }
    if (document.getElementById(idStyleGlobal)) {
        document.getElementById(idStyleGlobal).remove();
    }
}