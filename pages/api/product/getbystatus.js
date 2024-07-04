import db from "@/utils/db";
import Product from "@/models/Product";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const status = req.query.status === 'true';
        let productfound = await Product.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    status: status
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
                    from: 'brands',
                    localField: 'brandid',
                    foreignField: '_id',
                    as: 'BrandDetails'
                }
            },
            { $unwind: { path: '$BrandDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'productcategories',
                    localField: 'categoriesid',
                    foreignField: '_id',
                    as: 'CategoriesDetails'
                }
            },
            { $unwind: { path: '$CategoriesDetails', preserveNullAndEmptyArrays: true } },
            // {
            //     $lookup: {
            //         from: 'facilities',
            //         localField: 'facilityid',
            //         foreignField: '_id',
            //         as: 'FacilityDetails'
            //     }
            // },
            // { $unwind: { path: '$FacilityDetails', preserveNullAndEmptyArrays: true } },
            // {
            //     $lookup: {
            //         from: 'services',
            //         localField: 'serviceid',
            //         foreignField: '_id',
            //         as: 'ServicesDetails'
            //     }
            // },
            // { $unwind: { path: '$ServicesDetails', preserveNullAndEmptyArrays: true } },
            // // DurationDetails
            // {
            //     $lookup: {
            //         from: 'durations',
            //         localField: 'durationid',
            //         foreignField: '_id',
            //         as: 'DurationDetails'
            //     }
            // },
            // { $unwind: { path: '$DurationDetails', preserveNullAndEmptyArrays: true } },
            // {
            //     $lookup: {
            //         from: 'trainingtypes',
            //         localField: 'trainingtypeid',
            //         foreignField: '_id',
            //         as: 'TypeDetails'
            //     }
            // },
            // { $unwind: { path: '$TypeDetails', preserveNullAndEmptyArrays: true } },
            // { $limit: limit }
        ])
        if(!productfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Products displayed successfully",
                    data: []
              }
            }) 
        }
        const page = parseInt(req.query.page) || 1;
        const totallength = productfound.length ; 
          const pageSize = 10;
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize; 
          const paginatedProducts = productfound.slice(startIndex, endIndex);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Product displayed successfully",
                data: paginatedProducts,
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