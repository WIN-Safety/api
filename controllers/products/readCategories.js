import Product from "../../models/Product.js";

const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('categoria'); 

        res.status(200).json({
            success: true,
            categories: categories
        });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export default getCategories;