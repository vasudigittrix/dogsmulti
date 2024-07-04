import db from "@/utils/db";
import StaticContent from "@/models/StaticContent";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
            const {type, content} = req.body;
            console.log(type, content);
            await db.connectDb();
        const newstaticcontent = new StaticContent({type,content});
        await newstaticcontent.save();
        await db.disconnectDb();
        res.status(200).send({
            message: 'Static Content generated'
        })
    }
        catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    } 

  }