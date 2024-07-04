import Facility from "@/models/Facility";
import db from "@/utils/db";
import Category from "@/models/Category";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        console.log(req.body);
        const ids = req.body.ids;
        const status = req.body.status;
        // const categoryfound = await Category.findById(id);
        // if(!categoryfound){
        //     return res.status(500).json({
        //         status: 'Failure',
        //         statusCode: '500',
        //         responseData: {
        //             "message": "Category not found"
        //       }
        //     })
        // }
        await Category.updateMany(
            { _id: { $in: ids } },             
            { $set: { status: status } }
          );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Category updated successfully"
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