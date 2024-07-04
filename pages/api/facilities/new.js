import Facility from "@/models/Facility";
import db from "@/utils/db";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        const data = req.body;
        const newfacility = new Facility(data);
        await newfacility.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Facility generated successfully"
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