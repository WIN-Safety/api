import Product from '../../models/Product.js'

async function getOne(req, res, next) {
    try {
        let product = await Product.findById(req.params.id)
            .select('-__v')  // Excluir __v
            .lean(); // Convertir a objeto plano para mejor rendimiento

        // Verificar si el producto existe
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Opcional: Transformar o enriquecer los datos del producto
        // Por ejemplo, convertir imágenes a base64 si es necesario
        if (product.images && product.images.length > 0) {
            product.images = product.images.map(img => ({
                contentType: img.contentType,
                data: img.data ? img.data.toString('base64') : null
            }));
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error('Error fetching product:', error);

        // Manejo de errores específicos de MongoDB
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        // Error genérico del servidor
        return res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : "Internal server error"
        });
    }
}

export default getOne