import db from "@/utils/db";
import Customer from "@/models/Customer";
import User from "@/models/User";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        // const customers = await User.find({role: 'user'}).sort({ createdAt: -1 });
        const customers = await User.aggregate([
            {
                $match: { role: 'user' }
            },
            {
                $lookup: {
                    from: 'pets',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'pets'
                }
            },
            {
                $addFields: {
                    petCount: { $size: '$pets' }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    createdAt: 1,
                    petCount: 1,
                    phonenumber: 1,
                    image: 1,
                    gender: 1,
                    status: 1,
                    updatedAt:1
                }
            }
        ]);
        if(customers.length == 0){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Customer not Found",
                    data: []
              }
            })
        }
        const page = parseInt(req.query.page) || 1;
        const totallength = customers.length ; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedcustomers = customers.slice(startIndex, endIndex);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Customer displayed successfully",
                data:paginatedcustomers,
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