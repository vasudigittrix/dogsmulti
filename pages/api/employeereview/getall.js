import Facility from "@/models/Facility";
import db from "@/utils/db";
import EmployeeReview from "@/models/EmployeeReview";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        // const employeereviews = await EmployeeReview.find();
        let employeereviews = await EmployeeReview.aggregate([
            { $sort: { createdAt: -1 } },
            
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviewer',
                    foreignField: '_id',
                    as: 'ReviewerDetails'
                }
            },
            { $unwind: { path: '$ReviewerDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'employee',
                    foreignField: '_id',
                    as: 'EmployeeDetails'
                }
            },
            { $unwind: { path: '$EmployeeDetails', preserveNullAndEmptyArrays: true } },

            {
                $group: {
                    _id: '$_id',
                    ReviewerFirstName: { $first: '$ReviewerDetails.firstName' },
                    ReviewerLastName: { $first: '$ReviewerDetails.lastName' },
                    ReviewerImg: {$first: '$ReviewerDetails.image'},
                    EmployeerFirstName: {$first: '$EmployeeDetails.firstName'},
                    EmployeerLastName: { $first: '$EmployeeDetails.lastName' },
                    EmployeerImg: {$first: '$EmployeeDetails.image'},
                    ratings: {$first: '$rating'},
                    message: {$first: '$message'},
                    date: {$first: '$date'},
                    updatedAt: {$first: '$updatedAt'}  
                }
            }

        ]);
        if(!employeereviews ){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Employee Review displayed successfully",
                    data: []
              }
            })
        }
        const page = parseInt(req.query.page) || 1;
        const totallength = employeereviews.length ; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedemployeereviews = employeereviews.slice(startIndex, endIndex);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee Review displayed successfully",
                data: paginatedemployeereviews,
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