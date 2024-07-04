import db from "@/utils/db";
import Tag from "@/models/Tag";
import Shipzone from "@/models/Shipzone";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const shipzonefound = await Shipzone.aggregate([
            {
                $lookup: {
                    from: 'logistics',
                    localField: 'logisticid',
                    foreignField: '_id',
                    as: 'logisticDetails'
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        if(!shipzonefound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No Shipping zone found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Shipping zone displayed successfully",
                data: shipzonefound
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