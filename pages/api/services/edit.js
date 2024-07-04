import db from "@/utils/db";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.body.id;
        const data = req.body.formData;
        console.log(data);
        const serviceexists = await Service.findById(id);
        if(!serviceexists){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Service doesnt exists"
              }
            })
        }
        const result =  await Service.updateOne({_id: id}, data )
        await db.disconnectDb();
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Service updated successfully"
              }
            })
        } else {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Service not updated"
              }
            })
        }
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