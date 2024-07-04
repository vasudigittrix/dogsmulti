import db from "@/utils/db";
import StaticContent from "@/models/StaticContent";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            const {type} = req.query;
            await db.connectDb();
            const staticcontent = await StaticContent.findOne({type: type});
            if(!staticcontent){
              return res.status(500).send({ message: "No Content found"});
            }
        await db.disconnectDb();
          res.status(200).send({
             data: staticcontent
          })
        }
          catch(err){
              res.status(500).send(err);
          }
    } 

  }