import db from "@/utils/db";
import Service from "@/models/Service";
import mongoose from "mongoose";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        const {role, id} = req.query; 
            console.log(req.query);
            const pipeline = [];
            pipeline.push({
                $match: { type: type }
              });
              if (role || id) {
                const matchStage = {};
        
                if (role) {
                  matchStage['createdBy.role'] = role;
                }
        
                if (id) {
                  matchStage['createdBy.id'] = new mongoose.Types.ObjectId(id);
                }
        
                pipeline.push({
                  $match: { $or: [matchStage] }
                });
              }
              console.log(pipeline);
              pipeline.push(
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
                    _id: 1,
                    name: 1,
                    duration: 1,
                    defaultPrice: 1,
                    description: 1,
                    status: 1,
                    type: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    employeeCount: 1,
                    CategoriesDetails: 1
                  }
                }
              );
              const servicefound = await Service.aggregate(pipeline);
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
                "message": "Service updated successfully",
                data: servicefound
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