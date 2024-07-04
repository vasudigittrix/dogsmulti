import db from "@/utils/db";
import Tag from "@/models/Tag";
import Brand from "@/models/Brand";
import Unit from "@/models/Unit";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const brandfound = await Brand.find();
        if(!brandfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No Unit found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Brand displayed successfully",
                data: brandfound
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