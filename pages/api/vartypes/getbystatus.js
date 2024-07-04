import db from "@/utils/db";
// import Tag from "@/models/Tag";
import Unit from "@/models/Unit";
import VarType from "@/models/VarType";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const status = req.query.status === 'true';
        const vartypefound = await VarType.find({status: status}).populate('value');
        if(!vartypefound){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "No Var Type found",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Var Type displayed successfully",
                data: vartypefound
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