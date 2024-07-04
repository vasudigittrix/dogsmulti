import Facility from "@/models/Facility";
import db from "@/utils/db";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        const createdBy = req.body.createdBy;
        const type = req.body.type;
        const data = req.body.formData;
        if (!type || !data || !createdBy || !createdBy.id || !createdBy.role) {
            return res.status(400).send({ error: 'Invalid request payload' });
          }
        const newData = { ...data, type: type, createdBy };
        const newservice= new Service(newData);
        await newservice.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Service generated successfully"
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