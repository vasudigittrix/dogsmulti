import db from "@/utils/db";
import Category from "@/models/Category";
import Booking from "@/models/Bookings";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
      
        let bookingfound = await Booking.aggregate([
            { 
                $match: { 
                    bookingid: id
                } 
            },
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
        ])
        // const bookingfound = await Booking.findById(id);
        if(!bookingfound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Category not found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Category displayed successfully",
                data: bookingfound
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