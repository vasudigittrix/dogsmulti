import db from "@/utils/db";
import Trainingtype from "@/models/Trainingtype";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        const data = req.body;
        const newtraining = new Trainingtype(data);
        await newtraining.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Training type generated successfully"
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