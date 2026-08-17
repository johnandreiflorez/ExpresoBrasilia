class G_PouchService {
    constructor() {
        this.db = new PouchDB("tiqueteDB");
    }

    // Crear o actualizar una compra
    async guardarCompra(compra) {
        const id = compra._id || `compra_${new Date().toISOString()}`;

        try {
            const existing = await this.db.get(id).catch(() => null);

            if (existing) {
                // merge actual
                const updated = { ...existing, ...compra };
                return this.db.put(updated);
            }

            // crear nuevo
            return this.db.put({ _id: id, ...compra });

        } catch (err) {
            console.error("Error guardando la compra", err);
            throw err;
        }
    }

    // Obtener compra por id
    async obtenerCompra(id) {
        try {
            return await this.db.get(id);
        } catch (err) {
            console.warn("Compra no encontrada", err);
            return null;
        }
    }

    // Obtener la última compra activa (no expirada)
    async obtenerCompraActiva() {
        const result = await this.db.allDocs({ include_docs: true });

        const ahora = Date.now();
        const activas = [];

        for (const row of result.rows) {
            const doc = row.doc;
            const timerExpired = doc.timerExpiresAt && ahora > doc.timerExpiresAt;

            if (doc.tipo === "compraTiquete" && timerExpired) {
                try {
                    await this.db.remove(doc);
                } catch (err) {
                    console.error("Error eliminando compra expirada por timer:", err);
                }
                continue;
            }

            if (
                doc.tipo === "compraTiquete" &&
                (ahora - doc.creadaEn) < doc.expiracion
            ) {
                activas.push(doc);
            }
        }

        if (activas.length === 0) return null;

        // devolver la más reciente
        return activas.sort((a, b) => b.creadaEn - a.creadaEn)[0];
    }

    // Eliminar compra
    async eliminarCompra(id) {
        try {
            const doc = await this.db.get(id);
            return this.db.remove(doc);
        } catch (err) {
            console.error("Error eliminando compra", err);
        }
    }

    // Limpiar compras expiradas
    async limpiarExpiradas() {
        const result = await this.db.allDocs({ include_docs: true });
        const ahora = Date.now();

        for (const row of result.rows) {
            const doc = row.doc;
            const timerExpired = doc.timerExpiresAt && ahora > doc.timerExpiresAt;

            if (
                doc.tipo === "compraTiquete" &&
                (ahora - doc.creadaEn > doc.expiracion || timerExpired)
            ) {
                try {
                    await this.db.remove(doc);
                } catch (err) {
                    console.error("Error eliminando compra expirada:", err);
                }
            }
        }
    }

    // destruir, limpiar almacenamiento
    async destruir() {
        return this.db.destroy();
    }
}