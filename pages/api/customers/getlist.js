import db from "@/utils/db";
import Customer from "@/models/Customer";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const existingcustomer = await User.find({role: 'user'}).select({ firstName: 1, lastName: 1, id: 1});
        if(existingcustomer.length == 0){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Empty Customer List",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Customer list displayed successfully",
                data: existingcustomer
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