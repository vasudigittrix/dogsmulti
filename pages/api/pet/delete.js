import db from "@/utils/db";
import Product from "@/models/Product";
import Pet from "@/models/Pet";
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try{
        await db.connectDb();
            console.log(req.query);
        const id = req.query.id;
    const result = await Pet.deleteOne({ _id: id });
    console.log(result);
    if (result.deletedCount === 0) {
        return res.status(404).json({
            status: 'Failure',
            statusCode: '404',
            responseData: {
                message: 'Pet not found'
            }
        });
    }

        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Pet deleted successfully"
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