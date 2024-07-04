import Employee from "@/models/Employee";
import db from "@/utils/db";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try{
        await db.connectDb();
        // const Bookingid = req.body.id;
        console.log(req.query);
        const ids = req.query.ids.split(',');
        const result = await User.deleteMany({ _id: { $in: ids } });
        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: 'Failure',
                statusCode: '404',
                responseData: {
                    message: 'Employee not found'
                }
            });
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee deleted successfully"
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