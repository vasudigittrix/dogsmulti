import db from "@/utils/db";
import StaticContent from "@/models/StaticContent";
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
            console.log(req.body);
            const {type, content} = req.body;
            const staticcontent = await StaticContent.findOne({type: type});
            if (!staticcontent) {
                return res.status(404).send({ message: 'Static content not found' });
            }
            staticcontent.content = content;
        await staticcontent.save();
        res.status(200).send({
            message: 'Static Content updatedd'
        })
    }
        catch(err){
            res.status(500).send(err);
        }
    } 

  }