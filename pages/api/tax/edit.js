import db from "@/utils/db";
import Tax from "@/models/Tax";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        console.log(req.body);
        const id = req.body.id;
        const data = req.body.formData;
        const result =  await Tax.updateOne({_id: id}, data )
        await db.disconnectDb();
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Tag updated successfully"
              }
            })
        } else {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Tag not updated"
              }
            })
        }
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