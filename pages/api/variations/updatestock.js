import db from "@/utils/db";
import Product from "@/models/Product";
import Variation from "@/models/Variation";
const ObjectId = require('mongoose').Types.ObjectId;
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const stockData = req.body;
        const updatePromises = Object.keys(stockData).map(async (variantId) => {
            const stock = stockData[variantId];
            let variationFound = await Variation.findById(variantId);
            if (!variationFound) {
                return res.status(500).json({
                    status: 'Failure',
                    statusCode: '500',
                    responseData: {
                        "message": "Variation not found"
                  }
                }) 
            }
            variationFound.inStockQuantity = stock;
            return variationFound.save();
        });
        await Promise.all(updatePromises);
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