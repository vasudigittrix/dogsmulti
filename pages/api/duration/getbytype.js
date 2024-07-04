import db from "@/utils/db";
import Duration from "@/models/Duration";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        const Durationfound = await Duration.find({type: type});
        if(!Durationfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Duration displayed successfully",
                    data: []
              }
            }) 
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Duration displayed successfully",
                data: Durationfound
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