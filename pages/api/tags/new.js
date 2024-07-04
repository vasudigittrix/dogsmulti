import db from "@/utils/db";
import Tag from "@/models/Tag";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const data = req.body;
        const newtag= new Tag(data);
        await newtag.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Tag generated successfully"
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