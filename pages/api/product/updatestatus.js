import db from "@/utils/db";
import Product from "@/models/Product";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const ids = req.body.ids;
        await Product.updateMany(
            { _id: { $in: ids } },             
            { $set: { status: req.body.status } }
          );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Status Updated successfully"
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