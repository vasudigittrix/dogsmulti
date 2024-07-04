import db from "@/utils/db";
import Customer from "@/models/Customer";
import User from "@/models/User";
import mongoose from "mongoose";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const {id} = req.query;
        const objectId = new mongoose.Types.ObjectId(id);
        const customerexists = await User.findById(id);
        console.log(customerexists);
        if(customerexists.length == 0){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Customer not Found"
              }
            })
        }
        const customers = await User.aggregate([
            { 
                $match: { 
                    _id: objectId
                } 
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
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    createdAt: 1,
                    pets: 1,
                    phonenumber: 1,
                    image: 1,
                    gender: 1,
                    status: 1,
                    updatedAt:1
                }
            }
        ]);
        console.log(customers);

        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Customer displayed successfully",
                data: customers
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