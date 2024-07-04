import db from "@/utils/db";
// import Category from "@/models/Category";
import Trainingtype from "@/models/Trainingtype";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        console.log(id);
        const trainingtypefound = await Trainingtype.findById(id);
        if(!trainingtypefound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Category not found"
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Training type displayed successfully",
                data: trainingtypefound
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