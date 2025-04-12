import Product from "../../models/Product.js";
import sharp from "sharp";

const createProduct = async (req, res) => {

    try {
        const {
            name,
            description,
            categoria,
            marca,
            talla,
            modelo,
            alto,
            ancho,
            largo,
            material
        } = req.body;


        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'Name and description are required'
            });
        }

        let images = [];
        if (req.files) {
            images = await Promise.all(req.files.map(async (file) => {
                const webpBuffer = await sharp(file.buffer)
                    .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
                    .webp()
                    .toBuffer();
                return {
                    data: webpBuffer,
                    contentType: 'image/webp'
                };
            }));
        }

        const newProduct = new Product({
            name,
            description,
            categoria,
            marca,
            talla,
            modelo,
            alto,
            ancho,
            largo,
            material,
            images
        })

        // console.log(newProduct)

        await newProduct.save()
        return res.status(201).json({ success: true, product: newProduct })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' })
    }
}
export default createProduct