import Product from "../../models/Product.js";

const read = async (req, res) => {
    try {
        const { sort, name, categoria, priceOrder } = req.query;

        // Construir consultas de filtrado
        let queries = {};
        let sortOptions = {};

        // Filtros
        if (name) queries.name = new RegExp(name, 'i');
        if (categoria) {
            // Permite búsqueda por categoría única o múltiple
            queries.categoria = Array.isArray(categoria)
                ? { $in: categoria }
                : { $in: categoria.split(',') };
        }

        // Opciones de ordenamiento
        if (sort) {
            // Permitir ordenamiento por múltiples campos
            const sortFields = {
                'name': { name: 1 },
                'nameDesc': { name: -1 },
                'createdAt': { createdAt: 1 },
                'createdAtDesc': { createdAt: -1 }
            };
            sortOptions = sortFields[sort] || { createdAt: -1 };
        }

        // Agregar ordenamiento por precio si se solicita
        if (priceOrder) {
            sortOptions.price = priceOrder === 'asc' ? 1 : -1;
        }

        // Realizar la consulta sin paginación
        const products = await Product.find(queries)
            .sort(sortOptions)
            .lean(); // Convertir a objeto plano para mejor rendimiento

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export default read;