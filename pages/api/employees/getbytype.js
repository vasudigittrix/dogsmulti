import db from "@/utils/db";
import Employee from "@/models/Employee";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        const Employeefound = await User.find({type: type, role: "employee"}).sort({ createdAt: -1 }).select('-password');
        const page = parseInt(req.query.page) || 1;
        const totallength = Employeefound.length; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedEmployee = Employeefound.slice(startIndex, endIndex);
           
        if(!Employeefound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employees created successfully",
                    data: []
              }
            }) 
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employees created successfully",
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