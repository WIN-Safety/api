import Joi from 'joi'

export const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    description: Joi.string()
        .min(10)
        .max(500)
        .required(),
    categoria: Joi.string()
        .min(3)
        .max(50)
        .required(),
    marca: Joi.string()
        .min(3)
        .max(50)
        .required(),
    codigo: Joi.string()
        .min(3)
        .max(50)
        .required(),
    altoempaque: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    anchoempaque: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    largoempaque: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    peso: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    modelo: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    alto: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    ancho: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    largo: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    material: Joi.string()
        .min(1)
        .max(1000)
        .required(),
    images: Joi.array()
        .items(Joi.string())
        .min(1)
        .required(),
}).messages({
    'object.unknown': 'No se permite el envío de propiedades adicionales.',
    'string.pattern.base': 'El campo {#label} debe ser un ObjectId válido.'
});