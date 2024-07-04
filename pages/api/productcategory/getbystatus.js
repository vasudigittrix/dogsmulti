import db from "@/utils/db";
// import Tag from "@/models/Tag";
import ProductCategory from "@/models/ProductCategory";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const status = req.query.status === 'true';
        console.log(status);
        // const productcategoryfound = await ProductCategory.find({status: status});
        let productcategoryfound = await ProductCategory.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    status: status
                }
            },
            
            // // Unwind the brandid array
            { $unwind: "$brandid" },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brandid',
                    foreignField: '_id',
                    as: 'BrandDetails'
                }
            },
            { $unwind: { path: '$BrandDetails', preserveNullAndEmptyArrays: true } },
           
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image:1,
                    updatedAt: 1,
                    createdAt:1,
                    status: 1,
                    brandId: '$BrandDetails._id',
                    brandName: '$BrandDetails.name'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    image: {$first: '$image'},
                    updatedAt: {$first: '$updatedAt'},
                    createdAt: {$first: '$createdAt'},
                    status: {$first: '$status'},
                    brands: { $push: { _id: '$brandId', name: '$brandName' } }
                }
            }
        ]);
        console.log(productcategoryfound);

        if(!productcategoryfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No Product Category found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Product Category displayed successfully",
                data: productcategoryfound
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