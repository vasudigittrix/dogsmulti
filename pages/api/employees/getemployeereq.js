import db from "@/utils/db";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const employees = await User.find({role: 'employee', 
        verificationStatus: false}).sort({ createdAt: -1 }).select('-password');
        console.log(employees);
        if(!employees){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employees displayed successfully",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee displayed successfully",
                data: employees
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