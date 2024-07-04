import db from "@/utils/db";
import Tag from "@/models/Tag";
import Logistic from "@/models/Logistic";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const status = req.query.status;
        const logisticfound = await Logistic.find({status: status});
        if(!logisticfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No Logistic found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Logistic displayed successfully",
                data: logisticfound
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