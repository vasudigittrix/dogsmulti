import Facility from "@/models/Facility";
import Pet from "@/models/Pet";
import db from "@/utils/db";
import Booking from "@/models/Bookings";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        let bookingsfound = await Booking.aggregate([
            { $sort: { createdAt: -1 } },
            
            {
                $lookup: {
                    from: 'pets',
                    localField: 'petid',
                    foreignField: '_id',
                    as: 'PetDetails'
                }
            },
            { $unwind: { path: '$PetDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'employeeid',
                    foreignField: '_id',
                    as: 'EmployeeDetails'
                }
            },
            { $unwind: { path: '$EmployeeDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'customerid',
                    foreignField: '_id',
                    as: 'CustomerDetails'
                }
            },
            { $unwind: { path: '$CustomerDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'facilities',
                    localField: 'facilityid',
                    foreignField: '_id',
                    as: 'FacilityDetails'
                }
            },
            { $unwind: { path: '$FacilityDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'services',
                    localField: 'serviceid',
                    foreignField: '_id',
                    as: 'ServicesDetails'
                }
            },
            { $unwind: { path: '$ServicesDetails', preserveNullAndEmptyArrays: true } },
            // DurationDetails
            {
                $lookup: {
                    from: 'durations',
                    localField: 'durationid',
                    foreignField: '_id',
                    as: 'DurationDetails'
                }
            },
            { $unwind: { path: '$DurationDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'trainingtypes',
                    localField: 'trainingtypeid',
                    foreignField: '_id',
                    as: 'TypeDetails'
                }
            },
            { $unwind: { path: '$TypeDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    'EmployeeDetails.password': 0, 
                    'CustomerDetails.password': 0, 
                }
            },
            { $limit: limit }
        ])

        
        if(!bookingsfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Bookings displayed successfully",
                    data: []
              }
            }) 
        }
        const page = parseInt(req.query.page) || 1;
        const totallength = bookingsfound.length ; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedBookings = bookingsfound.slice(startIndex, endIndex);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Bookings created successfully",
                data: paginatedBookings,
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