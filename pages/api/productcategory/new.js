import db from "@/utils/db";
import ProductCategory from "@/models/ProductCategory";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const data = req.body;
        const newtproductcategory= new ProductCategory(data);
        await newtproductcategory.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "New Product Category generated successfully"
          }
        })
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