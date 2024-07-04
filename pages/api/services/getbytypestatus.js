import db from "@/utils/db";
import Service from "@/models/Service";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        const status = req.query.status === 'true';
        console.log(type);
        console.log(status);
        // const servicefound = await Service.find({type: type , status: status}).populate('categoryid').sort({ createdAt: -1 });
        // if(!servicefound){
        //     return res.status(200).json({
        //         status: 'Success',
        //         statusCode: '200',
        //         responseData: {
        //             "message": "Category not found",
        //             data: []
        //       }
        //     })
        // }
        const servicefound = await Service.aggregate([
            {
                $match: { 
                    
                       type: type ,
                       status: status 
                    
                  }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'employeeid',
                    foreignField: '_id',
                    as: 'employees'
                }
            },
            {
                $addFields: {
                    employeeCount: { $size: '$employees' }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'CategoriesDetails'
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    image:1,
                    _id: 1,
                    name: 1,
                    duration: 1,
                    defaultPrice: 1,
                    description: 1,
                    status: 1,
                    type: 1,
                    createdAt: 1,
                    employeeCount: 1,
                    updatedAt:1,
                    CategoriesDetails: 1
                }
            }
        ]);
         if(!servicefound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Service not found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Service displayed successfully",
                data: servicefound
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