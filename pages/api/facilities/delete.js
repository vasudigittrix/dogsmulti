import Facility from "@/models/Facility";
import db from "@/utils/db";
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try{
        await db.connectDb();
        // const facilityid = req.body.id;
            console.log(req.query);
        const ids = req.query.ids.split(',');
        console.log(ids);
    const result = await Facility.deleteMany({ _id: { $in: ids } });
    console.log(result);
    if (result.deletedCount === 0) {
        return res.status(404).json({
            status: 'Failure',
            statusCode: '404',
            responseData: {
                message: 'Facilities not found'
            }
        });
    }

        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Facility deleted successfully"
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