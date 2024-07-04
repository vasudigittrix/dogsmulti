import db from "@/utils/db";
import Category from "@/models/Category";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try{
        await db.connectDb();
        const ids = req.query.ids.split(',');
        const result = await Service.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: 'Failure',
                statusCode: '404',
                responseData: {
                    message: 'Service not found'
                }
            });
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Service deleted successfully"
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