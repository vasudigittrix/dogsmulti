import db from "@/utils/db";
// import Category from "@/models/Category";
// import Tag from "@/models/Tag";
import Unit from "@/models/Unit";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        console.log(id);
        const unitfound = await Unit.findById(id);
        if(!unitfound){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Unit not found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Unit displayed successfully",
                data: unitfound
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