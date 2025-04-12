import mongoose from 'mongoose'
const { Schema, model } = mongoose

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoria: { type: String, required: true },
    marca: { type: String, required: true },
    talla: { type: String, required: true },
    modelo: { type: String, required: true },
    alto: { type: String, required: true },
    ancho: { type: String, required: true },
    largo: { type: String, required: true },
    material: { type: String, required: true },
    images: [{
        data: Buffer,
        contentType: String
    }]
}, {
    timestamps: true
})
productSchema.index({ name: 1 });
productSchema.index({ categoria: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ marca: 1 });

const Product = model('Product', productSchema)
export default Product