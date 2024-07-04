import db from "@/utils/db";
// import Category from "@/models/Category";
import Service from "@/models/Service";
import mongoose from "mongoose";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        const objectId = new mongoose.Types.ObjectId(id);
        const servicefound = await Service.findById(id).populate('employeeid');
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
   
        const services = await Service.aggregate([
            { 
                $match: { 
                    _id: objectId
                } 
            },  
              {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryid',
                    foreignField: '_id',
                    as: 'CategoryDetails'
                }
            },
              { $unwind: { path: '$CategoryDetails', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                    from: 'users',
                    localField: 'employeeid',
                    foreignField: '_id',
                    as: 'employees'
                }
            },
              { $unwind: { path: '$employees', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                  _id: 1,
                  name: 1,
                  duration: 1,
                  defaultPrice: 1,
                  description: 1,
                  status: 1,
                  type: 1,
                  categoryid:1,
                  'employees._id': 1,
                  'employees.firstName': 1,
                  'employees.lastName': 1,
                  'employees.email': 1,
                  'employees.phonenumber': 1,
                  'employees.image': 1,
                  'employees.gender': 1,
                  
                  'CategoryDetails': 1
                }
              },
            {
             $group: {
                _id: '$_id',
                    name: {$first: '$name'},
                    duration: {$first: '$duration'},
                    defaultPrice: {$first: '$defaultPrice'},
                    description: {$first: '$description'},
                    status: {$first: '$status'},
                    type: {$first: '$type'},
                    employees: { "$push": "$employees" },
                    categoriesname: {$first: '$CategoriesDetails.name'},
                    categoryid: {$first: '$categoryid'}
            }
        },
            // {
            //     $project: {
            //         _id: 1,
            //         firstName: 1,
            //         lastName: 1,
            //         email: 1,
            //         createdAt: 1,
            //         employees: 1,
            //         phonenumber: 1,
            //         image: 1,
            //         gender: 1,
            //         status: 1,
            //         updatedAt:1
            //     }
            // }
        ]);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Service displayed successfully",
                data: services
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