import Facility from "@/models/Facility";
import db from "@/utils/db";
import Category from "@/models/Category";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        console.log(req.body);
        const type = req.body.type;
        const data = req.body.formData;
        const newData = { ...data, type: type };
        const newcategory= new Category(newData);
        await newcategory.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Category generated successfully"
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