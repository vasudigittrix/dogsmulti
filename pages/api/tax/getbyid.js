import db from "@/utils/db";
import Tax from "@/models/Tax";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        console.log(id);
        const tax = await Tax.findById(id);
        if(!tax){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "No tax found",
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Tag displayed successfully",
                data: tax
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