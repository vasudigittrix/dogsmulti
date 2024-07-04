import Employee from "@/models/Employee";
import db from "@/utils/db";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
            console.log(req.body);
        const id = req.body.id;
        await User.updateOne(
            { _id: id },             
            { $set: { blocked: req.body.blocked } }
          );
        await db.disconnectDb();
        if(req.body.blocked == true){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employee have been blocked"
              }
            })
        }
        else{
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employee have been unblocked"
              }
            })
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