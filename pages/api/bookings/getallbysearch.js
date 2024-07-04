import Facility from "@/models/Facility";
import Pet from "@/models/Pet";
import db from "@/utils/db";
import Booking from "@/models/Bookings";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const {search} = req.query;
        console.log(search);
        await db.connectDb();
        
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
            {
                $project: {
                    'EmployeeDetails.password': 0, 
                    'CustomerDetails.password': 0, 
                }
            },
            {
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } }, 
                        { type: { $regex: search, $options: 'i' } }, 
                        { status: { $regex: search, $options: 'i' } }, 
                        {'EmployeeDetails.firstName' : { $regex: search, $options: 'i' } }, 
                          {'PetDetails.name' : { $regex: search, $options: 'i' } }, 
                          {'PetDetails.type' : { $regex: search, $options: 'i' } },
                          {'ServicesDetails.name' : { $regex: search, $options: 'i' } },
                          {'CustomerDetails.firstName': { $regex: search, $options: 'i' } }
                    ],
                }
            },
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
        console.log(totallength);
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedBookings = bookingsfound.slice(startIndex, endIndex);
          console.log(paginatedBookings);
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