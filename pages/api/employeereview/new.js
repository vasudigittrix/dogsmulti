import Facility from "@/models/Facility";
import db from "@/utils/db";
import EmployeeReview from "@/models/EmployeeReview";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const data = req.body;
        const newemployeereview = new EmployeeReview(data);
        await newemployeereview.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee Review generated successfully"
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