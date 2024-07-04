import db from "@/utils/db";
import Tax from "@/models/Tax";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        console.log(req.query.status);
        const status = req.query.status ;
        const taxfound = await Tax.find({status: status}).sort({createdAt: -1});
        console.log(taxfound , 'taz');
        if(!taxfound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No tax found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Tag displayed successfully",
                data: taxfound
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