import db from "@/utils/db";
import Logistic from "@/models/Logistic";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        console.log(req.body);
        const ids = req.body.ids;
        const status = req.body.status;
        await Logistic.updateMany(
            { _id: { $in: ids } },             
            { $set: { status: status } }
          );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Logistic updated successfully"
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