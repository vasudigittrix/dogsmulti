import db from "@/utils/db";
import Product from "@/models/Product";
const ObjectId = require('mongoose').Types.ObjectId;
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.body.id;
        console.log(id);
        let productfound = await Product.findById(id);
        if(!productfound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Product not found"
              }
            }) 
        }

        productfound.inStockQuantity = req.body.inStockQuantity;
        await productfound.save();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Stock Quantity Updated successfully"
          }
        });
    }
    catch(err){
        return res.status(500).json({
            status: 'Failure',
            statusCode: '500',
            responseData: {
                "message": err.message
          }
        });
    }
}
}