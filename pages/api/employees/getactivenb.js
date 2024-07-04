import db from "@/utils/db";
import Employee from "@/models/Employee";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        console.log(type);
        const Employeefound = await User.find({type: type , status: 'true', blocked: 'false', role: 'employee'});
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
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employees created successfully",
                data: Employeefound
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