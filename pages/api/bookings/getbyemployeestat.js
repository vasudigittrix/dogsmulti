import Facility from "@/models/Facility";
import Pet from "@/models/Pet";
import db from "@/utils/db";
import Booking from "@/models/Bookings";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        console.log(req.query , 'query');
        const employeeid = req.query.employeeid;
        const status = req.query.status;
        console.log(employeeid);
        console.log(limit);
        let bookingsfound = await Booking.aggregate([
            { $sort: { createdAt: -1 } },
            { $match: { employeeid: new ObjectId(employeeid) , status: status} },
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
                    localField: 'customerid',
                    foreignField: '_id',
                    as: 'CustomerDetails'
                }
            },
            { $unwind: { path: '$CustomerDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'employeeid',
                    foreignField: '_id',
                    as: 'EmployeeDetails'
                }
            },
            { $unwind: { path: '$EmployeeDetails', preserveNullAndEmptyArrays: true } },
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
            // {
            //     $group: {
            //         _id: {
            //             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            //           },
            //           count: { $sum: 1 },
            //           subAmount: { $sum: "$subamount" },
            //           totalAmount: { $sum: "$totalamount"},
            //     }
            //   },
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
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Bookings created successfully",
                data: bookingsfound
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