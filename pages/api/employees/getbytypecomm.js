import Employee from "@/models/Employee";
import db from "@/utils/db";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const { commission, type, verificationStatus } = req.query;
         const query = { role: 'employee' }
        if (commission) {
            query.commission = commission;
        }
        if (type) {
            query.type = type;
        }
        if (verificationStatus !== undefined) {
            query.verificationStatus = verificationStatus;
        }
        const employeefound = await User.find(query).select('-password')
        console.log(query , employeefound);
        if(!employeefound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employees displayed successfully",
                    data: []
              }
            }) 
        }
        const page = parseInt(req.query.page) || 1;
        const totallength = employeefound.length; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedEmployee = employeefound.slice(startIndex, endIndex);
        await db.disconnectDb(); 
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employees displayed successfully",
                data: paginatedEmployee,
                length: totallength
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