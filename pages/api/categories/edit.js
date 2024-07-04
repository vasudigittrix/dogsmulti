import db from "@/utils/db";
import Category from "@/models/Category";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.body.id;
        const data = req.body.formData;
        const result =  await Category.updateOne({_id: id}, data )
        console.log(result);
        await db.disconnectDb();
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Category updated successfully"
              }
            })
        } else {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Category not updated"
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