import db from "@/utils/db";
import Tag from "@/models/Tag";
import Shipzone from "@/models/Shipzone";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        const data = req.body;
        const {name, logisticid, deliverycharge, deliverytime, cities} = data;
        const newshipzone = new Shipzone({name, logisticid, deliverycharge, deliverytime, cities});
        await newshipzone.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Shipzone generated successfully"
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