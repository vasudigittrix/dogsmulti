import db from "@/utils/db";
import Category from "@/models/Category";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const type = req.query.type;
        const status = req.query.status
        const categoryfound = await Category.find({type:type, status: status}).sort({ createdAt: -1 });
        if(!categoryfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Category not found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Category updated successfully",
                data: categoryfound
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