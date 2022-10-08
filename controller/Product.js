const { Product } = require('../models/');

class ProductController {

    //mengambil semua data produk
    static async getAllProduct(req, res) {
        try {
            const dataProducts = await Product.findAll();
            return res.status(200).json(dataProducts);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    //mengambil data produk berdasarkan id
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const dataProductById = await Product.findOne({
                where: {
                    id: id,
                }
            });
            console.log(id);
            if (dataProductById) {
                return res.status(200).json(dataProductById);
            } else {
                return res.status(404).json({
                    message: 'Data product with this id not found'
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    //menambah produk baru
    static async createProduct(req, res) {
        try {
            const { id, name, price } = req.body;
            if (![name, price]) {
                throw { message: 'Input name and price product is empty' }
            }
            const data = await Product.create({
                id, name, price
            });
            if (data) {
                return res.status(201).json(data);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = ProductController;