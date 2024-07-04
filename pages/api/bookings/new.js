import Facility from "@/models/Facility";
import Pet from "@/models/Pet";
import db from "@/utils/db";
import Booking from "@/models/Bookings";
export default async function handler(req, res) {
    async function generateBookingId() {
        const lastBooking = await Booking.findOne().sort({ createdAt: -1 });
        let serialNumber = 1;
        if (lastBooking && lastBooking.bookingid) {
            const lastSerialNumber = parseInt(lastBooking.bookingid, 10);
            serialNumber = isNaN(lastSerialNumber) ? 1 : lastSerialNumber + 1;
        }

        const formattedSerialNumber = serialNumber.toString().padStart(6, '0');
        const bookingId = formattedSerialNumber;

        return bookingId;
    }
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const data = req.body;
        console.log(data);
        const bookingid = await generateBookingId();
        console.log(bookingid);
        const newbooking = new Booking({bookingid: bookingid,  status: 'pending', paymentStatus: 'pending',...data});

        await newbooking.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Bookings created successfully"
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