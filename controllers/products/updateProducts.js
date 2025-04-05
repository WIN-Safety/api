import Product from "../../models/Product.js"
import sharp from "sharp"

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        categoria,
        marca,
        codigo,
        altura,
        ancho,
        peso,
        modelo,
        torque,
        rpm,
    } = req.body;

    // try {
    //     // console.log('Body:', req.body);
    //     const product = await Product.findById(id);
    //     if (!product) {
    //         return res.status(404).json({ success: false, message: "Producto no encontrado" });
    //     }

    //     // Manejar las imágenes si se proporcionan
    //     if (req.files && req.files.length > 0) {
    //         const newImages = req.files.map(file => ({
    //             data: file.buffer,
    //             contentType: file.mimetype,
    //         }));
    //         product.images = newImages; // Sobrescribe completamente el campo images
    //     }

    try {
        // Buscar el producto por ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }

        // Manejar las imágenes si se proporcionan
        if (req.files && req.files.length > 0) {
            // Procesar cada imagen con sharp
            const newImages = await Promise.all(req.files.map(async (file) => {
                const webpBuffer = await sharp(file.buffer)
                    .resize(500, 500, { fit: 'inside', withoutEnlargement: true }) // Redimensionar a 800x800
                    .webp() // Convertir a WebP
                    .toBuffer(); // Convertir a buffer

                return {
                    data: webpBuffer,
                    contentType: 'image/webp', // Cambiar el tipo MIME a WebP
                };
            }));

            // Sobrescribir las imágenes existentes con las nuevas imágenes procesadas
            product.images = newImages;
        }

        // Actualizar los demás campos del producto
        Object.assign(product, { name, description, categoria, marca, codigo, altura, ancho, peso, modelo, torque, rpm });

        // Guardar los cambios en la base de datos
        await product.save();

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Product update error:', error);
        next(error);
    }
}

export default updateProduct