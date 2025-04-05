import Product from "../../models/Product.js";

const getProductsByCategory = async (req, res) => {
    try {
        const { categoria } = req.params;
        // console.log(marca);

        if (!categoria) {
            return res.status(400).json({
                success: false,
                message: 'La categoria es requerida'
            });
        }

        const products = await Product.find({ categoria }).lean();

        const productsWithFirstImage = products.map(product => ({
            // ...product,
            _id: product._id,
            name: product.name,
            categoria: product.categoria,
            marca: product.marca,
            images: product.images.length > 0 ? [product.images[0]] : []
        }));

        res.status(200).json({
            success: true,
            products: productsWithFirstImage
        });
    } catch (error) {
        console.error('Error obteniendo los productos por marca:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export default getProductsByCategory;