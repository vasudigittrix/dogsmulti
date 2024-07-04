import db from "@/utils/db";
import Tag from "@/models/Tag";
import Tax from "@/models/Tax";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const {title, value, type, moduletype , status} = req.body.formData;
        const newtax = new Tax({title, value, type, moduletype , status});
        await newtax.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Tax generated successfully"
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