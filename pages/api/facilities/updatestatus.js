import Facility from "@/models/Facility";
import db from "@/utils/db";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        // const facilityid = req.body.id;
            console.log(req.body);
        const ids = req.body.ids;
        await Facility.updateMany(
            { _id: { $in: ids } },             
            { $set: { status: req.body.status } }
          );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Status Updated successfully"
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