import db from "@/utils/db";
import Tag from "@/models/Tag";
import VarValue from "@/models/VarValue";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const id = req.query.id;
        const varvaluefound = await VarValue.find({typeid })
        const vartypefound = await VarType.find();
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