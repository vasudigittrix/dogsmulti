import Employee from "@/models/Employee";
import db from "@/utils/db";
import User from "@/models/User";
import { Cctv } from "mdi-material-ui";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
            console.log(req.query);
        const commission = req.query.commission;
        
        console.log(commission);
        const Employeefound = await User.find({role: 'employee' , commission: commission}).sort({ createdAt: -1 }).select('-password');
        console.log(Employeefound);
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
        const page = parseInt(req.query.page) || 1;
        const totallength = Employeefound.length; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedEmployee = Employeefound.slice(startIndex, endIndex);
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