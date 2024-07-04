import Employee from "@/models/Employee";
import db from "@/utils/db";
import Booking from "@/models/Bookings";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
            console.log(req.body);
        const id = req.body.id;
        const { paymentStatus } = req.body; 
        await Booking.updateOne({ _id: id }, { $set: { paymentStatus: paymentStatus } });
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Status Updated successfully"
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