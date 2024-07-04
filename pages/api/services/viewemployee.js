import db from "@/utils/db";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        const servicefound = await Service.findById(id).populate('employeeid');
        await db.disconnectDb();
        if(!servicefound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Service doesnt exists"
              }
            });
        }
        if (servicefound) {
            const serviceEmployees = servicefound.employeeid;
            if(serviceEmployees){
                const employeesDetails = serviceEmployees.map(employee => ({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email
                }));
                return res.status(200).json({
                    status: 'Success',
                    statusCode: '200',
                    responseData: {
                        message: "Employees displayed successfully",
                        data: employeesDetails
                    }
                });
            }
            else{
                return res.status(200).json({
                    status: 'Success',
                    statusCode: '200',
                    responseData: {
                        "message": "No Employees there",
                        data: []
                  }
                })
            }
        } 
        
        
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