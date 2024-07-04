import db from "@/utils/db";
import Product from "@/models/Product";
const ObjectId = require('mongoose').Types.ObjectId;
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        console.log(id);
        let productfound = await Product.aggregate([
            { 
                $match: { 
                    _id: new ObjectId(id)
                } 
            },
            {
                $lookup: {
                    from: 'variations',
                    localField: '_id',
                    foreignField: 'productid',
                    as: 'VariationsDetails'
                }
            },

            { $unwind: { path: '$VariationsDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'varvalues',  
                    localField: 'VariationsDetails.varvalueid',
                    foreignField: '_id',
                    as: 'VarValueDetails'
                }
            },
            { $unwind: { path: '$VarValueDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'discounts',  
                    localField: 'discountid',
                    foreignField: '_id',
                    as: 'DiscountDetails'
                }
            },
            { $unwind: { path: '$DiscountDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    categoriesid: 1,
                    tagid: 1,
                    brandid: 1,
                    featured: 1,
                    shortDescription: 1,
                    description: 1,
                    markedprice: 1,
                    sku: 1,
                    code: 1,
                    image: 1,
                    inStockQuantity: 1,
                    hasVariation: 1,
                    VariationDetails: "$VariationsDetails",
                    status: 1, 
                    Variationid: "$VariationsDetails._id",
                    Variationname: "$VarValueDetails.name",
                    Variationvalue: "$VarValueDetails.value",
                    VariationinStockQuantity: "$VariationsDetails.inStockQuantity",
                    Variationsku: "$VariationsDetails.sku",
                    Variationmp: "$VariationsDetails.markedprice",
                    Variationcode: "$VariationsDetails.code",
                    varvalueid: "$VarValueDetails._id",
                    vartypeid: "$VariationsDetails.vartypeid",
                    discountdetails: "$DiscountDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first : "$name"},
                    status: { $first: "$status" },
                    categoriesid: { $first: "$categoriesid" }, 
                    tagid: { $first: "$tagid" },
                    brandid: { $first: "$brandid" },
                    featured: { $first: "$featured" },
                    shortDescription: { $first: "$shortDescription" },
                    description: { $first: "$description" },
                    markedprice: { $first: "$markedprice" },
                    sku: { $first: "$sku" },
                    code: { $first: "$code" },
                    image: { $first: "$image" },
                    inStockQuantity: { $first: "$inStockQuantity" },
                    hasVariation: { $first: "$hasVariation" },
                    discountdetails : { $first: "$discountdetails"},
                    variations: {
                        $push: {
                            id: "$Variationid",
                            name: "$Variationname",
                            value: "$Variationvalue",
                            inStockQuantity: "$VariationinStockQuantity",
                            markedprice: '$Variationmp',
                            sku: "$Variationsku",
                            code: "$Variationcode",
                            varvalueid: "$varvalueid",
                            vartypeid: "$vartypeid"
                        }
                    }
                }
            },
            // {
            //     $project: {
            //         _id: 1,
            //         categoriesid: 1,
            //         tagid: 1,
            //         brandid: 1,
            //         featured: 1,
            //         shortDescription: 1,
            //         description: 1,
            //         markedprice: 1,
            //         sku: 1,
            //         code: 1,
            //         image: 1,
            //         inStockQuantity: 1,
            //         hasVariation: 1,
            //         variations: 1,
            //         status: 1,

            //     }
            // }
       
        ])
   
        // let productfound = await Product.findById(id).populate({
        //     path: 'variationids',
        //     populate: {
        //         path: 'varvalueid'
        //     }
        // })
        // .populate('discountid');
        if(!productfound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Product not found"
              }
            }) 
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Product displayed successfully",
                data: productfound
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