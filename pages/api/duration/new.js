import Facility from "@/models/Facility";
import db from "@/utils/db";
import Duration from "@/models/Duration";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        const type = req.body.type;
        const data = req.body.formData;
        console.log(type, data);
        const newData = { ...data, type: type };
        const newduration = new Duration(newData);
        await newduration.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Duration generated successfully"
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