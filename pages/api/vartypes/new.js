import db from "@/utils/db";
import Tag from "@/models/Tag";
import Unit from "@/models/Unit";
import VarType from "@/models/VarType";
import VarValue from "@/models/VarValue";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        let valueids = [];
        const { values, ...data } = req.body;

    for (const value of values) {
        let newvarvalue = new VarValue(value);
        await newvarvalue.save();
        let idtosave = newvarvalue._id;
        valueids.push(idtosave);
        
    }
    console.log(valueids);
    data.value = valueids;
        console.log(data);
        const newVarType = new VarType(data);
        await newVarType.save();
        
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "VarType generated successfully"
          }
        })
    } 
    catch(err){
        console.log(err);
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