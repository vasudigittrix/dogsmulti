import db from "@/utils/db";
import Tag from "@/models/Tag";
import ProductCategory from "@/models/ProductCategory";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        console.log(req.body);
        const id = req.body.id;
        const data = req.body.formData;
        const result =  await ProductCategory.updateOne({_id: id}, data )
        await db.disconnectDb();
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Product Category updated successfully"
              }
            })
        } else {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Product Category not updated"
              }
            })
        }
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