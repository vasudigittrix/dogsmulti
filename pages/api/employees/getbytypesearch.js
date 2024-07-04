import db from "@/utils/db";
// import Employee from "@/models/Employee";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        console.log(type);
        const search = req.query.search;
        let Employeefound = await User.aggregate([
           { $match: {
                $and: [ 
                    { type: type }, 
                    {role: 'employee'},
                    { firstName: { $regex: search, $options: 'i' } }
                ]
            }
        },
        {
            $project: {
                password: 0 
            }
        }
        ])

        if(!Employeefound){
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
        const totallength = Employeefound.length; 
          const pageSize = 1;
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
        console.log(err);
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