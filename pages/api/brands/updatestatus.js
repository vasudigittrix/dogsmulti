import db from "@/utils/db";
import Brand from "@/models/Brand";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const ids = req.body.ids;
        const status = req.body.status;
        await Brand.updateMany(
            { _id: { $in: ids } },             
            { $set: { status: status } }
          );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Brand updated successfully"
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