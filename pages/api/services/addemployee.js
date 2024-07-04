import db from "@/utils/db";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.body.id;
        const employeeids = req.body.employeeids;
        const servicefound = await Service.findById(id);
        if (!servicefound) {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "No Employees there",
                    data: []
              }
            })
        }
        await Service.updateOne({_id: id}, {$push: {employeeid: {$each: employeeids}}});
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employees Updated in Service",
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